"use client";
import { Button, Input, Link } from "@nextui-org/react";
import { toast } from "sonner";

import {
    FormControl,
    FormLabel
} from "@chakra-ui/react";
import { useState } from "react";
import { loginUser } from "@/auth/actions";
import { useRouter } from "next/navigation";

export default function Home (): React.ReactElement {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    async function handleClick (): Promise<void> {
        const data = {
            email: email,
            password: password
        };

        const res = await loginUser(data);
        if (res) {
            toast.success("Success!");
            router.push("/");
        } else toast.error("Bad Email or Password.");
    }

    return (
        <div className="flex justify-center items-center">
            <section className="size-96 outline outline-zinc-900 bg-gray-800 rounded-large p-10 space-y-4 flex flex-col justify-between">
                <FormControl className="space-y-2 flex flex-col">
                    <FormLabel className="font-bold flex justify-center"><h1>Login</h1></FormLabel>

                    <Input type="email" label="Email" className="max-w-xs" onChange={e => setEmail(e.target.value)} />
                    <Input type="password" label="Password" className="max-w-xs" onChange={e => setPassword(e.target.value)} />

                    <Button type="submit" className="max-w-xs" color="success" variant="ghost" onPress={handleClick}>Login</Button>
                </FormControl>
                <Link className="flex justify-center" href="/forgot_password">
                    <Button type="submit" className="max-w-xs" variant="ghost" color="danger">Forgot Password?</Button>
                </Link>
            </section>
        </div>
    );
}
