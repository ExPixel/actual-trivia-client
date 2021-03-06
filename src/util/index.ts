import { RouteComponentProps, withRouter } from "react-router";

// this just requires the location property be defined on a component
// so that it doesn't block when react router tries to rerender.
// explanation can be found here:
// https://reacttraining.com/react-router/core/guides/dealing-with-update-blocking
export interface IRouteLocation {
    // where is this Location type even from?
    location: RouteComponentProps<any>["location"];
}

export function shouldComponentUpdateRoute<P, S>(
    currentProps: Readonly<P>, currentState: Readonly<S>, currentContext: any,
    nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any,
): boolean {
    if (currentState !== nextState) {
        return true;
    }

    return shallowEqual(currentProps, nextProps);
}

export function shallowEqual(a: any, b: any): boolean {
    if (a === b) { return true; }
    if (typeof a !== typeof b) { return false; }
    if (!a || !b) { return false; }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) { return false; }
    for (const key of keysA) {
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}

export function combineStyles(...styles: Array<string | string[]>): string {
    let output = "";
    for (const style of styles) {
        if (output.length !== 0) { output += " "; }
        if (Array.isArray(style)) {
            output += style.join(" ");
        } else {
            output += style;
        }
    }
    return output;
}

/**
 * Turns in object into a class list.
 * @param o object with class names as keys and a boolean value indicating whether or not the class
 *          should be included in the final class list string.
 */
export function mixClasses(o: {[prop: string]: boolean}): string {
    return Object.keys(o).filter((k) => !!o[k]).join(" ");
}

/**
 * Returns a promise that resolves after a delay. (wraps setTimeout)
 * @param ms number of milliseconds to wait
 */
export function delay(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
