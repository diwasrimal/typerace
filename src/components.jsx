import "./components.css";

export function TypedWords({ typedWords }) {
  return (
    <span className="typed-color">
      {typedWords.join(' ')}
    </span>
  )
}

export function NormalWords({ words }) {
  return (
    <span>
      {words.join(' ')}
    </span>
  )
}

export function ActiveWord({ activeWord, activeLetterIdx }) {
  return (
    <>
      <span>{' '}</span>
      <span className="typed-color">
        {activeWord.slice(0, activeLetterIdx)}
      </span>
      <span className="active-letter">
        {activeWord[activeLetterIdx]}
      </span>
      <span>
        {activeWord.slice(activeLetterIdx + 1, activeWord.length)}
      </span>
      <span>{' '}</span>
    </>
  );
}

export function RestartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="2em"
      width="2em"
    >
      <path d="M12 4c2.1 0 4.1.8 5.6 2.3 3.1 3.1 3.1 8.2 0 11.3-1.8 1.9-4.3 2.6-6.7 2.3l.5-2c1.7.2 3.5-.4 4.8-1.7 2.3-2.3 2.3-6.1 0-8.5C15.1 6.6 13.5 6 12 6v4.6l-5-5 5-5V4M6.3 17.6C3.7 15 3.3 11 5.1 7.9l1.5 1.5c-1.1 2.2-.7 5 1.2 6.8.5.5 1.1.9 1.8 1.2l-.6 2c-1-.4-1.9-1-2.7-1.8z" />
    </svg>
  );
}
