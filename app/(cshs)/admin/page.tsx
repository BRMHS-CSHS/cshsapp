"use client";

import UserDash from "@/components/admin/usersDashboard";
import ServicesDashboard from "@/components/admin/servicesDashboard";
import { Box, Card, CardBody, Stack, StackDivider, Text } from "@chakra-ui/react";

export default function App (): React.ReactElement {
    return (
        <main>
            <Card className="flex flex-col items-center max-h-screen">
                <CardBody className="text-center max-w-screen-2xl">
                    <Stack divider={<StackDivider />} spacing="10">
                        <Box>
                            <Text pt="2" fontSize="4xl">
                                Users
                            </Text>
                            <UserDash />
                        </Box>
                        <Box>
                            <Text pt="2" fontSize="4xl">
                                Service
                            </Text>
                            <ServicesDashboard />
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </main>
    );
}
