import React = require("react");
import ReactDOM = require("react-dom");
import styles = require("./trivia.scss");
import { mixClasses } from "../../util";

const LABEL_COLORS = [
    "#e03131", // openColor red-8
    "#3b5bdb", // openColor indigo-8
    "#099268", // openColor teal-8
    "#f08c00", // openColor yellow-8
    "#c2255c", // openColor pink-8
    "#6741d9", // openColor violet-8
    "#1971c2", // openColor blue-8
    "#2f9e44", // openColor green-8
    "#e8590c", // openColor orange-8
];

export interface IProps {
    index: number;
    text: string;
    correct: boolean | undefined | null;
    selected: boolean;
    onClick?: (index: number) => any;
}

class TriviaChoice extends React.PureComponent<IProps, {}> {
    constructor(props: IProps) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    private onClick() {
        if (this.props.onClick) {
            this.props.onClick(this.props.index);
        }
    }

    public render() {
        const correct = this.props.correct;
        const classes = mixClasses({
            [styles.choice]: true,
            [styles.correct]: (typeof correct === "boolean") && !!correct,
            [styles.incorrect]: (typeof correct === "boolean") && !correct,
            [styles.selected]: this.props.selected,
        });

        const label = this.props.index < 26 ? String.fromCharCode(65 + this.props.index) : "?";
        const labelBGColor = LABEL_COLORS[this.props.index % LABEL_COLORS.length];
        const labelStyle: React.CSSProperties = { backgroundColor: labelBGColor };

        return <div onClick={this.onClick} className={classes}>
            <span style={labelStyle} className={styles.choiceLabel}>{label}</span>
            <span className={styles.choiceText}>{this.props.text}</span>
        </div>;
    }
}

export default TriviaChoice;
