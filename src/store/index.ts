import { UserStore } from "./user-store";

export class RootStore {
    private userStore: UserStore;

    constructor() {
        this.userStore = new UserStore(this);
    }
}
