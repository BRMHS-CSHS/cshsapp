"use client";

import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Stack,
    StackDivider,
    Text
} from "@chakra-ui/react";

import { Button, Link } from "@nextui-org/react";

export default function Dashboard (): React.ReactElement {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="bg-gray-800 outline outline-4 outline-zinc-800 rounded-large p-20 space-y-10 flex">
                <Card className="space-y-10 flex flex-col items-center">
                    <CardHeader>
                        <Heading size="xl" className="font-extrabold text-3xl">Success</Heading>
                    </CardHeader>

                    <CardBody className="">
                        <Stack divider={<StackDivider />} spacing="10">
                            <Text className="font-bold">Your password has been reset to your original given password.</Text>
                            <div className="font-bold text-xl space-y-4">
                                <div className="flex justify-center items-center space-x-4">
                                    <Link href="/">
                                        <Button className="max-w-xs" variant="ghost" color="primary">Home Page</Button>
                                    </Link>
                                    <Link href="/login">
                                        <Button className="max-w-xs" variant="ghost" color="success">Log In</Button>
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
