import React, { SyntheticEvent, useMemo, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { addService, getServices, getUserServiceIds, removeService } from "@/auth/actions";
import { isServer } from "@tanstack/react-query";

type ServiceType = {
    m_id: string
    id: number
    name: string
    location: string
    date: string
    isService: boolean
};

export const EditServicesMenu = (props: any): React.ReactElement => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [services, setServices] = useState<ServiceType[]>();

    useMemo((): void => {
        const fetchData = async (): Promise<void> => {
            const userServiceIds = [...await getUserServiceIds(props.email)];
            const services = await getServices();

            const result: ServiceType[] = [];
            services?.map((service: any) => {
                const a = {
                    m_id: service.m_id,
                    id: service.id,
                    name: service.name,
                    location: service.location,
                    date: service.date,
                    isService: userServiceIds.includes(service.m_id) ? true : false
                };
                result.push(a);
            });
            
            setServices(result);
        };
        void fetchData();
    }, []);

    const handleSignUp = async (e: SyntheticEvent): Promise<void> => {
        const serviceId = e.currentTarget.getAttribute("data-m_id");
        const res = await addService(props.email, serviceId!);
        if (res) alert("Service Added");
    };

    const handleRemove = async (e: SyntheticEvent): Promise<void> => {
        const serviceId = e.currentTarget.getAttribute("data-m_id");
        const res = await removeService(props.email, serviceId!);
        if (res) alert("Service Removed");
    };

    return (
        <>
            <Button onPress={onOpen} endContent={<Plus />}>
                Edit Services
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="right-24">
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Edit Services
                            </ModalHeader>
                            <ModalBody>
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
                                                    if (service.isService) {
                                                        return (
                                                            <Tr key={service.id}>
                                                                <Td>{service.name}</Td>
                                                                <Td>{service.location}</Td>
                                                                <Td>{service.date}</Td>
                                                                <Td><Button type="submit" className="max-w-xs" variant="ghost" color="danger" data-m_id={service.m_id} onClick={handleRemove}>Remove</Button></Td>
                                                            </Tr>
                                                        );
                                                    }

                                                    return (
                                                        <Tr key={service.id}>
                                                            <Td>{service.name}</Td>
                                                            <Td>{service.location}</Td>
                                                            <Td>{service.date}</Td>
                                                            <Td><Button type="submit" className="max-w-xs" variant="ghost" color="success" data-m_id={service.m_id} onClick={handleSignUp}>Sign Up</Button></Td>
                                                        </Tr>
                                                    );
                                                })}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
