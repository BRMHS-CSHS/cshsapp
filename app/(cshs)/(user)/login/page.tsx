"use client";
import { Button, Input } from "@nextui-org/react";

import {
    FormControl,
    FormLabel
} from "@chakra-ui/react";
import { useState } from "react";
import { loginUser } from "@/auth/actions";

export default function Home (): React.ReactElement {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleClick (): Promise<void> {
        const data = {
            email: email,
            password: password
        };

        const res = await loginUser(data);
        if (res) alert(res);
    }

    return (
        <div className="flex justify-center items-center">
            <section className="size-96 outline outline-zinc-900 bg-gray-800 rounded-large p-10">
                <FormControl className="space-y-2 flex flex-col">
                    <FormLabel className="font-bold flex justify-center"><h1>Login</h1></FormLabel>

                    <Input type="email" label="Email" className="max-w-xs" onChange={e => setEmail(e.target.value)} />
                    <Input type="password" label="Password" className="max-w-xs" onChange={e => setPassword(e.target.value)} />

                    <Button type="submit" className="max-w-xs" onPress={handleClick}>Submit</Button>
                </FormControl>
            </section>
        </div>
    );
}
