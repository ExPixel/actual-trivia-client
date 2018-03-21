import OpenColor from "./open-color";
import { alpha } from "./color";
import { genAllShadows, elevationTransitionValue } from "./shadow";

export interface ITheme {
    palette: {
        background: string;

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

        error: {
            light: string;
            main: string;
            dark: string;
            text: string;
        };

        menu: {
            itemBackground: string;
            itemText: string;
            itemBackgroundHover: string;
        };

        trivia: {
            prompt: {
                text: string;
            };

            choice: {
                text: string;
                background: string;
                backgroundHover: string;

                correct: {
                    text: string;
                    background: string;
                    backgroundHover: string;
                };

                incorrect: {
                    text: string;
                    background: string;
                    backgroundHover: string;
                };

                selected: {
                    text: string;
                    background: string;
                    backgroundHover: string;
                };
            };

            participant: {
                background: string;
                backgroundHover: string;
                text: string;
            }

            countdown: {
                background: string;
                text: string;
                textInactive: string;
            }
        };

        hover: string;
        active: string;
        divider: string;
    };

    typography: {
        fontFamily: string;
        baseFontSize: number;
        fontSize: string;
        fontSizeSmall: string;
        fontSizeLarge: string;
        fontSizeExtraLarge: string;
    };

    sizes: {
        countdown: {
            width: string;
            height: string;
        };
    };
}

export const LightTheme: ITheme = {
    palette: {
        background: OpenColor.gray[0],
        text: {
            primary:    "rgba(0, 0, 0, 1.0)",
            secondary:  "rgba(0, 0, 0, 0.60)",
            disabled:   "rgba(0, 0, 0, 0.70)",
        },

        primary: {
            light:  OpenColor.blue[4],
            main:   OpenColor.blue[5],
            dark:   OpenColor.blue[6],
            text:   OpenColor.gray[0],

            hover:  alpha(OpenColor.blue[5], 0.5),
        },

        secondary: {
            light:  OpenColor.orange[4],
            main:   OpenColor.orange[5],
            dark:   OpenColor.orange[6],
            text:   OpenColor.gray[9],

            hover:  alpha(OpenColor.orange[5], 0.5),
        },

        error: {
            light:  OpenColor.red[4],
            main:   OpenColor.red[5],
            dark:   OpenColor.red[6],
            text:   OpenColor.gray[0],
        },

        menu: {
            itemBackground: OpenColor.blue[6],
            itemText:       OpenColor.gray[0],
            itemBackgroundHover:      OpenColor.blue[8],
        },

        trivia: {
            prompt: {
                text: OpenColor.gray[9],
            },

            choice: {
                text: OpenColor.gray[9],
                background: "transparent",
                backgroundHover: alpha(OpenColor.gray[5], 0.20),

                selected: {
                    text: OpenColor.gray[9],
                    background: alpha(OpenColor.gray[5], 0.25),
                    backgroundHover: alpha(OpenColor.gray[5], 0.35),
                },

                correct: {
                    text: OpenColor.gray[9],
                    background: alpha(OpenColor.green[5], 0.30),
                    backgroundHover: alpha(OpenColor.green[5], 0.40),
                },

                incorrect: {
                    text: OpenColor.gray[9],
                    background: alpha(OpenColor.red[5], 0.30),
                    backgroundHover: alpha(OpenColor.red[5], 0.40),
                },
            },

            participant: {
                background: alpha(OpenColor.gray[5], 0.25),
                backgroundHover: alpha(OpenColor.gray[5], 0.35),
                text: OpenColor.gray[9],
            },

            countdown: {
                background: OpenColor.gray[9],
                text: OpenColor.gray[0],
                textInactive: OpenColor.gray[5],
            },
        },

        hover:  "rgba(0, 0, 0, 0.15)",
        active: "rgba(0, 0, 0, 0.10)",
        divider:    OpenColor.gray[4],
    },

    typography: {
        fontFamily: "Noto Sans, Helvetica, sans-serif",
        baseFontSize:   14,
        fontSize:       "1.0rem",
        fontSizeSmall:  "0.8rem",
        fontSizeLarge:  "1.4rem",
        fontSizeExtraLarge: "1.8rem",
    },

    sizes: {
        countdown: {
            width: "2.8rem",
            height: "2.8rem",
        },
    },
};

const shadows = genAllShadows(1, 24);
export const theming = {
    /** gets the text color for a particular background (if one is provided) */
    textColor: (theme: ITheme, bg?: string) => {
        switch (bg) {
        case "primary":     return theme.palette.primary.text;
        case "secondary":   return theme.palette.secondary.text;
        case "error":       return theme.palette.error.text;
        default:            return theme.palette.text.primary;
        }
    },

    bgColor: (theme: ITheme, color?: string) => {
        switch (color) {
            case "primary":     return theme.palette.primary.main;
            case "secondary":   return theme.palette.secondary.main;
            case "error":       return theme.palette.error.main;
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
        return (pixels / theme.typography.baseFontSize).toFixed(3) + "rem";
    },

    shadowValue: (elevation: number): string => {
        return shadows[elevation];
    },

    shadowTransitionValue: elevationTransitionValue,
};

export type IThemeProps<P> = P & {theme: ITheme};
