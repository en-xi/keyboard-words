import wordsDataAll from "../Oxford3000.json";
import { useEffect, useState } from "react";
import Chapter from "./Chapter";
import { MySheet } from "@/components/MySheet.jsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Radio } from "lucide-react";

let wordNum = wordsDataAll.length;

function Main() {
    const [chapterNum, setChapterNum] = useState();
    const [wordsData, setWordsData] = useState(wordsDataAll.slice(0, 1));
    const [wordsNumPerChapter, setWordsNumPerChapter] = useState(10);
    const [isChapterFinish, setIsChapterFinish] = useState(false);
    const [chosenChapterId, setChosenChapterId] = useState(0);
    const [isAllChaptersEnd, setIsAllChaptersEnd] = useState(false);
    const [audioType, setAudioType] = useState(0); // us type 0, uk type 1
    const [isShowPhonetic, setIsShowPhonetic] = useState(true);
    const [isShowPartOfSpeech, setIsShowPartOfSpeech] = useState(true);
    const [isShowDefinition, setIsShowDefinition] = useState(true);
    const [isShowExample, setIsShowExample] = useState(true);
    const [isShowAudio, setIsShowAudio] = useState(true);

    // console.log('render Main');
    console.log("chapterNum", chapterNum);

    useEffect(() => {
        setChapterNum(Math.ceil(wordNum / wordsNumPerChapter));
        setWordsData(
            wordsDataAll.slice(
                0 * wordsNumPerChapter,
                (0 + 1) * wordsNumPerChapter
            )
        );
    }, []);

    const createArray = (length) => [...Array(length)];

    const choseChapter = (chapterId) => {
        setWordsData(
            wordsDataAll.slice(
                chapterId * wordsNumPerChapter,
                (chapterId + 1) * wordsNumPerChapter
            )
        );
        setIsChapterFinish(false);
        setIsAllChaptersEnd(false);
        setChosenChapterId(chapterId);
    };

    function enterNextChapter() {
        choseChapter(chosenChapterId + 1);
    }

    function setIsEnd() {
        if (chosenChapterId === chapterNum - 1) {
            setIsAllChaptersEnd(true);
        }
    }

    function updateWordsNumPerChapter(wordsNumPerChapter) {
        setWordsNumPerChapter(wordsNumPerChapter);
        setChapterNum(Math.ceil(wordNum / wordsNumPerChapter));
        choseChapter(0);
    }

    function Settings() {
        return (
            <Dialog>
                <DialogTrigger>settings</DialogTrigger>
                <DialogContent>
                    <Setup />
                </DialogContent>
            </Dialog>
        );
    }

    const Setup = () => {
        return (
            <div className="grid grid-rows-8 gap-4">
                <div>
                    set the number of words contained in each chapter:
                    <select
                        className="border border-gray-600"
                        value={wordsNumPerChapter}
                        onChange={(e) => {
                            updateWordsNumPerChapter(e.target.value);
                        }}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                    </select>
                </div>

                <div>
                    select the chapter:
                    <select
                        className="border border-gray-600"
                        value={chosenChapterId}
                        onChange={(e) => choseChapter(parseInt(e.target.value))}
                    >
                        {createArray(chapterNum).map((n, i) => {
                            return (
                                <option key={i} value={i}>
                                    {`${i + 1}`}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div>
                    select audio type:
                    <select
                        className="border border-gray-600"
                        value={audioType}
                        onChange={(e) => setAudioType(parseInt(e.target.value))}
                    >
                        <option value="0">US</option>
                        <option value="1">UK</option>
                    </select>
                </div>

                <div className="grid grid-cols-3">
                    phonetic:
                    <label>
                        <input
                            type="radio"
                            checked={isShowPhonetic}
                            onChange={() => setIsShowPhonetic(true)}
                        />
                        show
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={!isShowPhonetic}
                            onChange={() => setIsShowPhonetic(false)}
                        />
                        not show
                    </label>
                </div>

                <div className="grid grid-cols-3">
                    part_of_speech:
                    <label>
                        <input
                            type="radio"
                            checked={isShowPartOfSpeech}
                            onChange={() => setIsShowPartOfSpeech(true)}
                        />
                        show
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={!isShowPartOfSpeech}
                            onChange={() => setIsShowPartOfSpeech(false)}
                        />
                        not show
                    </label>
                </div>

                <div className="grid grid-cols-3">
                    definition:
                    <label>
                        <input
                            type="radio"
                            checked={isShowDefinition}
                            onChange={() => setIsShowDefinition(true)}
                        />
                        show
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={!isShowDefinition}
                            onChange={() => setIsShowDefinition(false)}
                        />
                        not show
                    </label>
                </div>

                <div className="grid grid-cols-3">
                    example:
                    <label>
                        <input
                            type="radio"
                            checked={isShowExample}
                            onChange={() => setIsShowExample(true)}
                        />
                        show
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={!isShowExample}
                            onChange={() => setIsShowExample(false)}
                        />
                        not show
                    </label>
                </div>

                <div className="grid grid-cols-3">
                    audio:
                    <label>
                        <input
                            type="radio"
                            checked={isShowAudio}
                            onChange={() => setIsShowAudio(true)}
                        />
                        show
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={!isShowAudio}
                            onChange={() => setIsShowAudio(false)}
                        />
                        not show
                    </label>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="flex-col-center h-[500px]">
                <div className="w-full mt-60">
                    <Chapter
                        wordsData={wordsData}
                        setIsChapterFinish={setIsChapterFinish}
                        isChapterFinish={isChapterFinish}
                        enterNextChapter={enterNextChapter}
                        setIsEnd={setIsEnd}
                        isAllChaptersEnd={isAllChaptersEnd}
                        audioType={audioType}
                        isShowPhonetic={isShowPhonetic}
                        isShowPartOfSpeech={isShowPartOfSpeech}
                        isShowDefinition={isShowDefinition}
                        isShowExample={isShowExample}
                        isShowAudio={isShowAudio}
                    />
                </div>
                <div className="">
                    <MySheet wordsData={wordsData} />
                    <span className="link">
                        <Settings />
                    </span>
                </div>
            </div>
        </>
    );
}

export default Main;
