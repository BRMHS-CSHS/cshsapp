"use client";

import { addService, getServices } from "@/auth/actions";
import { useSessionData } from "@/lib/auth/useSessionData";
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
import { SyntheticEvent, useMemo, useState } from "react";

// import { useSessionData } from "@/lib/auth/useSessionData";

type ServiceType = {
    m_id: string
    id: number
    name: string
    location: string
    date: string
};

export default function Dashboard (): React.ReactElement {
    const session = useSessionData();
    const [services, setServices] = useState<ServiceType[]>();

    useMemo((): void => {
        const fetchData = async (): Promise<void> => {
            const result = await getServices();
            setServices(result);
        };
        void fetchData();
    }, []);

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
                                                {services?.map(service => {
                                                    return (
                                                        <Tr key={service.id}>
                                                            <Td>{service.name}</Td>
                                                            <Td>{service.location}</Td>
                                                            <Td>{service.date}</Td>
                                                        </Tr>
                                                    );
                                                })}
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
