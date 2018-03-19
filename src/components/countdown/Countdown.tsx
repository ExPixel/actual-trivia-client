import React = require("react");
import ReactDOM = require("react-dom");
import styles = require("./countdown.scss");
import { mixClasses } from "../../util";
import styled from "../../theme/styled";

export interface IProps {
    timeRemaining: number;

    // watch out, changing this property will clear the countdown
    active?: boolean;
    className?: string;
}

export interface IState {
    countdownInterval: null | number;
    countdownStart: number;
    countdownDelta: number;

    animating: boolean;
    animateTimeout: number | null;
}

class Countdown extends React.Component<IProps, IState> {
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
            if (typeof nextProps.active === "undefined" || !!nextProps.active) {
                this.setState({ countdownDelta: 0, countdownStart: Date.now() });
                if (this.state.countdownInterval === null) {
                    this.startInterval();
                }
            } else {
                console.log("calling stopAnimating: ", nextProps.active);
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
            "countdown-background": true,
            "animating": this.state.animating,
        });
        const bgTransform = this.state.animating ? "scale(1.2)" : "scale(1.0)";

        const pactive = this.props.active;
        const active = (typeof pactive === "boolean") ? pactive : true;
        const textClasses = mixClasses({
            "countdown-text": true,
            "inactive": !active,
        });
        const textTransform = this.state.animating ? "scale(1.5)" : "scale(1.0)";

        return <div className={this.props.className}>
            <div style={{ transform: bgTransform }} className={bgClasses}></div>
            <span style={{ transform: textTransform }} className={textClasses}>
                {active ? this.secondsRemaining : "—"}
            </span>
        </div>;
    }
}

export default styled(Countdown)`
position: relative;
display: inline-flex;
align-items: center;
justify-content: center;
color: ${(props) => props.theme.palette.trivia.countdown.text};

padding: 8px;
width: ${(props) => props.theme.sizes.countdown.width};
height: ${(props) => props.theme.sizes.countdown.height};

& .countdown-background {
    position: absolute;
    background-color: ${(props) => props.theme.palette.trivia.countdown.background};
    width: ${(props) => props.theme.sizes.countdown.width};
    height: ${(props) => props.theme.sizes.countdown.height};
}

& .countdown-background.animating {
    transition: transform .2s ease;
    transform-origin: center;
}

& .countdown-text {
    position: absolute;
    text-align: center;
    vertical-align: middle;
    font-size: ${(props) => props.theme.typography.fontSizeLarge};
    transition: transform .2s ease;
}

& .countdown-text.inactive {
    color: ${(props) => props.theme.palette.trivia.countdown.textInactive};
}
`;
