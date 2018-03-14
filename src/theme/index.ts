import OpenColor from "./open-color";
import { alpha } from "./color";

export interface ITheme {
    palette: {
        text: {
            primary: string;
            secondary: string;
            disabled: string;
        };

        primary: {
            light: string;
            main: string;
            dark: string;
            text: string;

            hover: string;
        };

        secondary: {
            light: string;
            main: string;
            dark: string;
            text: string;

            hover: string;
        };

        hover: string;
        divider: string;
    };

    typography: {
        fontFamily: string;
        fontSize: 14;
    };
}

export const LightTheme: ITheme = {
    palette: {
        text: {
            primary: "rgba(0, 0, 0, 1.0)",
            secondary: "rgba(0, 0, 0, 0.80)",
            disabled: "rgba(0, 0, 0, 0.75)",
        },

        primary: {
            light: OpenColor.blue[4],
            main: OpenColor.blue[5],
            dark: OpenColor.blue[6],
            text: OpenColor.gray[0],

            hover: alpha(OpenColor.blue[5], 0.5),
        },

        secondary: {
            light: OpenColor.orange[4],
            main: OpenColor.orange[5],
            dark: OpenColor.orange[6],
            text: OpenColor.gray[9],

            hover: alpha(OpenColor.orange[5], 0.5),
        },

        hover: alpha("rgba(0, 0, 0, 1.0)", 0.18),
        divider: OpenColor.gray[4],
    },

    typography: {
        fontFamily: "Noto Sans, Helvetica, sans-serif",
        fontSize: 14,
    },
};

export const theming = {
    /** gets the text color for a particular background (if one is provided) */
    textColor: (theme: ITheme, bg?: string) => {
        switch (bg) {
        case "primary":     return theme.palette.primary.text;
        case "secondary":   return theme.palette.secondary.text;
        default:            return theme.palette.text.primary;
        }
    },

    bgColor: (theme: ITheme, color?: string) => {
        switch (color) {
            case "primary":     return theme.palette.primary.main;
            case "secondary":   return theme.palette.secondary.main;
            default:            return color;
        }
    },

    pickColorVariant: <D, P, S>(color: string | undefined | null, def: D, primary?: P, secondary?: S): (D | P | S) => {
        switch (color) {
            case "primary":     return primary || def;
            case "secondary":   return secondary || def;
            default:            return def;
        }
    },

    px2rem: (theme: ITheme, pixels: number) => {
        return (pixels / theme.typography.fontSize).toFixed(3) + "rem";
    },
};

export type IThemeProps<P> = P & {theme: ITheme};
