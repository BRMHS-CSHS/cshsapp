import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    DatePicker
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { FormControl } from "@chakra-ui/react";
import { changeDate_Service } from "@/auth/actions";
import { toast } from "sonner";

export const EditDateMenu = (props: any): React.ReactElement => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [date, setDate] = useState<Date>();

    async function handleClick (): Promise<void> {
        const data = {
            id: props.id,
            date: date
        };

        const res = await changeDate_Service(data.id, data.date!);
        if (res) toast.success("Success");
    }

    return (
        <>
            <Button onPress={onOpen} endContent={<Plus />}>
                Edit Date
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="right-24">
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Edit Date
                            </ModalHeader>
                            <ModalBody>
                                <FormControl className="space-y-2">
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
