import { useState, useEffect, useRef } from "react";
import { TypedWords, NormalWords, ActiveWord, RestartIcon } from "./components.jsx";
import text from "./assets/text.js";
import "./App.css";

const WORDS = text.split(" ");

export default function App() {
  // Index of word that the cursor is currently at
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const [activeLetterIdx, setActiveLetterIdx] = useState(0);
  const [activeWord, setActiveWord] = useState(WORDS[activeWordIdx]);
  const [everythingTyped, setEverythingTyped] = useState(false);
  const timeStart = useRef(null);
  const timeTaken = useRef(null);

  useEffect(() => {
    function handleKeyDown(click) {
      if (!timeStart.current) {
        timeStart.current = Date.now();
      }

      console.log(click)

      function gotoNextWord() {
        const nextWordIdx = activeWordIdx + 1;
        setActiveWordIdx(nextWordIdx);
        setActiveLetterIdx(0);
        setActiveWord(WORDS[nextWordIdx]);
      }

      const wordTyped = activeLetterIdx > activeWord.length - 1;
      const isLastWord = activeWordIdx === WORDS.length - 1;
      const correctLetterTyped = click.key === activeWord[activeLetterIdx];

      // console.log("Word typed:", wordTyped);

      // Prevent space key's default page down
      // If current word has been typed and space is pressed
      // while some words still remain, we move to next word
      if (click.code === "Space") {
        click.preventDefault();
        if (wordTyped && !isLastWord) {
          gotoNextWord();
          timeTaken.current = (Date.now() - timeStart.current) / 1000;
        }
      }

      // Go forward to next letter if correct letter is typed
      // If there is no next letter, conclude this typing session
      if (correctLetterTyped) {
        if (isLastWord && activeLetterIdx === activeWord.length - 1) {
          timeTaken.current = (Date.now() - timeStart.current) / 1000;
          setEverythingTyped(true);
        }
        console.log("Increasing letter index");
        setActiveLetterIdx(activeLetterIdx + 1);
        return;
      }

      // Go backwards if backspace is clicked
      if (click.code === "Backspace") {
        console.log("Decreasing letter index");
        setActiveLetterIdx(Math.max(0, activeLetterIdx - 1));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLetterIdx]);

  function restartType() {
    setActiveWordIdx(0);
    setActiveWord(WORDS[0]);
    setActiveLetterIdx(0);
    setEverythingTyped(false);
    timeStart.current = null;
  }

  console.log({ activeWord, activeWordIdx, activeLetterIdx, everythingTyped });

  return (
    <>
      <div className="text-container">
        <TypedWords typedWords={WORDS.slice(0, activeWordIdx)} />
        <ActiveWord activeWord={activeWord} activeLetterIdx={activeLetterIdx} />
        <NormalWords words={WORDS.slice(activeWordIdx + 1, WORDS.length)} />

      </div>
      <div className="result">
        <h1>WPM: {timeTaken.current ? Math.round(activeWordIdx / timeTaken.current * 60) : 0}</h1>
        <button onClick={restartType} className="restart-btn">
          <RestartIcon />
        </button>
      </div>
    </>

  );

}
