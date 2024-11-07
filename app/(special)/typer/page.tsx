"use client";
import React, { useEffect, useState } from "react";
import { Text, Input, Highlight } from "@chakra-ui/react";
import { useSessionData } from "@/lib/auth/useSessionData";
import { changeHighScore, getUserScore } from "@/auth/actions";
import { toast } from "sonner";
import { Button, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";

const Page = (): React.ReactElement => {
    const session = useSessionData();

    const User = {
        id: session.data?.user?.id,
        high_score: (session.data?.user as any)?.high_score
    };

    const { isOpen, onOpenChange } = useDisclosure();
    const [curText, changeCurText] = useState("");
    const [cword, changeCWord] = useState(0);
    const [score, changeScore] = useState(-1);
    const [highScore, setHighScore] = useState<number>(0);
    const [words, setWords] = useState([]);
    const [currentWord, setCurrentWord] = useState("start");
    const [start, setStart] = useState(false);
    const [hideHighScore, setHideHighScore] = useState(true);
    const [seconds, setSeconds] = useState(30);

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            const result = await (await fetch("https://random-word-api.vercel.app/api?words=500")).json();
            setWords(result);
        };
        void fetchData();
    }, [User.id]);

    const timeout = setTimeout(() => {
        const interval = async (): Promise<void> => {
            if (seconds <= 0) {
                if (highScore < score) {
                    if (await changeHighScore(User.id, score)) setHighScore(score);
                };
                setStart(false);
                changeScore(-1);
                setCurrentWord("start");
                setSeconds(30);
                clearTimeout(timeout);
                return;
            }
            if (start) {
                /* buggy
                if (correct) {
                    setSeconds(() => seconds + 2);
                    setCorrect(() => false);
                }
                */
                setSeconds(() => seconds - 1);
            }
        };
        void interval();
    }, 1000);

    const handleChange = (e: any): void => {
        changeCurText(() => e.target.value);
        if (curText == currentWord) {
            // setCorrect(() => true);
            setStart(true);
            changeScore(score + 1);
            changeCWord(Math.floor(Math.random() * words.length));
            setCurrentWord(words[cword] as string);
            e.target.value = "";
        }
    };

    const handleCopy = (): void => {
        toast.error("No Copy and Paste!");
    };

    const handleClick = async (): Promise<void> => {
        if (User.id) setHighScore(await getUserScore(User.id));
        setHideHighScore(false);
    };

    return (
        <main className="flex flex-col justify-center items-center space-y-4">
            <>
                <Modal isOpen={!isOpen} onOpenChange={onOpenChange} backdrop="blur" isDismissable={false} isKeyboardDismissDisabled={false} hideCloseButton>
                    <ModalContent>
                        {onClose => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Typer
                                </ModalHeader>
                                <ModalBody>
                                    <Text> Type the above words <span className="font-bold">as fast as possible.</span> </Text>
                                    <Text> Type <span className="font-bold">"start"</span> to begin. </Text>
                                    <Text> Press <span className="font-bold">Space</span> to submit a word. </Text>
                                    <Text> Press <span className="font-bold">Begin</span> to see your high score. </Text>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" variant="ghost" onPress={onClose} onClick={handleClick}>
                                        Begin
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>

            <Link href="/typer/leaderboard" className="flex py-4">
                <Button variant="ghost" color="primary">Leaderboard</Button>
            </Link>
            <div className="font-bold text-3xl flex flex-col items-center space-y-6">
                <div>
                    <Text hidden={hideHighScore}> High Score: {highScore} </Text>
                    <Text> Score: {score} </Text>
                    <Text> Time: {seconds} </Text>
                </div>
                <Text onClick={handleCopy}>
                    <Highlight
                        query={curText}
                        styles={{
                            px: "2",
                            py: "1",
                            rounded: "full",
                            bg: "green.100"
                        }}
                    >
                        {currentWord}
                    </Highlight>
                </Text>
            </div>
            <Input htmlSize={20} className="font-semibold text-xl rounded-full text-center" onChange={handleChange} />
            {/* <div className="flex flex-col justify-center items-center font-semibold text-xl">
                <Text> Type the above word as fast as possible. </Text>
                <Text> Type "start" to begin. </Text>
                <Text> Press Space to submit a word. </Text>
            </div> */}
        </main>
    );
};

export default Page;
