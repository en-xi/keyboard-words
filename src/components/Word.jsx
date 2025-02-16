import { useContext, useEffect, useState } from "react";

let separationDotIndexs = [];
let chars = [];
let singleLetterPattern = /^[a-zA-Z\s]{1}$/;
let underscoreChars = [];

const Word = ({
    word,
    inputWordFinished,
    isUSPhonetic,
    isShowPhonetic,
    isShowPartOfSpeech,
    isShowDefinition,
    isShowExample,
    isShowAudio,
    isShowWord,
}) => {
    const [inputChars, setInputChars] = useState([]);
    const [charIndex, setCharIndex] = useState(0);

    // console.log('render Word')

    const hideChars = (syllables) => {
        separationDotIndexs = [];
        return syllables.split("").map((c, i) => {
            if (c === "·") {
                separationDotIndexs.push(i);
                return c;
            } else {
                return "_";
            }
        });
    };

    const handleKeyDown = (e) => {
        if (!singleLetterPattern.test(e.key)) {
            console.log("input char is not a letter");
            return;
        }
        console.log("onKeyDown", e.key);
        let char = e.key.toLowerCase();

        if (!(char === chars[charIndex])) {
            setInputChars(underscoreChars);
            setCharIndex(0);
            return;
        }
        const nextChars = inputChars.map((c, i) => {
            if (i === charIndex) {
                return char;
            } else {
                return c;
            }
        });
        setInputChars(nextChars);
        let nextCharIndex = charIndex + 1;
        if (!isShowWord && separationDotIndexs.includes(nextCharIndex)) {
            nextCharIndex += 1;
        }
        setCharIndex(nextCharIndex);

        if (nextCharIndex === inputChars.length) {
            console.log("input word finished");
            inputWordFinished();
            setCharIndex(0);
        }
    };

    useEffect(() => {
        let array = [];
        if (isShowWord) {
            chars = word.word.split("");
            array = chars.map((char) => "_");
        } else {
            chars = word.syllables.split("");
            array = hideChars(word.syllables);
        }
        underscoreChars = array;
        setInputChars(array);
    }, [word, isShowWord]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [inputChars]);

    return (
        <div>
            <div className="flex-col-center">
                {isShowWord ? (
                    <span className="text-7xl">{word?.word}</span>
                ) : (
                    <span className="text-7xl">{word?.syllables}</span>
                )}
                <span className="text-7xl">{inputChars}</span>

                {isShowPhonetic && (
                    <span className="text-xl">
                        {isUSPhonetic
                            ? `US: ${word?.phonetic_us}`
                            : `UK: ${word?.phonetic_uk}`}
                    </span>
                )}
                {isShowPartOfSpeech && (
                    <span className="text-xl">{word?.part_of_speech}</span>
                )}
                {isShowDefinition && (
                    <span className="text-xl">
                        definition: {word?.definition}
                    </span>
                )}
                {isShowExample && (
                    <span className="text-xl">
                        {word?.example && <p>example: {word?.example}</p>}
                    </span>
                )}
                {isShowAudio && (
                    <span className="text-xl">
                        <audio
                            controls
                            autoPlay
                            accesskey="p"
                            // src={`https://dict.youdao.com/dictvoice?type=0&audio=${word.word}`}
                            src={isUSPhonetic ? word.audio_us : word.audio_uk}
                        />
                    </span>
                )}
            </div>
        </div>
    );
};

export default Word;
