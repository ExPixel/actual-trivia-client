import React = require("react");
import ReactDOM = require("react-dom");
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import styles = require("./styles/trivia-game-options.scss");

class TriviaGameOptions extends React.Component<{}, {}> {
    public render() {
        return <div>
            <Paper className={styles.gameOptionsPaper}>
                <Typography style={{ marginBottom: "8px" }} variant="headline" component="h2">
                    Game Options
                </Typography>
            </Paper>
        </div>;
    }
}

export default TriviaGameOptions;
