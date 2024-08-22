"use client";

import { useEffect } from "react";

export default function BootstrapClient (): null {
    useEffect(() => {
        // @ts-expect-error This is not included in the typings.
        void import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    return null;
}
