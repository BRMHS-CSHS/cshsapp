import postcssPresetEnv from "postcss-preset-env";
import postcssImport from "postcss-import";
import tailwindcss from "tailwindcss";

export default {
    plugins: [
        postcssImport,
        tailwindcss,
        postcssPresetEnv({
            features: {
                ["nesting-rules"]: {
                    noIsPseudoSelector: false
                }
            }
        })
    ]
};
