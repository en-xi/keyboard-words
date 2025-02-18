import Word from "./Word.jsx";
import { useEffect, useRef, useState } from "react";

let wordIndex = 0;

function Chapter({
    wordsData,
    setIsChapterFinish,
    isChapterFinish,
    enterNextChapter,
    setIsEnd,
    isAllChaptersEnd,
    isUSPhonetic,
    isShowPhonetic,
    isShowPartOfSpeech,
    isShowDefinition,
    isShowExample,
    isShowAudio,
    isShowWord,
}) {
    const [word, setWord] = useState(wordsData[0]);
    const nextChapterButtonRef = useRef(null);

    // console.log('render Chapter')

    let wordsLength = wordsData.length;

    function hasNextWord() {
        if (wordIndex < wordsLength - 1) {
            return true;
        } else {
            console.log("inputed all words for the chapter");
            return false;
        }
    }

    function nextWord() {
        setWord(wordsData[++wordIndex]);
    }

    function initChapter() {
        setWord(wordsData[0]);
        wordIndex = 0;
    }

    function restartCurrentChapter() {
        initChapter();
        setIsChapterFinish(false);
    }

    function inputWordFinished() {
        if (hasNextWord()) {
            nextWord();
        } else {
            setIsEnd();
            setIsChapterFinish(true);
        }
    }

    useEffect(() => {
        nextChapterButtonRef.current?.focus();
    });

    useEffect(() => {
        initChapter();
    }, [wordsData]);

    if (isAllChaptersEnd) {
        return <p>finished the end chapter</p>;
    }

    if (isChapterFinish) {
        return (
            <div className="flex-col-center text-3xl">
                <p>finished current chapter!</p>
                <button
                    ref={nextChapterButtonRef}
                    onClick={enterNextChapter}
                    className="border mt-2"
                >
                    next chapter
                </button>
                <button onClick={restartCurrentChapter} className="border mt-2">
                    restart current chapter
                </button>
            </div>
        );
    }

    return (
        <>
            <Word
                word={word}
                inputWordFinished={inputWordFinished}
                isUSPhonetic={isUSPhonetic}
                isShowPhonetic={isShowPhonetic}
                isShowPartOfSpeech={isShowPartOfSpeech}
                isShowDefinition={isShowDefinition}
                isShowExample={isShowExample}
                isShowAudio={isShowAudio}
                isShowWord={isShowWord}
            />
        </>
    );
}

export default Chapter;
