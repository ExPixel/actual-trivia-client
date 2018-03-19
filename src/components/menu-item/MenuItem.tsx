import React = require("react");
import ReactDOM = require("react-dom");
import styled from "../../theme/styled";

export interface IMenuItemProps {
    title: string;
    description: string;
    onClick?: React.MouseEventHandler<any>;
    className?: string;
}

class MenuItem extends React.Component<IMenuItemProps, {}> {
    public render() {
        return <div className={this.props.className} onClick={this.props.onClick}>
            <div className="item-title">{this.props.title}</div>
            <div className="item-description">{this.props.description}</div>
        </div>;
    }
}

/*
    background-color: rgba($oc-gray-0, 0.20);
    padding: 16px;
    margin: 8px 16px;
    cursor: pointer;
    transition: background-color 0.25s ease-in-out;

    &:hover {
        background-color: rgba($oc-gray-0, 0.25);
    }
*/

export default styled(MenuItem)`
padding: 16px;
margin: 8px 16px;
cursor: pointer;
transition: background-color 0.25s ease-in-out;
color: ${(props) => props.theme.palette.menu.itemText};
background-color: ${(props) => props.theme.palette.menu.itemBackground};
&:hover {
    background-color: ${(props) => props.theme.palette.menu.itemBackgroundHover};
}

& .item-title {
    font-size: ${(props) => props.theme.typography.fontSizeExtraLarge};
}

& .item-description {
    font-size: ${(props) => props.theme.typography.fontSize};
}
`;
