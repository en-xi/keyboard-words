import wordsDataAll from "../The_Oxford_3000.json";
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

let wordNum = wordsDataAll.length;

function Main() {
  const [chapterNum, setChapterNum] = useState();
  const [wordsData, setWordsData] = useState(wordsDataAll.slice(0, 1));
  const [wordsNumPerChapter, setWordsNumPerChapter] = useState(10);
  const [isChapterFinish, setIsChapterFinish] = useState(false);
  const [chosenChapterId, setChosenChapterId] = useState(0);
  const [isAllChaptersEnd, setIsAllChaptersEnd] = useState(false);
  // us type 0, uk type 1
  const [audioType, setAudioType] = useState(0);

  // console.log('render Main');
  console.log("chapterNum", chapterNum);

  useEffect(() => {
    setChapterNum(Math.ceil(wordNum / wordsNumPerChapter));
    setWordsData(
      wordsDataAll.slice(0 * wordsNumPerChapter, (0 + 1) * wordsNumPerChapter),
    );
  }, []);

  const createArray = (length) => [...Array(length)];

  const choseChapter = (chapterId) => {
    setWordsData(
      wordsDataAll.slice(
        chapterId * wordsNumPerChapter,
        (chapterId + 1) * wordsNumPerChapter,
      ),
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
      <div>
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
