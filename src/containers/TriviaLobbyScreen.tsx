import React = require("react");
import ReactDOM = require("react-dom");
import { getRootStore } from "../store";
import { Countdown } from "../components/countdown/Countdown";
import { observer } from "mobx-react";
import TriviaParticipantList from "../components/trivia/TriviaParticipantList";
import Flex from "../components/flex/Flex";
import TriviaCountdownHeader from "../components/trivia/TriviaCountdownHeader";
import TriviaGameOptions from "./TriviaGameOptions";

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
        let gameStartingHeader: JSX.Element | null = null;
        if (this.triviaStore.gameStartCountdownOn) {
            gameStartingHeader = (
                <TriviaCountdownHeader
                    label="Starting Game..."
                    countdownOn={true}
                    millisRemaining={this.triviaStore.gameStartCountdownMillis} />
            );
        }

        return <div>
            <Flex row>
                <Flex column style={{flex: "1"}}>
                    {gameStartingHeader}
                    <TriviaGameOptions />
                </Flex>
                <TriviaParticipantList participants={this.triviaStore.participants} />
            </Flex>
        </div>;
    }
}

export default TriviaLobbyScreen;
