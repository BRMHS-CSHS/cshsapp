"use client";

import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Stack,
    StackDivider,
    FormControl
} from "@chakra-ui/react";

import { Button, Input } from "@nextui-org/react";
import { useSessionData } from "@/lib/auth/useSessionData";
import { useState } from "react";
import { changePassword } from "@/auth/actions";

export default function Dashboard (): React.ReactElement {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const session = useSessionData(); // guarenteed to be non-null

    const User = {
        name: session.data?.user?.name!,
        email: session.data?.user?.email!,
        role: (session.data?.user as any)?.role!,
        hours: (session.data?.user as any)?.hours,
        isLoggedIn: session.data?.user ? true : false
    };

    const handleClick = async (): Promise<void> => {
        await changePassword(User.email, oldPassword, newPassword);
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="bg-gray-800 outline outline-4 outline-zinc-800 rounded-large p-20 space-y-10 flex">
                <Card className="space-y-10 flex flex-col items-center">
                    <CardHeader>
                        <Heading size="xl" className="font-extrabold text-3xl">Change Password</Heading>
                    </CardHeader>

                    <CardBody className="">
                        <Stack divider={<StackDivider />} spacing="10">
                            <div className="font-bold text-xl space-y-4">
                                <div className="flex justify-center items-center space-x-4">
                                    <FormControl className="space-y-2 flex flex-col">
                                        <Input type="password" label="Old Password" className="max-w-xs" onChange={e => setOldPassword(e.target.value)} />
                                        <Input type="password" label="New Password" className="max-w-xs" onChange={e => setNewPassword(e.target.value)} />

                                        <Button type="submit" className="max-w-xs" color="danger" variant="ghost" onPress={handleClick}>Change Password</Button>
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
