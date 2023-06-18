import { useState, useEffect, useRef } from "react";
import { TypedWords, NormalWords, ActiveWord, RestartIcon } from "./components.jsx";
import { authors, sayings } from "./assets/data.js";
import "./App.css";

function randomSaying() {
  const randIdx = Math.floor(Math.random() * sayings.length);
  return sayings[randIdx];
}

export default function App() {
  // A random saying from Breaking Bad
  const [saying, setSaying] = useState(randomSaying());
  const [words, setWords] = useState(saying.quote.split(' '));
  const [score, setScore] = useState(0);
  const [scoreColor, setScoreColor] = useState("var(--color-white)");
  const [showCorrectQuoteAuthor, setShowCorrectQuoteAuthor] = useState(false);

  // Index of word that the cursor is currently at
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const [activeLetterIdx, setActiveLetterIdx] = useState(0);
  const [activeWord, setActiveWord] = useState(words[activeWordIdx]);
  const [everythingTyped, setEverythingTyped] = useState(false);

  // Timer to calculate typing speed
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
        setActiveWord(words[nextWordIdx]);
      }

      const wordTyped = activeLetterIdx > activeWord.length - 1;
      const isLastWord = activeWordIdx === words.length - 1;
      const correctLetterTyped = click.key === activeWord[activeLetterIdx];

      console.log("Word typed:", wordTyped);

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

  // Restart the typing session, resetting states and choosing new text
  function restartTyping() {
    const randSaying = randomSaying();
    const newWords = randSaying.quote.split(' ')
    setSaying(randSaying);
    setWords(newWords);
    setActiveWordIdx(0);
    setActiveWord(newWords[0]);
    setActiveLetterIdx(0);
    setEverythingTyped(false);
    timeStart.current = null;
  }

  function verifyAuthorAndRestart(name) {
    if (saying.author === name) {
      setScore(score + 1);
      setScoreColor("var(--color-green)");
    }
    else {
      setScore(score - 1);
      setScoreColor("var(--color-red)");
    }

    // Display the correct answer
    setShowCorrectQuoteAuthor(true);

    // Change the score color to normal after some time, this way
    // Score will flash green/red after correct/incorrect guess
    setTimeout(() => {
      setScoreColor("var(--color-white)");
      setShowCorrectQuoteAuthor(false);
      restartTyping();
    }, 1500);
  }

  console.log({ saying, activeWord, score, activeWordIdx, activeLetterIdx, everythingTyped });

  return (
    <>
      <div className="result">
        <h2>Score: <span style={{ color: scoreColor }}>{score}</span></h2>
        <h2>WPM: {timeTaken.current ? Math.round(activeWordIdx / timeTaken.current * 60) : 0}</h2>
        <button onClick={restartTyping} className="restart-btn">
          <RestartIcon />
        </button>
      </div>

      <div className="typing-area">
        <div className={`text-container ${everythingTyped ? "blurred" : ""}`}>
          <TypedWords typedWords={words.slice(0, activeWordIdx)} />
          <ActiveWord activeWord={activeWord} activeLetterIdx={activeLetterIdx} />
          <NormalWords words={words.slice(activeWordIdx + 1, words.length)} />
        </div>

        {everythingTyped &&
          <div className="author-chooser">
            <div style={{ textAlign: 'center', fontSize: '1.5rem', paddingTop: '1rem' }}>Who said that?</div>
            <ul>
              {authors.map((author, i) => (
                <li key={i}>
                  <button 
                    className={(author === saying.author && showCorrectQuoteAuthor) ? "correct-author" : ""}
                    onClick={(e) => verifyAuthorAndRestart(e.target.innerText)}
                  > 
                    {author} 
                  </button> 
                </li>
              ))}
            </ul>
          </div>
         }
      </div>
    </>
  );
}
