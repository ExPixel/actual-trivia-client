import React = require("react");
import ReactDOM = require("react-dom");
import { match } from "react-router";
import { observer } from "mobx-react";
import { shouldComponentUpdateRoute } from "../util";
import { getRootStore } from "../store";

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
        return <div>
            Game Screen, fam: {this.props.match.params.gameId}
        </div>;
    }
}

export default TriviaGameScreen;
