import parseColor = require("colorparser");

/**
 * Takes 3 or 4 color components and returns a color in the form of
 * #RRGGBB or rgba(RR, GG, BB, A)
 * @param r red component (byte)
 * @param g green component (byte)
 * @param b blue component (byte)
 * @param a alpha component (float in range [0, 1])
 */
export function rgba(r: number, g: number, b: number, a: number = 1.0): string {
    // tslint:disable:no-bitwise
    r = clamp(r, 0, 255) | 0;
    g = clamp(g, 0, 255) | 0;
    b = clamp(b, 0, 255) | 0;
    a = clamp(a, 0, 1.0);
    if (a >= 1.0) {
        return "#" + hex(r, 2) + hex(g, 2) + hex(b, 2);
    } else {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    // tslint:enable:no-bitwise
}

/**
 * Sets the alpha component of a color.
 * @param color The color to set the alpha component of.
 * @param value The new alpha component of the color.
 */
export function alpha(color: string | number, alphaComponent: number): string {
    const c = parseColor(color);
    if (!c) {
        return "#000000";
    } else {
        const out = rgba(c[0], c[1], c[2], alphaComponent);
        return out;
    }
}

function clamp(v: number, min: number, max: number): number {
    return v < min ? min : (v > max ? max : v);
}

function hex(value: number, pad: number): string {
    let s = value.toString(16);
    while (s.length < pad) {
        s = "0" + s;
    }
    return s;
}
