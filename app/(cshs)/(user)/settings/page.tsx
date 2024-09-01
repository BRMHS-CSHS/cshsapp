"use client";

import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Stack,
    StackDivider
} from "@chakra-ui/react";

import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { useSessionData } from "@/lib/auth/useSessionData";

export default function Dashboard (): React.ReactElement {
    const session = useSessionData(); // guarenteed to be non-null

    const User = {
        name: session.data?.user?.name,
        email: session.data?.user?.email,
        role: (session.data?.user as any)?.role,
        hours: (session.data?.user as any)?.hours,
        isLoggedIn: session.data?.user ? true : false
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="bg-gray-800 outline outline-4 outline-zinc-800 rounded-large p-20 space-y-10 flex">
                <Card className="space-y-10 flex flex-col items-center">
                    <CardHeader>
                        <Heading size="xl" className="font-extrabold text-3xl">Welcome, {User.name}</Heading>
                    </CardHeader>

                    <CardBody className="">
                        <Stack divider={<StackDivider />} spacing="10">
                            <div className="font-bold text-xl space-y-4">
                                <div className="flex justify-center items-center space-x-4">
                                    <Link>
                                        <Button variant="ghost" color="warning">Change Password</Button>
                                    </Link>
                                </div>
                            </div>
                        </Stack>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
