import React = require("react");
import ReactDOM = require("react-dom");
import Flex from "../flex/Flex";
import Countdown from "../countdown/Countdown";
import styles = require("./trivia.scss");

export interface IProps {
    questionIndex: number;
    questionCount: number;
    countdownOn: boolean;
    millisRemaining: number;
}

// #TODO replace usage of this with TriviaCountdownHeader
const TriviaPromptHeader = (props: IProps) => (
    <Flex className={styles.promptHeader} row alignItems="center">
        <Countdown active={props.countdownOn} timeRemaining={props.millisRemaining} />
        <div className={styles.promptHeaderLabel}>Question {props.questionIndex + 1}/{props.questionCount}</div>
    </Flex>
);

export default TriviaPromptHeader;
