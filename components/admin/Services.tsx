import React, { useState } from "react";
import { registerService } from "@/auth/actions";
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
import { FormControl } from "@chakra-ui/react";
import { DatePicker } from "@nextui-org/date-picker";

export const ServicesMenu = (): React.ReactElement => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState<Date>();

    async function handleClick (): Promise<void> {
        const data = {
            name: name,
            location: location,
            date: date
        };
        const res = await registerService(data);

        if (res) alert(res);
    }

    return (
        <>
            <Button onPress={onOpen} color="primary" endContent={<Plus />}>
                Add new Service
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Register
                            </ModalHeader>
                            <ModalBody>
                                <FormControl className="space-y-2">
                                    <Input
                                        required
                                        type="text"
                                        label="Name"
                                        className="max-w-xs"
                                        onChange={e => setName(e.target.value)}
                                    />
                                    <Input
                                        required
                                        type="text"
                                        label="Location"
                                        className="max-w-xs"
                                        onChange={e => setLocation(e.target.value)}
                                    />
                                    <DatePicker label="Date" className="max-w-xs" onChange={e => setDate(new Date(e.year, e.month, e.day))} />
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" type="submit" onPress={handleClick}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
