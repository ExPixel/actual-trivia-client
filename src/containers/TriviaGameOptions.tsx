import React = require("react");
import ReactDOM = require("react-dom");
import Typography from "../components/basic/Typography";

class TriviaGameOptions extends React.Component<{}, {}> {
    public render() {
        return <div>
            <Typography style={{ marginBottom: "8px" }} component="h2">
                Game Options
            </Typography>
        </div>;
    }
}

export default TriviaGameOptions;
