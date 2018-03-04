export enum OutgoingMessageTag {
    ClientAuth = "client-auth",
    SelectAnswer = "select-answer",
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

export function msgSelectAnswer(index: number, questionIndex: number): IOutgoingMessage {
    return {
        tag: OutgoingMessageTag.SelectAnswer,
        payload: {
            index: index,
            questionIndex: questionIndex,
        },
    };
}
