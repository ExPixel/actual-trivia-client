import React = require("react");
import ReactDOM = require("react-dom");
import MenuItem from "../components/menu-item/MenuItem";
import { RouteComponentProps } from "react-router";
import Branding from "../components/Branding";
import { getRootStore } from "../store";
import { css } from "react-emotion";

export interface IMainMenuProps {
    history: RouteComponentProps<any>["history"];
}

export interface IMainMenuState {
    disableItems: boolean;
}

const mainMenuClass = css`
display: flex;
flex-direction: column;
`;

const mainMenuHeaderClass = css`
font-size: 3.6rem;
margin: 32px;
text-align: center;
`;

const mainMenuBodyClass = css`
display: flex;
flex-direction: row;
`;

const mainMenuItemListClass = css`
display: flex;
flex-direction: column;
flex: 1;
overflow-y: auto;
`;

const menuRightClass = css`
flex: 1;
`;

class MainMenu extends React.Component<IMainMenuProps, IMainMenuState> {
    private userStore = getRootStore().userStore;

    constructor(props: IMainMenuProps) {
        super(props);
        this.actionJoinGame = this.actionJoinGame.bind(this);
        this.actionFindLobby = this.actionFindLobby.bind(this);
        this.actionSettings = this.actionSettings.bind(this);
        this.actionLogOut = this.actionLogOut.bind(this);
    }

    // #NOTE @observer overrides this unless I have this here
    // and I need this to always return true if I want this thing
    // to interact with react router correctly.
    public shouldComponentUpdate() {
        return true;
    }

    private actionJoinGame() {
        this.props.history.push("/game/quickjoin");
    }

    private actionFindLobby() {
        alert("This feature is not yet implemented.");
    }

    private actionSubmitQuestions() {
        alert("This feature is not yet implemented.");
    }

    private actionSettings() {
        alert("This feature is not yet implemented.");
    }

    private async actionLogOut() {
        this.setState({ disableItems: true });
        const result = await this.userStore.logout();
        if (!result) {
            console.warn("Logout request was unsuccessful.");
        }
    }

    public render() {
        return <div className={mainMenuClass}>
            <div className={mainMenuHeaderClass}>
                <Branding />
            </div>
            <div className={mainMenuBodyClass}>
                <div className={mainMenuItemListClass}>
                    <MenuItem onClick={this.actionJoinGame} title="Join Game" description="Quickly join a lobby for a game of actual trivia." />
                    <MenuItem onClick={this.actionFindLobby} title="Find Lobby" description="Search a list of lobbies for a game of actual trivia to join." />
                    <MenuItem onClick={this.actionSubmitQuestions} title="Submit Questions" description="Submit your own questions to be added to our database." />
                    <MenuItem onClick={this.actionSettings} title="Settings" description="Tailor your trivia experience to your tastes." />
                    <MenuItem onClick={this.actionLogOut} title="Log Out" description="Hop on your smurf account and start racking up easy rares." />
                </div>

                <div className={menuRightClass}>
                </div>
            </div>
        </div>;
    }
}

export default MainMenu;
