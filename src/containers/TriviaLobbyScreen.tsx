import React = require("react");
import ReactDOM = require("react-dom");
import { getRootStore } from "../store";
import { Countdown } from "../components/countdown/Countdown";
import { observer } from "mobx-react";

export interface IState {
    countingDown: false;
    lastServerCoutdown: number;
    currentCountdown: number;
}

@observer
class TriviaLobbyScreen extends React.Component<{}, IState> {
    private userStore = getRootStore().userStore;
    private triviaStore = getRootStore().triviaStore;

    public render() {
        return <div>
            TriviaLobbyScreen
            { this.triviaStore.gameStartCountdownOn &&
                <Countdown timeRemaining={this.triviaStore.gameStartCountdownMillis} />
            }
        </div>;
    }
}

export default TriviaLobbyScreen;
