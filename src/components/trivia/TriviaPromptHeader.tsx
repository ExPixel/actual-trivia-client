import React = require("react");
import ReactDOM = require("react-dom");
import Flex from "../flex/Flex";
import Countdown from "../countdown/Countdown";
import styled from "../../theme/styled";

export interface IProps {
    questionIndex: number;
    questionCount: number;
    countdownOn: boolean;
    millisRemaining: number;
    className?: string;
}

const TriviaPromptHeader = (props: IProps) => (
    <Flex className={props.className} row alignItems="center">
        <Countdown active={props.countdownOn} timeRemaining={props.millisRemaining} />
        <div className="trivia-prompt-header-label">Question {props.questionIndex + 1}/{props.questionCount}</div>
    </Flex>
);

export default styled(TriviaPromptHeader)`
font-size: ${({theme}) => theme.typography.fontSizeLarge};
padding: 8px;

& .trivia-prompt-header-label {
    margin-left: 16px;
}
`;
