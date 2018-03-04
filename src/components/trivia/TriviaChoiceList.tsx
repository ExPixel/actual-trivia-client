import React = require("react");
import ReactDOM = require("react-dom");
import TriviaChoice from "./TriviaChoice";
import styles = require("./trivia.scss");

export interface IProps {
    choices: string[];
    selected: number;
    correct: number;
    onSelectChoice?: (index: number) => any;
}

class TriviaChoiceList extends React.PureComponent<IProps, {}> {
    constructor(props: IProps) {
        super(props);
        this.onClickChoice = this.onClickChoice.bind(this);
    }

    private onClickChoice(index: number) {
        if (this.props.onSelectChoice) {
            this.props.onSelectChoice(index);
        }
    }

    public render() {
        const choices = this.props.choices.map((c, idx) => (
            <TriviaChoice
                onClick={this.onClickChoice}
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
