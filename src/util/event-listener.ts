export interface IListener {
    once: boolean;
    fn: (...args: any[]) => any;
}

export class EventListeners {
    private listeners: Map<string, IListener[]> = new Map();

    public push(event: string, ...args: any[]) {
        const arr = this.listeners.get(event);
        if (arr) {
            for (let idx = 0; idx < arr.length; idx++) {
                const listener = arr[idx];
                listener.fn(...args);
                if (listener.once) {
                    arr.splice(idx, 1);
                    idx--;
                }
            }
        }
    }

    public on(event: string, fn: (...args: any[]) => any) {
        let arr = this.listeners.get(event);
        if (!arr) {
            arr = [];
            this.listeners.set(event, arr);
        }
        arr.push({ once: false, fn });
    }

    public once(event: string, fn: (...args: any[]) => any) {
        let arr = this.listeners.get(event);
        if (!arr) {
            arr = [];
            this.listeners.set(event, arr);
        }
        arr.push({ once: true, fn });
    }
}
