import React = require("react");
import ReactDOM = require("react-dom");
import styles = require("./countdown.scss");
import { mixClasses } from "../../util";

export interface IProps {
    timeRemaining: number;

    // watch out, changing this property will clear the countdown
    active?: boolean;
}

export interface IState {
    countdownInterval: null | number;
    countdownStart: number;
    countdownDelta: number;

    animating: boolean;
    animateTimeout: number | null;
}

export class Countdown extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            countdownInterval: null,
            countdownStart: Date.now(),
            countdownDelta: 0,
            animating: false,
            animateTimeout: null,
        };
    }

    public componentWillReceiveProps(nextProps: Readonly<IProps>) {
        if (this.props.timeRemaining !== nextProps.timeRemaining || this.props.active !== nextProps.active) {
            if (nextProps.active) {
                this.setState({ countdownDelta: 0, countdownStart: Date.now() });
                if (this.state.countdownInterval === null) {
                    this.startInterval();
                }
            } else {
                this.stopAnimating();
                this.stopInterval();
            }
        }
    }

    public componentWillMount() {
        this.startInterval();
    }

    public componentWillUnmount() {
        this.stopInterval();

        if (this.state.animating || this.state.animateTimeout !== null) {
            if (this.state.animateTimeout !== null) {
                window.clearTimeout(this.state.animateTimeout);
            }
            this.stopAnimating();
        }
    }

    private animate() {
        if (!this.state.animating) {
            const timeout = window.setTimeout(() => this.stopAnimating(), 250);
            this.setState({ animating: true, animateTimeout: timeout });
        }
    }

    private stopAnimating() {
        this.setState({ animating: false, animateTimeout: null });
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

            const prevSeconds = Math.round((Math.max(0, this.props.timeRemaining - this.state.countdownDelta) || 0) / 1000);
            const currentSeconds = Math.round((Math.max(0, this.props.timeRemaining - delta) || 0) / 1000);
            if (prevSeconds !== currentSeconds) {
                this.animate();
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
        const bgClasses = mixClasses({
            [styles.countdownBackground]: true,
            [styles.rotating]: this.state.animating,
        });
        const bgTransform = this.state.animating ? "scale(1.2)" : "scale(1.0)";

        const pactive = this.props.active;
        const active = (typeof pactive === "boolean") ? pactive : true;
        const textClasses = mixClasses({
            [styles.countdownText]: true,
            [styles.inactive]: !active,
        });
        const textTransform = this.state.animating ? "scale(1.5)" : "scale(1.0)";

        return <div  className={styles.countdown}>
            <div style={{ transform: bgTransform }} className={bgClasses}></div>
            <span style={{ transform: textTransform }} className={textClasses}>
                {active ? this.secondsRemaining : "—"}
            </span>
        </div>;
    }
}

export default Countdown;
