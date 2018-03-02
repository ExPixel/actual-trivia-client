import React = require("react");
import ReactDOM = require("react-dom");
import { observer } from "mobx-react";
import { getRootStore } from "../store";

@observer
class TriviaResultsScreen extends React.Component<{}, {}> {
    private userStore = getRootStore().userStore;
    private triviaStore = getRootStore().triviaStore;

    public render() {
        return <div>TriviaResultsScreen</div>;
    }
}

export default TriviaResultsScreen;
