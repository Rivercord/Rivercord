
import { BasicEventEmitter } from "./BasicEventEmitter";
import pako from "pako";

export class ReconnectingWebSocket extends BasicEventEmitter {
    url: string = "";
    socket: WebSocket | null = null;
    private pendingMessages: any[] = [];
    private disconnect: boolean = false;
    private retries: number = 0;
    private showConnected: boolean = false;
    forcePending: boolean = true;
    compress: "zlib" | "none" = "none";

    constructor() {
        super();
    }

    get connected(): boolean {
        return this.socket?.readyState === WebSocket.OPEN;
    }

    connect(url?: string, force = false, compress: "zlib" | "none" = "none") {
        if (this.connected && !force) return;

        if (url) this.url = url;

        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }

        if (compress) this.compress = compress;
        this.socket = new WebSocket(this.url);
        if (compress === "zlib") this.socket.binaryType = "arraybuffer";
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
            setTimeout(() => this.connect(), Math.min(1000 * (this.retries * 2), 30000));
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
        if (!force && (!this.connected || this.forcePending))
            return this.pendingMessages.push([eventName, eventData]);

        if (this.compress === "zlib") {
            this.socket!.send(
                pako.deflate(JSON.stringify([eventName, eventData]))
            );
        } else {
            this.socket!.send(JSON.stringify([eventName, eventData]));
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
