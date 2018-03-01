export enum IncomingMessageTag {
    GameNotFound = "game-not-found",
    ClientInfoRequest = "client-info-request",
    UserNotFound = "user-not-found",

    GameStartCountdownTick = "g-start-countdown-tick",
    GameStart = "g-start",

    QuestionCountdownTick = "q-countdown-tick",
    SetPrompt = "q-set-prompt",
}

export interface IClientInfoRequest {
    tag: IncomingMessageTag.ClientInfoRequest;
}

export interface IGameNotFound {
    tag: IncomingMessageTag.GameNotFound;
}

export interface IUserNotFound {
    tag: IncomingMessageTag.UserNotFound;
}

export interface IGameStartCountdownTick {
    tag: IncomingMessageTag.GameStartCountdownTick;
    payload: {
        begin: boolean;
        millisRemaining: number;
    };
}

export interface IGameStart {
    tag: IncomingMessageTag.GameStart;
}

export interface ISetPrompt {
    tag: IncomingMessageTag.SetPrompt;
    payload: {
        index: number;
        prompt: string;
        choices: string[];
        category: string;
        difficulty: string;
    };
}

export interface IQuestionCountdownTick {
    tag: IncomingMessageTag.QuestionCountdownTick;
    payload: {
        begin: boolean;
        millisRemaining: number;
    };
}

export type IncomingMessage =
    IClientInfoRequest | IGameNotFound | IUserNotFound |
    IGameStartCountdownTick | IGameStart |
    ISetPrompt | IQuestionCountdownTick;
