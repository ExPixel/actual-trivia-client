import React = require("react");
import ReactDOM = require("react-dom");
import { match, Redirect } from "react-router";
import { observer } from "mobx-react";
import { shouldComponentUpdateRoute } from "../util";
import { getRootStore } from "../store";
import { TriviaMode } from "../store/trivia-store";
import TriviaLobbyScreen from "./TriviaLobbyScreen";
import TriviaPrompt from "../components/trivia/TriviaPrompt";
import TriviaPromptScreen from "./TriviaPromptScreen";
import TriviaResultsScreen from "./TriviaResultsScreen";

export interface ITriviaGameScreenProps {
    match: match<{ gameId: string; }>;
}

@observer
export class TriviaGameScreen extends React.Component<ITriviaGameScreenProps, {}> {
    private userStore = getRootStore().userStore;
    private triviaStore = getRootStore().triviaStore;

    constructor(props: ITriviaGameScreenProps) {
        super(props);
    }

    public componentDidMount() {
        this.triviaStore.connectToGame(this.props.match.params.gameId);
    }

    public componentWillUnmount() {
        this.triviaStore.disconnectFromGame();
    }

    public render() {
        let mainContent: JSX.Element;
        switch (this.triviaStore.currentMode) {
            case TriviaMode.WaitingToStart:
                mainContent = <TriviaLobbyScreen />;
                break;
            case TriviaMode.ShowQuestion:
                mainContent = <TriviaPromptScreen />;
                break;
            case TriviaMode.ReportScores:
                mainContent = <TriviaResultsScreen />;
                break;
            default: throw new Error("unreachable trivia mode: " + this.triviaStore.currentMode);
        }

        const redirect = this.triviaStore.gameId !== null && this.triviaStore.gameId !== this.props.match.params.gameId && this.props.match.params.gameId === "quickjoin";

        return <div>
            { redirect && <Redirect to={"/game/" + this.triviaStore.gameId} /> }
            {mainContent}
        </div>;
    }
}

export default TriviaGameScreen;
