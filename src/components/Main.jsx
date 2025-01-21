import wordsDataAll from "../The_Oxford_3000.json";
import { useEffect, useState } from "react";
import Chapter from "./Chapter";
import { MySheet } from "@/components/MySheet.jsx";

let wordNum = wordsDataAll.length;

function Main() {
  const [chapterNum, setChapterNum] = useState();
  const [wordsData, setWordsData] = useState(wordsDataAll.slice(0, 1));
  const [wordsNumPerChapter, setWordsNumPerChapter] = useState(2);
  const [isChapterFinish, setIsChapterFinish] = useState(false);
  const [chosenChapterId, setChosenChapterId] = useState(0);
  const [isAllChaptersEnd, setIsAllChaptersEnd] = useState(false);

  // console.log('render Main');
  console.log("chapterNum", chapterNum);

  useEffect(() => {
    setChapterNum(Math.ceil(wordNum / wordsNumPerChapter));
    setWordsData(
      wordsDataAll.slice(0 * wordsNumPerChapter, (0 + 1) * wordsNumPerChapter),
    );
  }, []);

  const createArray = (length) => [...Array(length)];

  const updateWordsData = (chapterId) => {
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
    updateWordsData(chosenChapterId + 1);
  }

  function setIsEnd() {
    if (chosenChapterId === chapterNum - 1) {
      setIsAllChaptersEnd(true);
    }
  }

  function initStates(wordsNumPerChapter) {
    setWordsNumPerChapter(wordsNumPerChapter);
    setIsChapterFinish(false);
    setIsAllChaptersEnd(false);
    setChosenChapterId(0);
    setChapterNum(Math.ceil(wordNum / wordsNumPerChapter));
    setWordsData(
      wordsDataAll.slice(0 * wordsNumPerChapter, (0 + 1) * wordsNumPerChapter),
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
              initStates(e.target.value);
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="2">2</option>
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
            onChange={(e) => updateWordsData(parseInt(e.target.value))}
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
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Setup />
        <div className="w-[400px]">
          <Chapter
            wordsData={wordsData}
            setIsChapterFinish={setIsChapterFinish}
            isChapterFinish={isChapterFinish}
            enterNextChapter={enterNextChapter}
            setIsEnd={setIsEnd}
            isAllChaptersEnd={isAllChaptersEnd}
          />
        </div>
        <div className="fixed bottom-20">
          <MySheet wordsData={wordsData} />
        </div>
      </div>
    </>
  );
}

export default Main;
