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

// import { useSessionData } from "@/lib/auth/useSessionData";

export default function Dashboard (): React.ReactElement {
    // const session = useSessionData();

    /* const User = {
        name: session.data?.user?.name,
        email: session.data?.user?.email,
        role: (session.data?.user as any)?.role,
        hours: (session.data?.user as any)?.hours,
        isLoggedIn: session.data?.user ? true : false
    }; */

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="bg-gray-800 outline outline-4 outline-zinc-800 rounded-large p-20 space-y-10 flex">
                <Card className="space-y-10 flex flex-col items-center">
                    <CardHeader>
                        <Heading size="xl" className="font-extrabold text-5xl">
                            <Text className="font-bold text-xl">
                                <Highlight
                                    query="Current Opportunities"
                                    styles={{
                                        px: "2",
                                        py: "1",
                                        rounded: "full",
                                        bg: "green.100"
                                    }}
                                >
                                    Current Opportunities
                                </Highlight>
                            </Text>
                        </Heading>
                    </CardHeader>

                    <CardBody className="">
                        <Stack divider={<StackDivider />} spacing="10">
                            <div className="space-y-4">
                                <div className="flex flex-col justify-center items-center">
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
                                                    <Td><Button type="submit" className="max-w-xs" variant="ghost" color="success">Sign up</Button></Td>
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
