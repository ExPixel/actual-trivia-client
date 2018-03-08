import React = require("react");
import ReactDOM = require("react-dom");
import bannerImage =  require("../static/img/actual-trivia-banner.svg");

const DEFAULT_BRANDING_WIDTH: number = 512;

export interface IProps {
    width?: number;
    style?: React.CSSProperties;
}

const Branding = ({width, style}: IProps) => (<img src={bannerImage} style={style} width={width || DEFAULT_BRANDING_WIDTH}/>);
export default Branding;
