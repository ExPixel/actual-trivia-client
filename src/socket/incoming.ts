import { IParticipant } from "../store/models";

export enum IncomingMessageTag {
    GameNotFound = "game-not-found",
    ClientInfoRequest = "client-info-request",
    UserNotFound = "user-not-found",

    GameStartCountdownTick = "g-start-countdown-tick",
    GameStart = "g-start",

    QuestionCountdownTick = "q-countdown-tick",
    SetPrompt = "q-set-prompt",
    RevealAnswer = "q-reveal-answer",

    AddParticipant = "p-list-add",
    RemoveParticipant = "p-list-remove",
    SetParticipant = "p-list-set",
    ParticipantsList = "p-list-full",

    Multi = "multi",
}

export interface IClientInfoRequest {
    tag: IncomingMessageTag.ClientInfoRequest;
    payload: {
        gameID: string;
    };
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
    payload: {
        questionCount: number;
    };
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

export interface IRevealAnswer {
    tag: IncomingMessageTag.RevealAnswer;
    payload: {
        questionIndex: number;
        answerIndex: number;
    };
}

export interface IParticipantsList {
    tag: IncomingMessageTag.ParticipantsList;
    payload: {
        participants: IParticipant[];
    };
}

export interface IAddParticipant {
    tag: IncomingMessageTag.AddParticipant;
    payload: {
        participant: IParticipant;
    };
}

export interface IRemoveParticipant {
    tag: IncomingMessageTag.RemoveParticipant;
    payload: {
        participant: IParticipant;
    };
}

export interface ISetParticipant {
    tag: IncomingMessageTag.SetParticipant;
    payload: {
        participant: IParticipant;
    };
}

export interface IMulti {
    tag: IncomingMessageTag.Multi;
    payload: {
        messages: IncomingMessage[];
    };
}

export type IncomingMessage =
    IClientInfoRequest | IGameNotFound | IUserNotFound |
    IGameStartCountdownTick | IGameStart |
    ISetPrompt | IQuestionCountdownTick | IRevealAnswer |
    IParticipantsList | IAddParticipant | IRemoveParticipant | ISetParticipant |
    IMulti;
