"use client";

import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    Stack,
    StackDivider,
    Highlight,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer
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
                                <div className="flex flex-col justify-center items-center">
                                    <Text>
                                        <Highlight
                                            query="Hours:"
                                            styles={{
                                                px: "2",
                                                py: "1",
                                                rounded: "full",
                                                bg: "green.100"
                                            }}
                                        >
                                            Hours:
                                        </Highlight>
                                    </Text>
                                    <Text className="my-2 font-semibold">
                                        {User.hours}
                                    </Text>
                                </div>
                                <div className="flex justify-center items-center space-x-4">
                                    <Link href="/service-history">
                                        <Button variant="ghost" color="primary">History</Button>
                                    </Link>
                                    <Link href="/service">
                                        <Button variant="ghost" color="success">Opportunities</Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex flex-col justify-center items-center">
                                    <Text className="font-bold text-xl">
                                        <Highlight
                                            query="Active Services"
                                            styles={{
                                                px: "2",
                                                py: "1",
                                                rounded: "full",
                                                bg: "green.100"
                                            }}
                                        >
                                            Active Services
                                        </Highlight>
                                    </Text>
                                </div>
                                <div className="">
                                    <TableContainer>
                                        <Table size="lg">
                                            <Thead>
                                                <Tr>
                                                    <Th>Service</Th>
                                                    <Th>Location</Th>
                                                    <Th>Date</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                <Tr>
                                                    <Td>CS Department Volunteer</Td>
                                                    <Td>LSU</Td>
                                                    <Td>November 4, 2024</Td>
                                                </Tr>
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </Stack>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
