import React = require("react");
import ReactDOM = require("react-dom");
import MenuItem from "../components/menu-item/MenuItem";
import styles = require("./styles/main-menu.scss");
import { RouteComponentProps } from "react-router";

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
        // #TODO IDEA: this should just autimatically send you to a special game room called
        // autojoin that automatically puts you into a room and then maybe changes the link that
        // is in the URL or something. I'll have to find someway to change the url in react router
        // somehow without actually causing a rerender.
    }

    private actionFindLobby() {
        // #TODO remove this test code once I have a way to actually create lobbies.
        this.props.history.push("/game/test");
    }

    private actionSettings() {
        // #TODO not yet implemented.
    }

    private actionLogOut() {
        // #TODO not yet implemented.
    }

    public render() {
        return <div className={styles.mainMenu}>
            <div className={styles.mainMenuHeader}>
                {/* #TODO replace this with something cooler lookin' */}
                Actual Trivia
            </div>
            <div className={styles.mainMenuBody}>
                <div className={styles.itemList}>
                    <MenuItem onClick={this.actionJoinGame} title="Join Game" description="Quickly join a lobby for a game of actual trivia." />
                    <MenuItem onClick={this.actionFindLobby} title="Find Lobby" description="Search a list of lobbies for a game of actual trivia to join." />
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
