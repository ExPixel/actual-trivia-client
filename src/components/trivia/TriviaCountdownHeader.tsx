import React = require("react");
import ReactDOM = require("react-dom");
import Flex from "../flex/Flex";
import { Countdown } from "../countdown/Countdown";
import styles = require("./trivia.scss");

export interface IProps {
    label: string;
    countdownOn: boolean;
    millisRemaining: number;
}

const TriviaCountdownHeader = (props: IProps) => (
    <Flex className={styles.promptHeader} row alignItems="center">
        <Countdown active={props.countdownOn} timeRemaining={props.millisRemaining} />
        <div className={styles.promptHeaderLabel}>{props.label}</div>
    </Flex>
);

export default TriviaCountdownHeader;
