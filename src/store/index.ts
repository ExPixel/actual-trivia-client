import { TriviaAPIClient } from "../api";
import { UserStore } from "./user-store";
import { TriviaStore } from "./trivia-store";

export class RootStore {
    private client: TriviaAPIClient;
    public readonly userStore: UserStore;
    public readonly triviaStore: TriviaStore;

    constructor(client: TriviaAPIClient) {
        this.client = client;
        this.userStore = new UserStore(this, this.client);
        this.triviaStore = new TriviaStore(this, this.client);

        // tslint:disable-next-line:no-string-literal
        (window as any)["client"] = this.client;
    }
}

let globalRootStore: RootStore | undefined;
export function getRootStore(): RootStore {
    return globalRootStore!;
}

export function setRootStore(rootStore: RootStore) {
    globalRootStore = rootStore;
}
