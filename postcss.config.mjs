export default {
    plugins: [
        "postcss-import",
        "tailwindcss",
        ["postcss-preset-env", {
            features: {
                ["nesting-rules"]: {
                    noIsPseudoSelector: false
                }
            }
        }]
    ]
};
