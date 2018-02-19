import {observable} from "mobx";
import { RootStore } from ".";

export class UserStore {
    private rootStore: RootStore;

    // auth token being used by this user.
    @observable
    private authToken: string | null = "";

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
}
