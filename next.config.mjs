import nextMDX from "@next/mdx";
import NextBundleAnalyzer from "@next/bundle-analyzer";

const withMDX = nextMDX();
const withBundleAnalyzer = NextBundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: "standalone",
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                hostname: "raw.githubusercontent.com"
            },
            {
                hostname: "avatars.githubusercontent.com"
            }
        ]
    },

    typescript: {
        /**
         * Disable this for a challenge.
         */
        ignoreBuildErrors: true
    },

    transpilePackages: ["@mdx-js/loader", "@mdx-js/react", "next-mdx-remote"],

    distDir: "build",
    cleanDistDir: true
};

export default withBundleAnalyzer(withMDX(nextConfig));
