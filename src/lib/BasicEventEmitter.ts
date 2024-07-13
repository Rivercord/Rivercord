type Listener = (...args: any[]) => void;

export class BasicEventEmitter {
    listeners: Map<string, Map<Listener, { once: boolean; }>>;
    constructor() {
        this.listeners = new Map();
    }

    _prepareListenersMap(eventName: string) {
        if (!this.listeners.has(eventName))
            this.listeners.set(eventName, new Map());
    }

    on(eventName: string, listener: Listener) {
        this._prepareListenersMap(eventName);
        this.listeners.get(eventName)!.set(listener, { once: false });
        return () => {
            this.listeners.get(eventName)!.delete(listener);
        };
    }

    once(eventName: string, listener: Listener) {
        this._prepareListenersMap(eventName);
        this.listeners.get(eventName)?.set(listener, { once: true });
        return () => {
            this.listeners.get(eventName)!.delete(listener);
        };
    }

    off(eventName: string, listener?: Listener) {
        if (!eventName) return (this.listeners = new Map());
        if (!listener) return this.listeners?.delete(eventName);
        this.listeners.get(eventName)?.delete(listener);
    }

    emit(eventName: string, ...args: any[]) {
        if (!this.listeners.has(eventName)) return;
        const eventMap = this.listeners.get(eventName)!;
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
