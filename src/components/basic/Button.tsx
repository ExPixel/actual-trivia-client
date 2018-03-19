import React = require("react");
import ReactDOM = require("react-dom");
import styled from "../../theme/styled";
import { theming, IThemeProps } from "../../theme";
import { css } from "react-emotion";
import { elevationTransitionValue } from "../../theme/shadow";
import CircularProgress from "./CircularProgress";

export interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    color?: string;
    raised?: boolean;
}

const ButtonBase = (props: IProps) => {
    const { loading, raised, ...buttonProps } = props;
    if (raised) {
        // tslint:disable-next-line:no-string-literal
        (buttonProps as any)["raised"] = "true"; // #TODO this is to make react stop complaining for now but I should fix it.
    }
    const progress = loading ? (<CircularProgress style={{ marginRight: "4px" }} />) : null;
    return <button {...buttonProps}>
        {progress}
        {props.children}
    </button>;
};

const buttonColorNormal = (props: IThemeProps<IProps>) => `
background-color: none;
color: ${props.theme.palette.text.primary};

&:hover {
    background-color: ${props.theme.palette.hover};
}

&:hover {
    background-color: ${props.theme.palette.active};
}
`;

const buttonColorPrimary = (props: IThemeProps<IProps>) => `
background-color: ${props.theme.palette.primary.main};
color: ${props.theme.palette.primary.text};

&:hover {
    background-color: ${props.theme.palette.primary.dark};
}

&:active {
    background-color: ${props.theme.palette.primary.light};
}
`;

const buttonColorSecondary = (props: IThemeProps<IProps>) => `
background-color: ${props.theme.palette.secondary.main};
color: ${props.theme.palette.secondary.text};

&:hover {
    background-color: ${props.theme.palette.secondary.dark};
}

&:active {
    background-color: ${props.theme.palette.secondary.light};
}
`;

const buttonRaised = `
box-shadow: ${theming.shadowValue(2)};
&:active {
    box-shadow: ${theming.shadowValue(0)};
}
`;

const Button = styled(ButtonBase)((props) => `
appearance: none;
background: none;
border:     none;
outline:    none;

display: inline-flex;
align-items: center;
justify-content: center;

border-radius: 2px;
font-size: ${theming.px2rem(props.theme, 14)};
padding: ${theming.px2rem(props.theme, 8)};
min-width: ${theming.px2rem(props.theme, 80)};
${theming.pickColorVariant(props.color,
        buttonColorNormal, buttonColorPrimary, buttonColorSecondary)(props)}
${props.raised ? buttonRaised : ""}

transition: color .3s ease, background-color .3s ease, ${elevationTransitionValue};

text-transform: uppercase;
cursor: pointer;
`);

export default Button;
