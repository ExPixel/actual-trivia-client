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

    constructor(props: {}) {
        super(props);
        this.onSelectChoice = this.onSelectChoice.bind(this);
    }

    private onSelectChoice(index: number) {
        this.triviaStore.selectAnswer(index);
    }

    public render() {
        return <div>
            <Flex row>
                <Flex style={{flex: "1"}}>
                    { this.triviaStore.question.index >= 0 &&
                        <TriviaPrompt
                            onSelectChoice={this.onSelectChoice}
                            question={this.triviaStore.question}
                            answerIndex={this.triviaStore.questionAnswerIndex}
                            selectionIndex={this.triviaStore.selectedAnswerIndex} />
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
