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
    private currentPromptAnimation: anime.AnimeInstance | null = null;

    constructor(props: IProps) {
        super(props);
        this.state = {
            animating: false,
            prompt: props.prompt,
            index: props.index,
        };
    }

    public componentWillReceiveProps(nextProps: Readonly<IProps>) {
        if (this.promptElement && nextProps.index !== this.state.index) {
            this.setState({ animating: true });
            this.animatePrompt(nextProps.prompt, nextProps.index);
        } else {
            this.setState({
                animating: false,
                index: nextProps.index,
                prompt: nextProps.prompt,
            });
        }
    }

    private async animatePrompt(nextPrompt: string, nextPromptIndex: number) {
        if (this.currentPromptAnimation) {
            this.currentPromptAnimation.pause();
        }

        const oldPrompt = this.state.prompt;
        const oldPromptIndex = this.state.index;

        const animationLeave = anime({
            targets: this.promptElement,
            translateX: -32,
            opacity: 0.0,
            duration: 1000,
            elasticity: 0,
        });
        await animationLeave.finished;

        this.setState({
            animating: false,
            index: nextPromptIndex,
            prompt: nextPrompt,
        }, async () => {
            await delay(0); // Let React finish rendering.
            const animationEnter = anime({
                targets: this.promptElement,
                translateX: 0,
                opacity: 1.0,
                duration: 1000,
                elasticity: 500,
            });
            await animationEnter.finished;
        });
    }

    public componentWillUnmount() {
        if (this.promptElement) {
            anime.remove(this.promptElement);
        }
    }

    public render() {
        return <div className={this.props.className} ref={(p) => this.promptElement = p}>
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
