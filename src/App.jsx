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

  useEffect(() => {
    // Ensures that 0 <= activeLetterIdx <= activeWord.length - 1
    function adjustLetterIdx(pos) {
      return Math.max(0, Math.min(activeWord.length, pos));
    }

    // Handles typing
    function handleKeyDown(click) {
      console.log(click)

      // Prevent space key's default page down
      if (click.code === "Space") {
        click.preventDefault();

        // Move to next word is this letter is last and space is pressed
        if (activeLetterIdx === activeWord.length) {
          console.log("Space clicked, moving to next word");
          const nextWordIdx = activeWordIdx + 1;
          setActiveWordIdx(nextWordIdx);
          setActiveLetterIdx(0);
          setActiveWord(WORDS[nextWordIdx]);
        }
      }

      // Backspace deletes text within current word
      if (click.code === "Backspace") {
        console.log("Decreasing letter index");
        setActiveLetterIdx(adjustLetterIdx(activeLetterIdx - 1));
      }

      // Go forward to next letter if correct letter is typed
      if (click.key === activeWord[activeLetterIdx]) {
        console.log("Increasing letter index");
        setActiveLetterIdx(adjustLetterIdx(activeLetterIdx + 1));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    console.log(activeLetterIdx);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLetterIdx]);

  console.log(activeWord, activeWordIdx, activeLetterIdx);

  return (
    <div className="text-container">
      <TypedWords typedWords={WORDS.slice(0, activeWordIdx)} />
      <ActiveWord activeWord={activeWord} activeLetterIdx={activeLetterIdx} />
      <NormalWords words={WORDS.slice(activeWordIdx + 1, WORDS.length)} />
    </div>
  );
}
