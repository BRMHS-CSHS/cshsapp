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
import { changeEmail } from "@/auth/actions";
import { toast } from "sonner";

export const EditEmailMenu = (props: any): React.ReactElement => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [email, setEmail] = useState("");

    async function handleClick (): Promise<void> {
        const data = {
            email: props.email,
            newEmail: email
        };

        const res = await changeEmail(data.email, data.newEmail);
        if (res) toast.success("Success");
    }

    return (
        <>
            <Button onPress={onOpen} endContent={<Plus />}>
                Edit Email
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="right-24">
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Edit Email
                            </ModalHeader>
                            <ModalBody>
                                <FormControl className="space-y-2">
                                    <Input
                                        required
                                        type="email"
                                        label="Edit Email"
                                        className="max-w-xs"
                                        onChange={e => setEmail(e.target.value)}
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
