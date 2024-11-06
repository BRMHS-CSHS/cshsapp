"use client";

import { getScores } from "@/auth/actions";
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
import { useEffect, useState } from "react";

type Score = {
    id: number
    name: string
    score: number
};

export default function Home (): React.ReactElement {
    const [scores, setScores] = useState<Score[]>();

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            const result: Score[] = await getScores();
            setScores(result);
        };
        void fetchData();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="bg-gray-800 outline outline-4 outline-zinc-800 rounded-large p-20 space-y-10 flex">
                <Card>
                    <Stack divider={<StackDivider />} spacing="10" className="space-y-10 flex flex-col items-center">
                        <CardHeader>
                            <Heading size="xl">
                                <Text className="font-bold text-3xl">
                                    <Highlight
                                        query="Typer Leaderboard"
                                        styles={{
                                            px: "2",
                                            py: "1",
                                            rounded: "full",
                                            bg: "green.100"
                                        }}
                                    >
                                        Typer Leaderboard
                                    </Highlight>
                                </Text>
                            </Heading>
                        </CardHeader>
                        <CardBody className="text-[32px]">
                            <div>
                                <div className="">
                                    <TableContainer>
                                        <Table size="lg">
                                            <Thead>
                                                <Tr className="flex flex-row justify-center items-center space-x-10">
                                                    <Th>Rank</Th>
                                                    <Th>Name</Th>
                                                    <Th>Score</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {scores?.map(score => {
                                                    return (
                                                        <Tr key={score.id} className="flex flex-row justify-between items-center space-x-10">
                                                            <Td>{score.id}</Td>
                                                            <Td>{score.name}</Td>
                                                            <Td>{score.score}</Td>
                                                        </Tr>
                                                    );
                                                })}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </CardBody>
                    </Stack>
                </Card>
            </div>
        </div>
    );
}
