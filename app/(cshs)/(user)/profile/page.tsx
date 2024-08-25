"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default function Home (): React.ReactElement {
    useEffect(() => {
        async function authUser (): Promise<void> {
            const user = await auth();

            if (!user) redirect("/login"); // WIP: just gonna redirect to /login for now
            redirect("/login");
        }

        void authUser();
    });

    return (
        <p>hello world</p>
    );
}
