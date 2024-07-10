
import { BasicEventEmitter } from "./BasicEventEmitter";

export class ReconnectingWebSocket extends BasicEventEmitter {
    url: string = "";
    socket: WebSocket | null = null;
    disconnect: boolean = false;
    retries: number = 0;
    showConnected: boolean = false;

    constructor() {
        super();
    }

    connect(url?: string, force = false) {
        if (this.socket?.readyState === WebSocket.OPEN && !force) return;

        if (url) this.url = url;

        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }

        this.socket = new WebSocket(this.url);
        this.socket.onclose = e => {
            this.emit(":Disconnected");
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
                const [eventName, eventData] = JSON.parse(e.data);
                this.emit(eventName, eventData);
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
        };
    }

    send(eventName: string, eventData: any) {
        if (this.socket?.readyState !== WebSocket.OPEN) return;
        this.socket.send(JSON.stringify([eventName, eventData]));
    }

    close() {
        this.disconnect = true;
        if (this.socket) this.socket.close();
        this.socket = null;
        this.retries = 0;
    }
}
