import { useState, useEffect } from "react";
import text from "./assets/text.js";

function TextRenderer({ letters }) {
  return (
    <>
      {letters.map((letter, i) => {
        return (
          <span key={i} style={letter.style}>
            {letter.character}
          </span>
        );
      })}
    </>
  );
}

export default function App() {
  const [letters, setLetters] = useState(
    [...text].map((character) => {
      return { character: character, style: { textDecoration: "none" } };
    })
  );
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    // Ensures that 0 <= cursorPosition <= letters.length - 1
    function adjustPos(pos) {
      return Math.max(0, Math.min(letters.length - 1, pos));
    }

    // Increments/decrements cursorPosition based on type of key pressed
    function handleKeyDown(click) {
      if (click.key === " ") {
        click.preventDefault();
      }

      // Decrement position if backspace clicked
      if (click.key === "Backspace") {
        setCursorPosition((cursorPosition) => adjustPos(cursorPosition - 1));
      }

      // Increment position if correct letter typed
      if (click.key === letters[cursorPosition].character) {
        setCursorPosition((cursorPosition) => adjustPos(cursorPosition + 1));
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    // Change styles of letters based on current cursorPosition
    setLetters([
      // Preceding letters are correcly typed, hence green
      ...letters.slice(0, cursorPosition).map((l) => ({
        character: l.character,
        style: { color: "green" },
      })),

      // Letter at cursorPosition is underlined
      {
        character: letters[cursorPosition].character,
        style: { textDecoration: "underline" },
      },

      // Following letters must be set to normal
      ...letters.slice(cursorPosition + 1, letters.length).map((l) => ({
        character: l.character,
        style: { textDecoration: "none" },
      })),
    ]);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cursorPosition]);

  return <TextRenderer letters={letters} />;
}
