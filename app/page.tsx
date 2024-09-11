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
                <Card className="space-y-10 flex flex-col items-center">
                    <CardHeader>
                        <Heading size="xl" className="font-extrabold text-3xl">Computer Science Honor Society</Heading>
                    </CardHeader>

                    <CardBody className="text-center">
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
                                <Text pt="2" fontSize="lg">
                                    CSHS aims to promote and embody computer science and foster a community willing to abide by the three core values of equity, service, and excellence.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size="lg" textTransform="uppercase">
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
                                <Text pt="2" fontSize="lg">
                                    The purpose of this organization is to encourage students’ enthusiasm for computer science, to honor academic excellence, and to promote service. Society members and advisors commit to and embody three core values: equity, service, and excellence.
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
                                <Text pt="2" fontSize="lg">
                                    A realization that any student has the potential to enroll, grow, and excel in computing.
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
                                <Text pt="2" fontSize="lg">
                                    Empower members to become ambassadors of the CS discipline, helping underscore its importance as a mainstay in the school and the community.
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
                                <Text pt="2" fontSize="lg">
                                    A commitment to promoting outstanding scholarship in computer science coursework.
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                </Card>
                <div className="flex justify-center space-x-4">
                    <Link href="/login">
                        <Button variant="ghost" color="primary">Log In</Button>
                    </Link>
                    <Link href="/service">
                        <Button variant="ghost" color="success">View Service Opportunities</Button>
                    </Link>
                    <Link target="_blank" href="https://csteachers.org/cshs/">
                        <Button variant="ghost" color="danger">Visit CSHS Site</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
