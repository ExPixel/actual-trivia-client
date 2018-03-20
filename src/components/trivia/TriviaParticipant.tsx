import React = require("react");
import ReactDOM = require("react-dom");
import { IParticipant } from "../../store/models";
import styled from "../../theme/styled";

export interface IProps {
    participant: IParticipant;
    className?: string;
}

class TriviaParticipant extends React.Component<IProps, {}> {
    public render() {
        return <div className={this.props.className}>
            <div className="trivia-participant-name">{this.props.participant.username}</div>
            <div className="trivia-participant-score">{this.props.participant.score}</div>
        </div>;
    }
}

export default styled(TriviaParticipant)`
box-sizing: border-box;
min-width: 256px;
max-width: 256px;
width: 256px;
padding: 12px 16px;
background-color: ${({theme}) => theme.palette.trivia.participant.background};
color: ${({theme}) => theme.palette.trivia.participant.text};
transition: background-color .2s ease;

cursor: pointer;
user-select: none;

&:hover {
    background-color: ${({theme}) => theme.palette.trivia.participant.backgroundHover};
}

& .trivia-participant-name {
    font-weight: bold;
}

& .trivia-participant-score {
    font-weight: normal;
    margin-top: 8px;
}
`;
