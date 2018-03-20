import React = require("react");
import ReactDOM = require("react-dom");
import { IQuestion } from "../../store/trivia-store";
import TriviaChoiceList from "./TriviaChoiceList";
import styled from "../../theme/styled";

export interface IProps {
    question: IQuestion;
    answerIndex: number;
    selectionIndex: number;
    onSelectChoice?: (index: number) => any;
    className?: string;
}

class TriviaPrompt extends React.PureComponent<IProps, {}> {
    public render() {
        return <div className={this.props.className}>
            <div className="trivia-prompt">{this.props.question.prompt}</div>
            <TriviaChoiceList
                onSelectChoice={this.props.onSelectChoice}
                choices={this.props.question.choices}
                correct={this.props.answerIndex}
                selected={this.props.selectionIndex} />
        </div>;
    }
}

export default styled(TriviaPrompt)`
& .trivia-prompt {
    font-size: ${({theme}) => theme.typography.fontSizeExtraLarge};
    padding: 8px;
    white-space: pre-wrap;
    user-select: none;
}
`;
