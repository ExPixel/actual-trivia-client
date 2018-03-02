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

    /** true if the game is currently counting down */
    @observable public gameStartCountdownOn = false;

    /** milliseconds until the game starts. */
    @observable public gameStartCountdownMillis = 0;

    @observable public currentMode: TriviaMode = TriviaMode.WaitingToStart;

    @observable public questionCountdownOn = false;
    @observable public questionCountdownMillis = 0;
    @observable public question: IQuestion = {
        index: -1,
        prompt: "",
        choices: [],
        correctChoice: -1,
    };

    constructor(private rootStore: RootStore, private client: TriviaAPIClient) {
    }

    @action private reset() {
        this.gameStartCountdownOn = false;
        this.gameStartCountdownMillis = 0;
        this.currentMode = TriviaMode.WaitingToStart;
        this.questionCountdownOn = false;
        this.questionCountdownMillis = 0;
        this.question = {
            index: -1,
            prompt: "",
            choices: [],
            correctChoice: -1,
        };
    }

    @action
    private messageReceived(message: IncomingMessage) {
        switch (message.tag) {
            case IncomingMessageTag.GameNotFound: {
                // #TODO show an error here or something for the game not being found.
                break;
            }

            case IncomingMessageTag.UserNotFound: {
                // #TODO show an error here and remove the user from the game.
                break;
            }

            case IncomingMessageTag.GameStartCountdownTick: {
                this.gameStartCountdownOn = true;
                this.gameStartCountdownMillis = message.payload.millisRemaining;
                break;
            }

            case IncomingMessageTag.GameStart: {
                this.currentMode = TriviaMode.ShowQuestion;
                this.gameStartCountdownOn = false;
                this.gameStartCountdownMillis = 0;
                break;
            }

            case IncomingMessageTag.SetPrompt: {
                const {payload} = message;
                this.question.index = payload.index;
                this.question.prompt = payload.prompt;
                this.question.choices = payload.choices;
                this.question.correctChoice = -1;

                this.questionCountdownOn = false;
                this.questionCountdownMillis = 0;
                break;
            }

            case IncomingMessageTag.QuestionCountdownTick: {
                this.questionCountdownOn = true;
                this.questionCountdownMillis = message.payload.millisRemaining;
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

        this.reset();
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

export enum TriviaMode {
    WaitingToStart =  0,
    ShowQuestion,
    ReportScores,
}

export interface IQuestion {
    index: number;
    prompt: string;
    choices: string[];

    /** The index of the correct choice. -1 if the client doesn't know the correct answer yet. */
    correctChoice: number;
}
