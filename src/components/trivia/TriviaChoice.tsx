import React = require("react");
import ReactDOM = require("react-dom");
import { mixClasses } from "../../util";
import { css } from "react-emotion";
import styled from "../../theme/styled";
import OpenColor from "../../theme/open-color";

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
    className?: string;
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
            [this.props.className!]: true,
            ["trivia-choice-correct"]: (typeof correct === "boolean") && !!correct,
            ["trivia-choice-incorrect"]: this.props.selected && (typeof correct === "boolean") && !correct,
            ["trivia-choice-selected"]: this.props.selected && (typeof correct !== "boolean"),
        });

        const sel = this.props.selected && (typeof correct !== "boolean");
        console.log("sel (%s): ", this.props.text, sel);

        const label = this.props.index < 26 ? String.fromCharCode(65 + this.props.index) : "?";
        const labelBGColor = LABEL_COLORS[this.props.index % LABEL_COLORS.length];
        const labelStyle: React.CSSProperties = {
            backgroundColor: labelBGColor,

            // #TODO change the text color so that is contrasts the background color.
            color: OpenColor.gray[0],
        };

        return <div onClick={this.onClick} className={classes}>
            <span style={labelStyle} className="trivia-choice-label">{label}</span>
            <span className="trivia-choice-text">{this.props.text}</span>
        </div>;
    }
}

export default styled(TriviaChoice)`
display: flex;
flex-direction: row;
align-items: center;

font-size: ${({theme}) => theme.typography.fontSizeLarge};
padding: 8px;
cursor: pointer;
user-select: none;
transition: background-color .2s ease;
background-color: ${({theme}) => theme.palette.trivia.choice.background};

&:hover {
    background-color: ${({theme}) => theme.palette.trivia.choice.backgroundHover};
}

&.trivia-choice-selected {
    background-color: ${({theme}) => theme.palette.trivia.choice.selected.background};
    &:hover {
        background-color: ${({theme}) => theme.palette.trivia.choice.selected.backgroundHover};
    }
}

&.trivia-choice-correct {
    background-color: ${({theme}) => theme.palette.trivia.choice.correct.background};
    &:hover {
        background-color: ${({theme}) => theme.palette.trivia.choice.correct.backgroundHover};
    }
}

&.trivia-choice-incorrect {
    background-color: ${({theme}) => theme.palette.trivia.choice.incorrect.background};
    &:hover {
        background-color: ${({theme}) => theme.palette.trivia.choice.incorrect.backgroundHover};
    }
}

& .trivia-choice-label {
    padding: 8px;
    margin-right: 16px;
}
`;
