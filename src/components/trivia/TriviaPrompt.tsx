import React = require("react");
import ReactDOM = require("react-dom");
import { IQuestion } from "../../store/trivia-store";
import styles = require("./trivia.scss");
import TriviaChoiceList from "./TriviaChoiceList";

export interface IProps {
    question: IQuestion;
    answerIndex: number;
    selectionIndex: number;
    onSelectChoice?: (index: number) => any;
}

class TriviaPrompt extends React.PureComponent<IProps, {}> {
    public render() {
        return <div>
            <div className={styles.prompt}>{this.props.question.prompt}</div>
            <TriviaChoiceList
                onSelectChoice={this.props.onSelectChoice}
                choices={this.props.question.choices}
                correct={this.props.answerIndex}
                selected={this.props.selectionIndex} />
        </div>;
    }
}

export default TriviaPrompt;
