import type { Config } from "tailwindcss";

import { nextui as nextUI } from "@nextui-org/react";

const config: Config = {
    mode: "jit",
    content: [
        "./components/**/*.{js,ts,jsx,tsx,md,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,md,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        container: {
            center: true,
            padding: "1rem"
        },
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: "hsl(var(--primary))",
                secondary: "hsl(var(--secondary))",
                cshs: {
                    DEFAULT: "hsl(var(--cshs))"
                }
            }
        }
    },
    darkMode: "class",
    plugins: [
        nextUI()
    ]
};

export default config;
