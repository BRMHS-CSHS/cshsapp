import React, { useState } from "react";
import { registerUser } from "@/auth/actions";
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

export const RegisterMenu = (): React.ReactElement => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [grade, setGrade] = useState("");
    const [hours, setHours] = useState("");

    async function handleClick (): Promise<void> {
        const data = {
            email: email,
            password: password,
            name: name,
            grade: grade,
            hours: hours
        };
        console.log(typeof data);
        const res = await registerUser(data);

        if (res) alert(res);
    }

    return (
        <>
            <Button onPress={onOpen} color="primary" endContent={<Plus />}>
                Add New
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
                                        type="email"
                                        label="Email"
                                        className="max-w-xs"
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <Input
                                        required
                                        type="password"
                                        label="Password"
                                        className="max-w-xs"
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <Input
                                        required
                                        type="text"
                                        label="Name"
                                        className="max-w-xs"
                                        onChange={e => setName(e.target.value)}
                                    />
                                    <Input
                                        type="number"
                                        label="Grade"
                                        className="max-w-xs"
                                        onChange={e => setGrade(e.target.value)}
                                    />
                                    <Input
                                        type="number"
                                        label="Hours"
                                        className="max-w-xs"
                                        onChange={e => setHours(e.target.value)}
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
