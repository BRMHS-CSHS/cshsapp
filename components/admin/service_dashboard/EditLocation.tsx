import React, { useState } from "react";
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
import { changeLocation_Service } from "@/auth/actions";
import { toast } from "sonner";

export const EditLocationMenu = (props: any): React.ReactElement => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [location, setLocation] = useState("");

    async function handleClick (): Promise<void> {
        const data = {
            id: props.id,
            location: location
        };

        const res = await changeLocation_Service(data.id, data.location);
        if (res) toast.success("Success");
    }

    return (
        <>
            <Button onPress={onOpen} endContent={<Plus />}>
                Edit Location
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="right-24">
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Edit Location
                            </ModalHeader>
                            <ModalBody>
                                <FormControl className="space-y-2">
                                    <Input
                                        required
                                        type="email"
                                        label="Edit Location"
                                        className="max-w-xs"
                                        onChange={e => setLocation(e.target.value)}
                                    />
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
