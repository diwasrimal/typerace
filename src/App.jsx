import { useState, useEffect } from "react";
import { TypedWords, NormalWords, ActiveWord } from "./components.jsx";
import text from "./assets/text.js";
import "./App.css";

const WORDS = text.split(" ");

export default function App() {
  // Index of word that the cursor is currently at
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const [activeLetterIdx, setActiveLetterIdx] = useState(0);
  const [activeWord, setActiveWord] = useState(WORDS[activeWordIdx]);
  const [everythingTyped, setEverythingTyped] = useState(false);

  useEffect(() => {
    function handleKeyDown(click) {
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
        }
      }

      // Go forward to next letter if correct letter is typed
      // If there is no next letter, conclude this typing session
      if (correctLetterTyped) {
        if (isLastWord && activeLetterIdx === activeWord.length - 1) {
          setEverythingTyped(true);
          return;
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

  console.log({ activeWord, activeWordIdx, activeLetterIdx });

  if (everythingTyped) {
    return <h1>Everything typed</h1>
  }

  return (
    <div className="text-container">
      <TypedWords typedWords={WORDS.slice(0, activeWordIdx)} />
      <ActiveWord activeWord={activeWord} activeLetterIdx={activeLetterIdx} />
      <NormalWords words={WORDS.slice(activeWordIdx + 1, WORDS.length)} />
    </div>
  );
}
