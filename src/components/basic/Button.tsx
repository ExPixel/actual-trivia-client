import React = require("react");
import ReactDOM = require("react-dom");

export interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

class Button extends React.Component<IProps, {}> {
    public render() {
        const { loading, ...buttonProps } = this.props;
        return <button {...buttonProps}>
            {this.props.children}
        </button>;
    }
}

export default Button;
