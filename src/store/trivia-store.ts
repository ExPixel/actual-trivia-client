import { RootStore } from ".";
import { TriviaGameSocket } from "../socket";
import { action, observable } from "mobx";
import { TriviaAPIClient } from "../api";
import { IncomingMessage, IncomingMessageTag } from "../socket/incoming";
import { msgClientAuth } from "../socket/outgoing";

export class TriviaStore {
    private socket: TriviaGameSocket | null = null;
    @observable public gameId: string | null = null;
    @observable public connecting: boolean = false;

    constructor(private rootStore: RootStore, private client: TriviaAPIClient) {
    }

    private messageReceived(message: IncomingMessage) {
        switch (message.tag) {
            case IncomingMessageTag.GameNotFound: {
                // #TODO show an error here or something for the game not being found.
                break;
            }

            case IncomingMessageTag.ClientInfoRequest: {
                const authInfo = this.rootStore.userStore.authInfo;
                if (authInfo) {
                    this.socket!.send(msgClientAuth(authInfo.authToken));
                }
                break;
            }
        }
    }

    @action
    public connectToGame(gameId: string) {
        if (this.socket) { this.socket.close(); }

        this.gameId = gameId;
        this.connecting = true;

        // #TODO I don't really like the way I'm doing this right now. It's error prone.
        // Maybe I just shouldn't add a protocol to the API_ORIGIN in the webpack config.
        // Not important  right now though.
        const httpUrl = this.client.getEndpointURL("/game/ws/" + gameId);
        const websocketUrl = httpUrl.replace(/https?\:\/\//, "ws://");
        console.log("connecting to socket: ", websocketUrl);
        this.socket = new TriviaGameSocket(websocketUrl);
        this.socket.once("open", () => console.log("socket opened."));
        this.socket.once("close", () => console.log("socket closed."));
        this.socket.on("error", (event: Event) => console.error("error occurred in websocket: ", event));
        this.socket.on("message", (msg: IncomingMessage) => this.messageReceived(msg));
        this.socket.connect();
    }

    @action
    public disconnectFromGame() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
        this.connecting = false;
    }
}
