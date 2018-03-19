import React = require("react");
import ReactDOM = require("react-dom");
import styled from "../../theme/styled";
import { IThemeProps } from "../../theme";
import { css } from "emotion";

export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: boolean;
    helperText?: string | null;
}

const TextFieldBase = (props: IProps) => {
    const { label, error, helperText, className, ...inputProps } = props;
    return <div className={className}>
        <input className="text-field-input" {...inputProps} placeholder={label}>
            {props.children}
        </input>
        { !!helperText ? (<div className="text-field-helper-text">{helperText}</div>) : null }
    </div>;
};

const normalColors = (props: IThemeProps<IProps>) => `
border-bottom: 2px solid ${props.theme.palette.divider};
color: ${props.theme.palette.text.primary};
&:focus {
    border-bottom: 2px solid ${props.theme.palette.primary.main};
}
`;

const errorColors = (props: IThemeProps<IProps>) => `
border-bottom: 2px solid ${props.theme.palette.error.main};
&:focus {
    border-bottom: 2px solid ${props.theme.palette.error.main};
}
`;

const TextField = styled(TextFieldBase)((props) => `
& .text-field-input {
    appearance: none;
    background: none;
    border:     none;
    outline:    none;
    width: 100%;

    padding: 16px 0px 8px 0px;
    transition: border-color .3s ease;
    ${props.error ? errorColors(props) : normalColors(props)}

    &::placeholder {
        color: ${props.error ? props.theme.palette.error.light : props.theme.palette.text.secondary};
    }
}

& .text-field-helper-text {
    margin-top: 4px;
    color: ${props.error ? props.theme.palette.error.main : props.theme.palette.text.primary};
}
`);

export default TextField;
