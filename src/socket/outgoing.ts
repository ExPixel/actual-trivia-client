export enum OutgoingMessageTag {
    ClientAuth = "client-auth",
}

export interface IOutgoingMessage {
    tag: OutgoingMessageTag;
    payload?: any;
}

export function msgClientAuth(authToken: string): IOutgoingMessage {
    return {
        tag: OutgoingMessageTag.ClientAuth,
        payload: { authToken: authToken },
    };
}
