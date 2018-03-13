import React = require("react");
import ReactDOM = require("react-dom");

export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: boolean;
    helperText?: string | null;
}

class TextField extends React.Component<IProps, {}> {
    public render() {
        const { label, ...inputProps } = this.props;
        return <input {...inputProps}>
            {this.props.children}
        </input>;
    }
}

export default TextField;
