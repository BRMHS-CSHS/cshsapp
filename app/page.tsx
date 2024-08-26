"use client";

import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    Stack,
    StackDivider,
    Box,
    Highlight
} from "@chakra-ui/react";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

export default function Home (): React.ReactElement {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="bg-gray-800 outline outline-4 outline-zinc-800 rounded-large p-20 space-y-10 flex flex-col">
                <Card className="space-y-10 flex flex-col items-center ">
                    <CardHeader>
                        <Heading size="xl" className="font-extrabold">Computer Science Honor Society</Heading>
                    </CardHeader>

                    <CardBody>
                        <Stack divider={<StackDivider />} spacing="10">
                            <Box>
                                <Heading size="sm" textTransform="uppercase">
                                    <Highlight
                                        query="Who are we?"
                                        styles={{
                                            px: "2",
                                            py: "1",
                                            rounded: "full",
                                            bg: "green.100"
                                        }}
                                    >
                                        Who are we?
                                    </Highlight>
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                    View a summary of all your clients over the last month.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size="xs" textTransform="uppercase">
                                    <Highlight
                                        query="Overview"
                                        styles={{
                                            px: "2",
                                            py: "1",
                                            rounded: "full",
                                            bg: "green.100"
                                        }}
                                    >
                                        Overview
                                    </Highlight>
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                    Check out the overview of your clients.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size="xs" textTransform="uppercase">
                                    <Highlight
                                        query="Equity"
                                        styles={{
                                            px: "2",
                                            py: "1",
                                            rounded: "full",
                                            bg: "green.100"
                                        }}
                                    >
                                        Equity
                                    </Highlight>
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                    See a detailed analysis of all your business clients.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size="xs" textTransform="uppercase">
                                    <Highlight
                                        query="Service"
                                        styles={{
                                            px: "2",
                                            py: "1",
                                            rounded: "full",
                                            bg: "green.100"
                                        }}
                                    >
                                        Service
                                    </Highlight>
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                    See a detailed analysis of all your business clients.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size="xs" textTransform="uppercase">
                                    <Highlight
                                        query="Excellence"
                                        styles={{
                                            px: "2",
                                            py: "1",
                                            rounded: "full",
                                            bg: "green.100"
                                        }}
                                    >
                                        Excellence
                                    </Highlight>
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                    See a detailed analysis of all your business clients.
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                </Card>
                <Link href="/login">
                    <Button color="primary">Log In</Button>
                </Link>
            </div>
        </div>
    );
}
