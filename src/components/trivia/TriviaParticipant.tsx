import React = require("react");
import ReactDOM = require("react-dom");
import styles = require("./trivia.scss");
import { IParticipant } from "../../store/models";

export interface IProps {
    participant: IParticipant;
}

class TriviaParticipant extends React.Component<IProps, {}> {
    public render() {
        return <div className={styles.participant}>
            <div className={styles.participantName}>{this.props.participant.username}</div>
            <div className={styles.participantScore}>{this.props.participant.score}</div>
        </div>;
    }
}

export default TriviaParticipant;
