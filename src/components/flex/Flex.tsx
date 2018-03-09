import React = require("react");
import ReactDOM = require("react-dom");

export interface IFlexProps {
    /** flex-direction: row; */
    row?: boolean;
    /** flex-direction: column; */
    column?: boolean;

    // wrap?: "nowrap" | "wrap" | "wrap-reverse";
    wrap?: React.CSSProperties["flexWrap"];
    alignItems?: React.CSSProperties["alignItems"];
    alignContent?: React.CSSProperties["alignContent"];
    justifyContent?: React.CSSProperties["justifyContent"];

    style?: React.CSSProperties;
    className?: string;

    tag?: string;
}

class Flex extends React.PureComponent<IFlexProps, {}> {
    public render() {
        const flexStyle: React.CSSProperties = this.props.style ? Object.assign(this.props.style, { display: "flex" }) : { display: "flex" };
        if (this.props.row) { flexStyle.flexDirection = "row"; }
        if (this.props.column) { flexStyle.flexDirection = "column"; }

        if (this.props.wrap) { flexStyle.flexWrap = this.props.wrap; }
        if (this.props.alignItems) { flexStyle.alignItems = this.props.alignItems; }
        if (this.props.alignContent) { flexStyle.alignContent = this.props.alignContent; }
        if (this.props.justifyContent) { flexStyle.justifyContent = this.props.justifyContent; }

        const FlexElement = this.props.tag || "div";
        return <FlexElement className={this.props.className} style={flexStyle}>
            {this.props.children}
        </FlexElement>;
    }
}

export default Flex;
