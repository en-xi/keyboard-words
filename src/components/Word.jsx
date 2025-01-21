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
      <ul>
        <li>{word?.syllables}</li>
        <li>{inputChars}</li>
        <li>/{word?.pronunciation}/</li>
        <li>{word?.partOfSpeech}</li>
        <li>definition: {word?.definition}</li>
        <li>{word?.example && <p>example: {word?.example}</p>}</li>
      </ul>
    </div>
  );
};

export default Word;
