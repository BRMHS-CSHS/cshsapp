import type { Metadata, Viewport } from "next";
import { StrictMode } from "react";
import { NextUIProvider } from "@nextui-org/react";

import TanstackQuery from "@/components/providers/TanstackQuery";

import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export const metadata: Metadata = {
    metadataBase: new URL("https://cshs.brmhs.org"),

    title: {
        default: "BRMHS CSHS",
        template: "%s | BRMHS CSHS"
    },

    description: "Bacon ipsum dolor amet ham hock bacon ground round buffalo tongue.",
    openGraph: {
        type: "website"
    },

    keywords: [],
    twitter: {
        card: "summary_large_image"
    }
};

export const viewport: Viewport = {
    themeColor: "#1e90ff",
    colorScheme: "dark"
};

export default function RootLayout ({ children }: { children: React.ReactNode }): React.ReactElement {
    return (
        <html lang="en">
            <body className="tw-min-h-screen tw-bg-background tw-font-sans tw-antialiased tw-text-white tw-box-border tw-dark">
                <StrictMode>
                    <TanstackQuery>
                        <NextUIProvider>
                            <Header />
                            <div className="tw-container tw-mb-32 sm:tw-mt-32 tw-mt-8">
                                <div>{children}</div>
                            </div>
                            <Footer />
                        </NextUIProvider>
                    </TanstackQuery>
                </StrictMode>
            </body>
        </html>
    );
}
