import React = require("react");
import ReactDOM = require("react-dom");
import MenuItem from "../components/menu-item/MenuItem";
import styles = require("./styles/main-menu.scss");
import { RouteComponentProps } from "react-router";
import Branding from "../components/Branding";

export interface IMainMenuProps {
    history: RouteComponentProps<any>["history"];
}

class MainMenu extends React.Component<IMainMenuProps, {}> {
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
        // #TODO remove this test code once I have a way to actually create lobbies.
        alert("This feature is not yet implemented.");
    }

    private actionSubmitQuestions() {
        // #TODO not yet implemented
        alert("This feature is not yet implemented.");
    }

    private actionSettings() {
        // #TODO not yet implemented.
        alert("This feature is not yet implemented.");
    }

    private actionLogOut() {
        // #TODO not yet implemented.
        alert("This feature is not yet implemented.");
    }

    public render() {
        return <div className={styles.mainMenu}>
            <div className={styles.mainMenuHeader}>
                {/* #TODO replace this with something cooler lookin' */}
                <Branding />
            </div>
            <div className={styles.mainMenuBody}>
                <div className={styles.itemList}>
                    <MenuItem onClick={this.actionJoinGame} title="Join Game" description="Quickly join a lobby for a game of actual trivia." />
                    <MenuItem onClick={this.actionFindLobby} title="Find Lobby" description="Search a list of lobbies for a game of actual trivia to join." />
                    <MenuItem onClick={this.actionSubmitQuestions} title="Submit Questions" description="Submit your own questions to be added to our database." />
                    <MenuItem onClick={this.actionSettings} title="Settings" description="Tailor your trivia experience to your tastes." />
                    <MenuItem onClick={this.actionLogOut} title="Log Out" description="Hop on your smurf account and start racking up easy rares." />
                </div>

                {/*
                    #TODO I'm not actually what I want to be on the right of the menu yet.
                    Maybe some cool little images when you hover over a menu item.
                */}
                <div className={styles.menuRight}>
                </div>
            </div>
        </div>;
    }
}

export default MainMenu;
