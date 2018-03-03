import React = require("react");
import ReactDOM = require("react-dom");
import TriviaChoice from "./TriviaChoice";
import styles = require("./trivia.scss");

export interface IProps {
    choices: string[];
    selected: number;
    correct: number;
}

class TriviaChoiceList extends React.PureComponent<IProps, {}> {
    public render() {
        const choices = this.props.choices.map((c, idx) => (
            <TriviaChoice
                key={idx}
                text={c}
                index={idx}
                correct={this.props.correct < 0 ? undefined : this.props.correct === idx}
                selected={idx === this.props.selected} />
        ));
        return <div className={styles.choiceList}>
            {choices}
        </div>;
    }
}

export default TriviaChoiceList;
