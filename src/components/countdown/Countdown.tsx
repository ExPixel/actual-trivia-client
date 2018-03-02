import React = require("react");
import ReactDOM = require("react-dom");

export interface IProps {
    timeRemaining: number;
}

export interface IState {
    countdownInterval: null | number;
    countdownStart: number;
    countdownDelta: number;
}

export class Countdown extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            countdownInterval: null,
            countdownStart: Date.now(),
            countdownDelta: 0,
        };
    }

    public componentWillReceiveProps(nextProps: Readonly<IProps>) {
        if (this.props.timeRemaining !== nextProps.timeRemaining) {
            this.setState({ countdownDelta: 0, countdownStart: Date.now() });
            if (this.state.countdownInterval === null) {
                this.startInterval();
            }
        }
    }

    public componentWillMount() {
        this.startInterval();
    }

    public componentWillUnmount() {
        this.stopInterval();
    }

    private startInterval() {
        if (this.state.countdownInterval !== null) {
            this.stopInterval(false);
        }

        const interval = window.setInterval(() => {
            const delta = Date.now() - this.state.countdownStart;
            const remaining = this.props.timeRemaining - delta;
            if (remaining < 0) {
                this.stopInterval();
            }
            this.setState({ countdownDelta: delta });
        }, 500);
        this.setState({ countdownInterval: interval });
    }

    private stopInterval(setState: boolean = true) {
        if (this.state.countdownInterval != null) {
            window.clearInterval(this.state.countdownInterval);
            if (setState) {
                this.setState({ countdownInterval: null });
            }
        }
    }

    private get secondsRemaining() {
        const millis = Math.max(0, this.props.timeRemaining - this.state.countdownDelta) || 0;
        return Math.round(millis / 1000);
    }

    public render() {
        return <div>{this.secondsRemaining}</div>;
    }
}

export default Countdown;
