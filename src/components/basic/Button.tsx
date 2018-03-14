import React = require("react");
import ReactDOM = require("react-dom");
import styled from "../../theme/styled";
import { theming, IThemeProps } from "../../theme";
import { css } from "react-emotion";

export interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    color?: string;
}

const ButtonBase = (props: IProps) => {
    const { loading, ...buttonProps } = props;
    return <button {...buttonProps}>
        {props.children}
    </button>;
};

const buttonColorNormal = (props: IThemeProps<IProps>) => `
background-color: none;
color: ${props.theme.palette.text.primary};

&:hover {
    background-color: ${props.theme.palette.hover};
}
`;

const buttonColorPrimary = (props: IThemeProps<IProps>) => `
background-color: ${props.theme.palette.primary.main};
color: ${props.theme.palette.primary.text};

&:hover {
    background-color: ${props.theme.palette.primary.dark};
}
`;

const buttonColorSecondary = (props: IThemeProps<IProps>) => `
background-color: ${props.theme.palette.secondary.main};
color: ${props.theme.palette.secondary.text};

&:hover {
    background-color: ${props.theme.palette.secondary.dark};
}
`;

const Button = styled(ButtonBase)((props) => `
appearance: none;
background: none;
border:     none;

border-radius: 2px;
font-size: ${theming.px2rem(props.theme, 14)};
padding: ${theming.px2rem(props.theme, 8)};
min-width: ${theming.px2rem(props.theme, 80)};
${theming.pickColorVariant(props.color,
        buttonColorNormal, buttonColorPrimary, buttonColorSecondary)(props)}
transition: color .3s ease, background-color .3s ease;

text-transform: uppercase;
cursor: pointer;
`);

export default Button;
