import React = require("react");
import ReactDOM = require("react-dom");
import { observer } from "mobx-react";
import { getRootStore } from "../store";
import Countdown from "../components/countdown/Countdown";
import TriviaPrompt from "../components/trivia/TriviaPrompt";
import Flex from "../components/flex/Flex";

@observer
class TriviaPromptScreen extends React.Component<{}, {}> {
    private userStore = getRootStore().userStore;
    private triviaStore = getRootStore().triviaStore;

    public render() {
        return <div>
            <Flex row>
                <Flex style={{flex: "1"}}>
                    { this.triviaStore.question.index >= 0 &&
                        <TriviaPrompt
                            question={this.triviaStore.question}
                            answerIndex={this.triviaStore.questionAnswerIndex} />
                    }
                </Flex>
                <div style={{minWidth: "256px"}}>Placeholder for scores</div>
            </Flex>
            {/* { this.triviaStore.questionCountdownOn &&
                <Countdown timeRemaining={this.triviaStore.questionCountdownMillis} /> } */}
        </div>;
    }
}

export default TriviaPromptScreen;
