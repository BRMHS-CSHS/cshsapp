import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default function Home (): React.ReactElement {
    const user = auth();
    if(!user) redirect("/login"); //WIP just gonna redirect to /login for now
    redirect("/login")

    return (
        <p>hello world</p>
    );
}
