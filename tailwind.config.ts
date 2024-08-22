import type { Config } from "tailwindcss";

import twForms from "@tailwindcss/forms";
import twTypography from "@tailwindcss/typography";

import { nextui as nextUI } from "@nextui-org/react";

const config: Config = {
    mode: "jit",
    prefix: "tw-",
    content: [
        "./components/**/*.{js,ts,jsx,tsx,md,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,md,mdx}"
    ],
    theme: {
        container: {
            screens: {
                ["2xl"]: "1400px"
            },
            center: true,
            padding: "1rem"
        },
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                cshs: {
                    DEFAULT: "hsl(var(--cshs))"
                }
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)"
            },
            typography: {
                DEFAULT: {
                    css: {
                        ["max-width"]: "100%"
                    }
                }
            }
        }
    },
    plugins: [
        twForms,
        twTypography,
        nextUI()
    ]
};

export default config;
