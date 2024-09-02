"use client";
import React, { useMemo, useState, useEffect } from "react";
import { Text, Input, Highlight } from "@chakra-ui/react";

const Page = (): React.ReactElement => {
    const [curText, changeCurText] = useState("");
    const [cword, changeCWord] = useState(0);
    const [score, changeScore] = useState(-1);
    const [highScore, setHighScore] = useState(0);
    const [words, setWords] = useState([]);
    const [currentWord, setCurrentWord] = useState("start");
    const [start, setStart] = useState(false);
    const [seconds, setSeconds] = useState(30);

    useEffect(() => {
        if (!start) return;
        if (seconds <= 0) { // buggy
            setSeconds(seconds + 31);
            if (highScore < score) setHighScore(score);
            changeScore(0);
            setCurrentWord("start");
            setStart(false);
            alert("You died.");
        }
        const interval = async (): Promise<void> => {
            setTimeout(async () => {
                setSeconds(seconds - 1);
            }, 1000);
        };
        void interval();
    }, [start, seconds, highScore, score]);

    useMemo((): void => {
        const fetchData = async (): Promise<void> => {
            const result = await (await fetch("https://random-word-api.vercel.app/api?words=500")).json();
            setWords(result);
        };
        void fetchData();
    }, []);

    const handleChange = (e: any): void => {
        changeCurText(() => e.target.value);
        if (curText == currentWord) {
            setStart(true);
            changeScore(score + 1);
            changeCWord(Math.floor(Math.random() * words.length));
            setCurrentWord(words[cword] as string);
            e.target.value = "";
        }
    };

    const handleCopy = (): void => {
        alert("No Copy and Paste!");
    };

    return (
        <main className="flex flex-col justify-center items-center space-y-4">
            <div className="font-bold text-3xl flex flex-col items-center space-y-6">
                <div>
                    <Text> High Score: {highScore} </Text>
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
            <div className="flex flex-col justify-center items-center font-semibold text-xl">
                <Text> Type the above word as fast as possible. </Text>
                <Text> Type "start" to begin. </Text>
                <Text> Press Space to submit a word. </Text>
            </div>
        </main>
    );
};

export default Page;
