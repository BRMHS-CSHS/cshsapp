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
import { changeGrade } from "@/auth/actions";

export const EditGradeMenu = (props: any): React.ReactElement => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [grade, setGrade] = useState("");

    async function handleClick (): Promise<void> {
        const data = {
            email: props.email,
            grade: grade
        };

        const res = await changeGrade(data.email, parseInt(data.grade));
        if (res) alert("Success");
    }

    return (
        <>
            <Button onPress={onOpen} endContent={<Plus />}>
                Edit Grade
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="right-24">
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Edit Grade
                            </ModalHeader>
                            <ModalBody>
                                <FormControl className="space-y-2">
                                    <Input
                                        required
                                        type="number"
                                        label="Edit Grade"
                                        className="max-w-xs"
                                        onChange={e => setGrade(e.target.value)}
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
