import React = require("react");
import ReactDOM = require("react-dom");
import { observer } from "mobx-react";
import { getRootStore } from "../store";
import Countdown from "../components/countdown/Countdown";
import TriviaPrompt from "../components/trivia/TriviaPrompt";
import Flex from "../components/flex/Flex";
import TriviaParticipantList from "../components/trivia/TriviaParticipantList";
import TriviaPromptHeader from "../components/trivia/TriviaPromptHeader";

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
        let prompt: JSX.Element | null = null;
        let promptHeader: JSX.Element | null = null;

        if (this.triviaStore.question.index >= 0) {
            prompt = (
                <TriviaPrompt
                    onSelectChoice={this.onSelectChoice}
                    question={this.triviaStore.question}
                    answerIndex={this.triviaStore.questionAnswerIndex}
                    selectionIndex={this.triviaStore.selectedAnswerIndex} />
            );

            // #TODO fix question count
            promptHeader = (<TriviaPromptHeader
                questionIndex={this.triviaStore.question.index}
                questionCount={this.triviaStore.questionCount}
                countdownOn={this.triviaStore.questionCountdownOn}
                millisRemaining={this.triviaStore.questionCountdownMillis}
            />);
        }

        return <div>
            <Flex row>
                <Flex column style={{flex: "1"}}>
                    {promptHeader}
                    {prompt}
                </Flex>
                <TriviaParticipantList participants={this.triviaStore.participants} />
            </Flex>
            {/* { this.triviaStore.questionCountdownOn &&
                <Countdown timeRemaining={this.triviaStore.questionCountdownMillis} /> } */}
        </div>;
    }
}

export default TriviaPromptScreen;
