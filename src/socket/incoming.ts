export enum IncomingMessageTag {
    GameNotFound = "game-not-found",
    ClientInfoRequest = "client-info-request",
}

export interface IClientInfoRequest {
    tag: IncomingMessageTag.ClientInfoRequest;
}

export interface IGameNotFound {
    tag: IncomingMessageTag.GameNotFound;
}

export type IncomingMessage = IClientInfoRequest | IGameNotFound;
