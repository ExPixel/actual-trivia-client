import React = require("react");
import ReactDOM = require("react-dom");

export interface IProps {
    component?: string;
    style?: React.CSSProperties;
}

class Typography extends React.Component<IProps, {}> {
    public render() {
        const TComponent = this.props.component || "div";
        return <TComponent style={this.props.style}>
            {this.props.children}
        </TComponent>;
    }
}

export default Typography;
