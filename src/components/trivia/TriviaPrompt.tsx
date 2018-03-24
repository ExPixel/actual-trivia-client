import React = require("react");
import ReactDOM = require("react-dom");
import { IQuestion } from "../../store/trivia-store";
import TriviaChoiceList from "./TriviaChoiceList";
import styled from "../../theme/styled";
import TriviaPromptText from "./TriviaPromptText";

export interface IProps {
    question: IQuestion;
    answerIndex: number;
    selectionIndex: number;
    onSelectChoice?: (index: number) => any;
    className?: string;
}

class TriviaPrompt extends React.PureComponent<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return <div className={this.props.className}>
            <TriviaPromptText index={this.props.question.index} prompt={this.props.question.prompt} />
            <TriviaChoiceList
                onSelectChoice={this.props.onSelectChoice}
                choices={this.props.question.choices}
                correct={this.props.answerIndex}
                selected={this.props.selectionIndex} />
        </div>;
    }
}

export default TriviaPrompt;
