importScripts("https://cdnjs.cloudflare.com/ajax/libs/pako/2.1.0/pako.min.js");

class BasicEventEmitter {
    constructor() {
        this.listeners = new Map();
    }

    _prepareListenersMap(eventName) {
        if (!this.listeners.has(eventName)) this.listeners.set(eventName, new Map());
    }

    on(eventName, listener) {
        this._prepareListenersMap(eventName);
        this.listeners.get(eventName).set(listener, { once: false });
        return () => {
            this.listeners.get(eventName).delete(listener);
        };
    }

    once(eventName, listener) {
        this._prepareListenersMap(eventName);
        this.listeners.get(eventName)?.set(listener, { once: true });
        return () => {
            this.listeners.get(eventName).delete(listener);
        };
    }

    off(eventName, listener) {
        if (!eventName) return (this.listeners = new Map());
        if (!listener) return this.listeners?.delete(eventName);
        this.listeners.get(eventName)?.delete(listener);
    }

    emit(eventName, ...args) {
        if (!this.listeners.has(eventName)) return;
        const eventMap = this.listeners.get(eventName);
        eventMap.forEach(({ once }, listener) => {
            if (once) eventMap?.delete(listener);
            try {
                listener(...args);
            } catch (e) {
                console.error(`Error while emitting ${eventName} event.`, e);
            }
        });
    }
}

class ReconnectingWebSocket extends BasicEventEmitter {
    url = "";
    /** @type {WebSocket} */
    socket = null;
    pendingMessages = [];
    disconnect = false;
    retries = 0;
    showConnected = false;
    forcePending = true;
    compress = "none";

    constructor(compress = "none") {
        super();
        this.compress = compress;
    }

    get connected() {
        return this.socket?.readyState === WebSocket.OPEN;
    }

    connect(url, force = false) {
        if (this.connected && !force) return;

        if (url) this.url = url;

        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }

        this.socket = new WebSocket(this.url);
        if (this.compress === "zlib") this.socket.binaryType = "arraybuffer";
        this.socket.onclose = e => {
            this.emit(":Disconnected");
            this.emit("*", ":Disconnected");
            console.log("Connection Closed", this.retries, e);
            if (this.socket) this.socket.close();
            this.socket = null;
            if (this.disconnect) return;
            this.retries++;

            if (this.retries > 15) {
                this.showConnected = true;
                this.retries = 0;

                setTimeout(() => this.connect(), 30000);
                return;
            }
            setTimeout(
                () => this.connect(),
                Math.min(1000 * (this.retries * 2), 30000)
            );
        };
        this.socket.onmessage = e => {
            try {
                let { data } = e;
                if (this.compress === "zlib") {
                    data = new Uint8Array(data);
                    data = pako.inflate(data, { to: "string" });
                }

                const [eventName, eventData] = JSON.parse(data);
                this.emit(eventName, eventData);
                this.emit("*", eventName, eventData);
            } catch (e) {
                console.error("Error parsing message", e);
            }
        };
        this.socket.onopen = () => {
            this.retries = 0;
            if (this.showConnected) {
                this.showConnected = false;
                console.log("Connection Restored");
            }
            this.emit(":Connected");
            this.emit("*", ":Connected");
        };
    }

    send(eventName, eventData, force = false) {
        if (!force && (!this.connected || this.forcePending)) {
            this.pendingMessages.push([eventName, eventData]);
            if (this.pendingMessages.length > 100) this.pendingMessages.shift();
            return;
        }

        if (this.compress === "zlib") {
            this.socket.send(
                pako.deflate(JSON.stringify([eventName, eventData]))
            );
        } else {
            this.socket.send(JSON.stringify([eventName, eventData]));
        }
    }

    sendAllPending() {
        this.forcePending = false;
        for (const [eventName, eventData] of this.pendingMessages) {
            this.send(eventName, eventData, true);
        }
        this.pendingMessages = [];
    }

    close() {
        this.disconnect = true;
        if (this.socket) this.socket.close();
        this.socket = null;
        this.retries = 0;
    }
}

const socket = new ReconnectingWebSocket("zlib");

const subscriptions = new Set();

onmessage = event => {
    const { data } = event;

    switch (data[0]) {
        case "Send": {
            const [eventName, eventData, force] = data[1];

            switch (eventName) {
                case ":Subscribe": {
                    if (subscriptions.has(eventData)) break;
                    subscriptions.add(eventData);
                    break;
                }
                case ":Subscribe:All": {
                    for (const event of eventData) {
                        subscriptions.add(event);
                    }
                    break;
                }
                case ":Unsubscribe": {
                    if (!subscriptions.has(eventData)) break;
                    subscriptions.delete(eventData);
                    break;
                }
                default:
                    break;
            }

            socket.send(eventName, eventData, force);
            break;
        }
        case "SendAllPending": {
            socket.sendAllPending();
            break;
        }
        case "Connect": {
            const [url, force] = data[1];
            socket.connect(url, force);
            break;
        }
        case "Close": {
            socket.close();
            break;
        }
    }
};

socket.on("*", (eventName, eventData) => {
    postMessage(["Message", [eventName, eventData]]);
});

socket.on(":Connected", () => {
    socket.send(":Subscribe:All", [...subscriptions], true);
    console.log("Subscribed to ", [...subscriptions]);
});
