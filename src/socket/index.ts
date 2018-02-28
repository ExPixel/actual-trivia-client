import { EventListeners } from "../util/event-listener";
import { IncomingMessage } from "./incoming";
import { IOutgoingMessage } from "./outgoing";

export class TriviaGameSocket {
    private ws!: WebSocket;
    private isOpen: boolean = false;
    private events: EventListeners = new EventListeners();

    constructor(private url: string) {
    }

    public connect() {
        this.ws = new WebSocket(this.url);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onerror = this.onError.bind(this);
        this.ws.onopen = this.onOpen.bind(this);
    }

    public on(event: "message", fn: (msg: IncomingMessage) => any): any;
    public on(event: "close", fn: (event: CloseEvent) => any): any;
    public on(event: "error" | "open", fn: (event: Event) => any): any;
    public on(event: string, fn: (...args: any[]) => any) {
        this.events.on(event, fn);
    }

    public once(event: "message", fn: (msg: IncomingMessage) => any): any;
    public once(event: "close", fn: (event: CloseEvent) => any): any;
    public once(event: "error" | "open", fn: (event: Event) => any): any;
    public once(event: string, fn: (...args: any[]) => any) {
        this.events.once(event, fn);
    }

    public close() {
        if (this.isOpen) {
            this.ws.close();
            this.isOpen = false;
        }
    }

    public send(message: IOutgoingMessage) {
        if (!this.isOpen) {
            throw new Error("Attempted to send a message through a closed websocket.");
        }

        const msgString = JSON.stringify(message);
        this.ws.send(msgString);
        console.log("sent message: ", message); // #TODO remove debug code
    }

    private onMessage(event: MessageEvent) {
        if (typeof event.data === "string") {
            try {
                const msg = JSON.parse(event.data);
                if (msg && typeof msg.tag === "string") {
                    const incoming = msg as IncomingMessage;
                    console.log("received message: ", incoming); // #TODO remove debug code
                    this.events.push("message", incoming);
                }
            } catch (e) {
                // #TODO maybe I should send this as an error event as well?
                console.error("Error occurred while decoding socket message:", e);
            }
        }
    }

    private onError(event: Event) {
        this.events.push("error", event);
    }

    private onOpen(event: Event) {
        this.isOpen = true;
        this.events.push("open", event);
    }

    private onClose(event: CloseEvent) {
        this.isOpen = false;
        this.events.push("close", event);
    }
}
