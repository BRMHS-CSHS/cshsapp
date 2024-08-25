import type { Metadata, Viewport } from "next";
import { StrictMode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { NextUIProvider } from "@nextui-org/react";

import TanstackQuery from "@/components/providers/TanstackQuery";

import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/Footer";

import "./globals.css";

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
            <body className="min-h-screen bg-background font-sans antialiased text-white box-border dark">
                <StrictMode>
                    <TanstackQuery>
                        <NextUIProvider>
                            <ChakraProvider>
                                <Header />
                                <main className="dark container mb-32 sm:mt-32 mt-8 mx-auto">
                                    {children}
                                </main>
                                <Footer />
                            </ChakraProvider>
                        </NextUIProvider>
                    </TanstackQuery>
                </StrictMode>
            </body>
        </html>
    );
}
