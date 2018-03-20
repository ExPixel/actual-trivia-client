import React = require("react");
import ReactDOM = require("react-dom");
import styles = require("./trivia.scss");
import { IParticipant } from "../../store/models";
import TriviaParticipant from "./TriviaParticipant";
import styled from "../../theme/styled";

export interface IProps {
    participants: IParticipant[];
    className?: string;
}

class TriviaParticipantList extends React.Component<IProps, {}> {
    public render() {
        const participants = this.props.participants.map((p) => (
            <TriviaParticipant key={p.username} participant={p} />
        ));

        return <div className={this.props.className}>
            {participants}
        </div>;
    }
}

export default styled(TriviaParticipantList)`
margin: 16px;
`;
