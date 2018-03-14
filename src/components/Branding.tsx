import React = require("react");
import ReactDOM = require("react-dom");
import bannerImageWhite = require("../static/img/actual-trivia-banner-white.svg");
import bannerImageBlack = require("../static/img/actual-trivia-banner-black.svg");

const DEFAULT_BRANDING_WIDTH: number = 512;

export interface IProps {
    width?: number | string;
    style?: React.CSSProperties;
    black?: boolean;
}

const widthpx = (w: number | string) => typeof w === "string" ? w : w + "px";

const Branding = ({width, style, black}: IProps) => (
    <img
        src= {black === undefined || !!black ? bannerImageBlack : bannerImageWhite}
        style= {
            Object.assign({ width: widthpx(width || DEFAULT_BRANDING_WIDTH) }, style)
        } />
);

export default Branding;
