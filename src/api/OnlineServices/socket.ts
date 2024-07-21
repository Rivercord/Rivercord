import socketWorkerString from "file://./socket.worker.js?raw";
import { spawnWorker } from "@utils/workers";
import { BasicEventEmitter } from "lib/BasicEventEmitter";

const pendingMessages: any[] = [];
export const events = new BasicEventEmitter();
export let worker: Worker | null = null;

export function on(eventName: string, listener: (data: any) => void) {
    events.on(eventName, listener);
}

spawnWorker(socketWorkerString, { name: "RivercordSocketWorker" }).then((w: Worker) => {
    worker = w;
    w.onmessage = e => {
        const data = e.data as [string, any];
        switch (data[0]) {
            case "Message": {
                const [eventName, eventData] = data[1] as [string, any];
                events.emit(eventName, eventData);
                break;
            }
        }
    };
    for (const message of pendingMessages) {
        worker.postMessage(message);
    }
    pendingMessages.length = 0;
});


export function send(eventName: string, eventData?: any, force = false) {
    if (!worker) {
        pendingMessages.push(["Send", [eventName, eventData, force]]);
        if (pendingMessages.length > 100) pendingMessages.shift();
        return;
    }
    worker.postMessage(["Send", [eventName, eventData, force]]);
}

export function connect(url: string, force = false) {
    if (!worker) return pendingMessages.push(["Connect", [url, force]]);
    worker.postMessage(["Connect", [url, force]]);
}

export function close() {
    if (!worker) return pendingMessages.push(["Close"]);
    worker.postMessage(["Close"]);
}

export function sendAllPending() {
    if (!worker) return pendingMessages.push(["SendAllPending"]);
    worker.postMessage(["SendAllPending"]);
}

on(":KeepAlive", () => {
    send(":KeepAlive", Date.now());
});
