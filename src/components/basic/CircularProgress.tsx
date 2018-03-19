import React = require("react");
import ReactDOM = require("react-dom");
import styled from "../../theme/styled";
import { keyframes } from "react-emotion";

export interface IProps {
    indeterminate?: boolean;
    progress?: number;
    max?: number;
    size?: number | string;
    className?: string;
    style?: React.CSSProperties;
}

function getProgress(indeterminate?: boolean, progress?: number, max?: number): number | undefined {
    if (indeterminate) {
        return undefined;
    } else {
        // if progress or max are not numbers and indeterminate is undefined
        // then this is just indeterminate.
        const indeterminateUndefined = typeof indeterminate !== "boolean" && !indeterminate;
        if ((typeof progress !== "number" && indeterminateUndefined) ||
            (typeof max !== "number" && indeterminateUndefined)) {
            return undefined;
        }

        const p = typeof progress === "number" ? (progress || 0) : 0;
        const m = typeof max === "number" ? (max || 0) : 0;
        if (m < p || m === 0) {
            return 1.0;
        } else {
            return p / m;
        }
    }
}

const CircularProgress = (props: IProps) => {
    const progress = getProgress(props.indeterminate, props.progress, props.max);
    console.assert(progress === undefined, "circular progresss currently only supports being an in indeterminate state");
    const size = typeof props.size === "number" ? (props.size + "px") : (props.size || "16px");
    if (progress === undefined) {
        return <span className={props.className} style={props.style}>
            <svg
                width={size} height={size}
                viewBox="0 0 66 66"
                className="circular-progress-spinner"
                xmlns="http://www.w3.org/2000/svg">
                <circle
                    className="circular-progress-path"
                    fill="none"
                    strokeWidth="4"
                    strokeLinecap="round"
                    cx="33" cy="33" r="30">
                </circle>
            </svg>
        </span>;
    } else {
        return <span>{progress}</span>;
    }
};

const spinnerAnimationDur = "1.4s";
const spinnerOffset = 187;

const kfSpinnerDash = keyframes`
    0% {
        stroke-dashoffset: ${spinnerOffset};
    }

    50% {
        stroke-dashoffset: ${spinnerOffset / 4};
        transform: rotate(135deg);
    }

    100% {
        stroke-dashoffset: ${spinnerOffset};
        transform: rotate(450deg);
    }
`;

const kfSpinnerRotator = keyframes`
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(270deg);
    }
`;

export default styled(CircularProgress)`
padding: 0;
width: ${(props) => typeof props.size === "number" ? (props.size + "px") : (props.size || "16px")};
height: ${(props) => typeof props.size === "number" ? (props.size + "px") : (props.size || "16px")};

& .circular-progress-spinner {
    animation: ${kfSpinnerRotator} ${spinnerAnimationDur} linear infinite;
}

& .circular-progress-path {
    stroke: currentColor;
    stroke-dasharray: ${spinnerOffset};
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: ${kfSpinnerDash} ${spinnerAnimationDur} ease-in-out infinite;
}
`;

/*
@import '~@/assets/sass/_variables';

$offset: 187;
$duration: 1.4s;

.spinner {
    animation: spinner-rotator $duration linear infinite;

    .path {
        stroke-dasharray: $offset;
        stroke-dashoffset: 0;
        transform-origin: center;
        animation: spinner-dash $duration ease-in-out infinite;
        stroke: $primary-color;
    }

    &.icolor {
        .path {
            stroke: currentColor;
        }
    }
}
*/
