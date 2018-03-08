import React = require("react");
import ReactDOM = require("react-dom");
import styles = require("./trivia.scss");
import { IParticipant } from "../../store/models";
import TriviaParticipant from "./TriviaParticipant";

export interface IProps {
    participants: IParticipant[];
}

class TriviaParticipantList extends React.Component<IProps, {}> {
    public render() {
        const participants = this.props.participants.map((p) => (
            <TriviaParticipant key={p.username} participant={p} />
        ));

        return <div className={styles.participantsList}>
            {participants}
        </div>;
    }
}

export default TriviaParticipantList;
