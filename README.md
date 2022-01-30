# Wordle Helper
Checkout the live build on [GitHub Pages](https://mplecapt.github.io/wordl-help)

This tool was created more as a proof of concept. It's use is not recommended if you want to actually enjoy the game.
It also can't win the game for you, as it only helps you make better guesses. That said, in practice, it doesn't improve your guess count, mostly just the time it takes to guess

## How to use it
Follow along as you make guesses in Wordle
1. Use the on screen keyboard to enter in the letters
2. Click on the letters in the grid to mark it as `Not in the word`, `In this position`, or `In the word, but not here`
3. Press enter on the screen keyboard to evaluate the game state
4. The word list will filter out words based on the current state

The list is sorted by letter frequency in the given positions, thus words at the top of the list *should* be more likely to match the word

## TODO
- [ ] Cleanup the visual style
- [ ] Re-evaluate word scoring method to improve odds of guessing
- [ ] Add keyboard input
- [ ] \(Optional) Hook into open game to skip user input
