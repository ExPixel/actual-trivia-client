import React = require("react");
import ReactDOM = require("react-dom");
import styles = require("./menu-item.scss");

export interface IMenuItemProps {
    title: string;
    description: string;
    onClick?: React.MouseEventHandler<any>;
}

class MenuItem extends React.Component<IMenuItemProps, {}> {
    public render() {
        return <div className={styles.menuItem} onClick={this.props.onClick}>
            <div className={styles.title}>{this.props.title}</div>
            <div className={styles.description}>{this.props.description}</div>
        </div>;
    }
}

export default MenuItem;
