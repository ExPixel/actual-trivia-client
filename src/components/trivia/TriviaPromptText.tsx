import React = require("react");
import ReactDOM = require("react-dom");
import anime = require("animejs");
import styled from "../../theme/styled";
import { delay } from "../../util";

export interface IProps {
    prompt: string;
    index: number;
    className?: string;
}

export interface IState {
    animating: boolean;
    prompt: string;
    index: number;
}

class TriviaPromptText extends React.PureComponent<IProps, IState> {
    private promptElement: HTMLDivElement | null = null;
    private animation: anime.AnimeTimelineInstance | null = null;

    constructor(props: IProps) {
        super(props);
        this.createAnimation = this.createAnimation.bind(this);
        this.state = {
            animating: false,
            prompt: props.prompt,
            index: props.index,
        };
    }

    public componentDidUpdate() {
        if (this.animation && this.props.index !== this.state.index) {
            this.animation.restart();
        } else {
            this.setState({
                animating: false,
                index: this.props.index,
                prompt: this.props.prompt,
            });
        }
    }

    private createAnimation(pelement: HTMLDivElement) {
        if (this.animation) {
            anime.remove(this.promptElement);
            this.animation.pause();
            this.animation = null;
        }
        this.promptElement = pelement;

        const timeline = anime.timeline({
            autoplay: false,
        });

        // exit animation
        timeline.add({
            targets: this.promptElement,
            translateX: -32,
            opacity: 0.0,
            duration: 800,
            elasticity: 0,
            complete: () => {
                this.setState({
                    animating: false,
                    index: this.props.index,
                    prompt: this.props.prompt,
                });
            },
        });

        // entrance animation
        timeline.add({
            targets: this.promptElement,
            translateX: 0,
            opacity: 1.0,
            duration: 800,
            elasticity: 500,

            // hope for a rerender during this time
            delay: 100,
        });

        this.animation = timeline;
    }

    public componentWillUnmount() {
        if (this.animation) {
            this.animation.pause();
            this.animation = null;
        }

        if (this.promptElement) {
            anime.remove(this.promptElement);
            this.promptElement = null;
        }
    }

    public render() {
        return <div className={this.props.className} ref={this.createAnimation}>
            {this.state.prompt}
        </div>;
    }
}

export default styled(TriviaPromptText)`
font-size: ${({theme}) => theme.typography.fontSizeExtraLarge};
padding: 8px;
white-space: pre-wrap;
user-select: none;
`;
