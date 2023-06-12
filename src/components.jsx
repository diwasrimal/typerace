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
