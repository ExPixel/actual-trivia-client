import React = require("react");
import ReactDOM = require("react-dom");
import { IQuestion } from "../../store/trivia-store";
import styles = require("./trivia.scss");
import TriviaChoiceList from "./TriviaChoiceList";

export interface IProps {
    question: IQuestion;
    answerIndex: number;
}

class TriviaPrompt extends React.PureComponent<IProps, {}> {
    public render() {
        return <div>
            <div className={styles.prompt}>{this.props.question.prompt}</div>
            <TriviaChoiceList
                choices={this.props.question.choices}
                correct={-1}
                selected={-1} />
        </div>;
    }
}

export default TriviaPrompt;
