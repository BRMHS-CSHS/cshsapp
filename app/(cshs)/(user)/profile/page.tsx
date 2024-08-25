import React, { useEffect } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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
