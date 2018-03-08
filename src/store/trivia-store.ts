import { RootStore } from ".";
import { TriviaGameSocket } from "../socket";
import { action, observable } from "mobx";
import { TriviaAPIClient } from "../api";
import { IncomingMessage, IncomingMessageTag } from "../socket/incoming";
import { msgClientAuth, msgSelectAnswer, IOutgoingMessage } from "../socket/outgoing";
import { IParticipant } from "./models";

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
    @observable public question: Readonly<IQuestion> = {
        index: -1,
        prompt: "",
        choices: [],
    };
    @observable public questionAnswerIndex: number = -1;
    @observable public selectedAnswerIndex: number = -1;

    @observable public participants: IParticipant[] = [];

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
        };
        this.questionAnswerIndex = -1;
        this.selectedAnswerIndex = -1;
        this.participants = [];
    }

    private send(msg: IOutgoingMessage) {
        if (this.socket) {
            this.socket.send(msg);
        } else {
            console.error("attempted to send message through closed socket: ", msg);
        }
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
                this.question = {
                    index: payload.index,
                    prompt: payload.prompt,
                    choices: payload.choices,
                };
                this.questionAnswerIndex = -1;
                this.selectedAnswerIndex = -1;

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
                    this.send(msgClientAuth(authInfo.authToken));
                }
                this.gameId = message.payload.gameID;
                break;
            }

            case IncomingMessageTag.RevealAnswer: {
                if (message.payload.questionIndex === this.question.index) {
                    this.questionAnswerIndex = message.payload.answerIndex;
                }
                break;
            }

            case IncomingMessageTag.ParticipantsList: {
                this.participants = message.payload.participants;
                break;
            }

            case IncomingMessageTag.AddParticipant: {
                this.participants.push(message.payload.participant);
                break;
            }

            case IncomingMessageTag.RemoveParticipant: {
                const index = this.participants.findIndex((p) =>
                    p.username === message.payload.participant.username);
                if (index >= 0) {
                    this.participants.splice(index, 1);
                }
                break;
            }

            case IncomingMessageTag.SetParticipant: {
                const index = this.participants.findIndex((p) =>
                    p.username === message.payload.participant.username);
                if (index >= 0) {
                    const p = this.participants[index];
                    this.participants.splice(index, 1, Object.assign({}, p, message.payload.participant));
                }
                break;
            }

            case IncomingMessageTag.Multi: {
                for (const msg of message.payload.messages) {
                    this.messageReceived(msg);
                }
                break;
            }

            default:
                console.warn("unhandled socket message: ", message);
                break;
        }
    }

    @action
    public selectAnswer(index: number) {
        // makes sure that there is a valid question on the screen first, that the index is in choice bounds,
        // and that there isn't already a selected answer.
        if (this.question.index >= 0 && index < this.question.choices.length && this.selectedAnswerIndex < 0 && this.questionAnswerIndex < 0) {
            this.selectedAnswerIndex = index;
            this.send(msgSelectAnswer(this.selectedAnswerIndex, this.question.index));
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
        this.socket.once("close", () => {
            console.log("socket closed.");
            this.socket = null;
        });
        this.socket.on("error", (event: Event) => console.error("error occurred in websocket: ", event));
        this.socket.on("message", (msg: IncomingMessage) => this.messageReceived(msg));
        this.socket.connect();
    }

    @action
    public disconnectFromGame() {
        console.log("called disconnect.");
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
        this.gameId = null;
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
}
