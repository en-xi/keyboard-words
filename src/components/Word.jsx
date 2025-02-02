import { useContext, useEffect, useState } from "react";

let separationDotIndexs = [];
let chars = [];
let singleLetterPattern = /^[a-zA-Z]{1}$/;
let underscoreChars = [];

const Word = ({ word, inputWordFinished }) => {
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
    if (separationDotIndexs.includes(nextCharIndex)) {
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
    chars = word.syllables.split("");
    let array = hideChars(word.syllables);
    underscoreChars = array;
    setInputChars(array);
  }, [word]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputChars]);

  return (
    <div>
      <div className="flex-col-center">
        <span className="text-7xl">{word?.syllables}</span>
        <span className="text-7xl">{inputChars}</span>
        <span className="text-7xl">/{word?.pronunciation}/</span>
        <span className="text-xl">{word?.partOfSpeech}</span>
        <span className="text-xl">definition: {word?.definition}</span>
        <span className="text-xl">
          {word?.example && <p>example: {word?.example}</p>}
        </span>
        <span className="text-xl">
          <audio
            controls
            autoPlay
            src={`https://dict.youdao.com/dictvoice?type=0&audio=${word.word}`}
          />
        </span>
      </div>
    </div>
  );
};

export default Word;
