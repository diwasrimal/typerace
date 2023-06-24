# Typing-bad

A fun typing game where you type quotes from [Breaking Bad](https://en.wikipedia.org/wiki/Breaking_Bad) and guess the quote's author.

## Quick Setup
```sh
git clone https://github.com/diwasrimal/typing-bad.git
cd typing-bad
npm install
npm run build
npm run preview
```

## Run the development server
* `npm run dev`: Run on localhost
* `npm run network`: Run on local network

## Working process 
- Initialize States
- Render text to be typed
- Add an event listener for keydown when `<App />` mounts
- Handle key presses
    - If correct letter is typed, go forward to next letter
    - If backspace pressed, go backwards
    - If space is pressed and no letters of current word are left to type, move to next word.
- When everything is typed, ask for the quote's author
    - If correct author guessed, increase score by 1
    - If incorrect author guessed, decrease score by 1

## Future Ideas
- [ ] Allow two players to compete with each other.

## Contributing
Any sort of contributions are appreciated!
