"use client";

import { forgotPassword } from "@/auth/actions";
import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Stack,
    StackDivider,
    FormControl,
    Text
} from "@chakra-ui/react";

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

export default function Dashboard (): React.ReactElement {
    const [email, setEmail] = useState("");
    const [password0, setPassword0] = useState("");

    const handleClick = async (): Promise<void> => {
        await forgotPassword(email, password0);
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="bg-gray-800 outline outline-4 outline-zinc-800 rounded-large p-20 space-y-10 flex">
                <Card className="space-y-10 flex flex-col items-center">
                    <CardHeader>
                        <Heading size="xl" className="font-extrabold text-3xl">Forgot Password</Heading>
                    </CardHeader>
                    <Text className="font-bold">Please enter your email and your account's given password (in your email).</Text>

                    <CardBody className="">
                        <Stack divider={<StackDivider />} spacing="10">
                            <div className="font-bold text-xl space-y-4">
                                <div className="flex justify-center items-center space-x-4">
                                    <FormControl className="space-y-2 flex flex-col">
                                        <Input type="email" label="Email" className="max-w-xs" onChange={e => setEmail(e.target.value)} />
                                        <Input type="password" label="Given Password" className="max-w-xs" onChange={e => setPassword0(e.target.value)} />

                                        <Button type="submit" className="max-w-xs" color="danger" variant="ghost" onPress={handleClick}>Reset Password</Button>
                                    </FormControl>
                                </div>
                            </div>
                        </Stack>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
