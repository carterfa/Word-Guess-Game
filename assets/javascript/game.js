let winCount = 0;
let wordBank = ["whale shark", "grizzly bear", "bald eagle", "rooster", "rabbit", "dog", "ghost crab", "african elephant", "bengal tiger", "sea turtle", "kangaroo", "giant panda", "weasel", "humpback whale", "bottlenose dolphin", "giraffe"]

const guessedLetters = document.getElementById('guessedLetters');
const mysteryWordText = document.getElementById('mysteryWordText');
const totalWins = document.getElementById('totalWins');
const guessTxt = document.getElementById('guessTxt');
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");

//establishes empty sets
let guessedSet = [];
let mysterySet = [];

//establishes guesses
let guessNum = 10;

const game = {

        reset: function () {
                //reset sets
                guessedSet = [];
                mysterySet = [];

                //reset guesses
                guessNum = 10;

                //reset display
                guessedLetters.textContent = "";
                guessTxt.textContent = "10";

                //Generates random mystery word from word bank
                mysteryWordText.textContent = "";
                mysteryWord = wordBank[Math.floor(Math.random() * wordBank.length)];
                console.log(mysteryWord);

                //Fills array with dashes
                for (i = 0; i < mysteryWord.length; i++) {
                        if (mysteryWord[i] === " ") {
                                mysterySet.push(" ");
                        } else {
                                mysterySet.push("_");
                        }
                }

                //Displays contents of dash array
                for (i = 0; i < mysterySet.length; i++) {
                        if (mysterySet[i] === " ") {
                                mysteryWordText.append('\xa0');
                        } else {
                                let character = mysterySet[i];
                                mysteryWordText.append(character + " ");
                                console.log(character);
                        }

                }

                resetBtn.style.display = "none";
                message.textContent = "";

        }
}

document.onkeyup = function (event) {

        game.reset();


        //user interaction function
        document.onkeyup = function (event) {

                let userInput = event.key.toLowerCase();


                //Check for alphabet input
                if (userInput.match(/^[a-z]$/) && !guessedSet.includes(userInput)) {
                        guessNum--;

                        //Searches mystery word for letters incl. repeats, if found letter adjust mystery set array
                        let letterCheck = false;
                        for (i = 0; i <= mysteryWord.length; i++) {
                                if (userInput == mysteryWord[i]) {
                                        letterCheck = true;
                                        mysterySet[i] = userInput;
                                        //console.log(mysterySet);
                                }

                        }

                        //let letterCheck = mysteryWord.search(userInput);
                        //console.log(letterCheck)

                        if (!letterCheck) {
                                guessedSet.push(userInput);
                                //Print Guesses
                                guessedLetters.textContent = "";
                                for (i = 0; i < guessedSet.length; i++) {
                                        let text = guessedSet[i].toUpperCase();
                                        guessedLetters.append(text + " ");

                                }

                        } else {

                                guessedSet.push(userInput);

                                //Redisplay to include found letters
                                mysteryWordText.textContent = "";
                                for (i = 0; i < mysterySet.length; i++) {
                                        let character = mysterySet[i];
                                        if (mysterySet[i] === " ") {
                                                mysteryWordText.append('\xa0');
                                        } else {
                                                mysteryWordText.append(character.toUpperCase() + " ");
                                        }
                                }

                                //Print Correct Guesses
                                guessedLetters.textContent = "";
                                for (i = 0; i < guessedSet.length; i++) {
                                        let text = guessedSet[i].toUpperCase();
                                        guessedLetters.append(text + " ");
                                }

                        }

                        if (guessNum >= 0) {
                                guessTxt.textContent = guessNum;

                        }

                        console.log(guessNum)

                        //check for win state
                        if (!mysterySet.includes("_")) {
                                winCount++;
                                totalWins.textContent = winCount;
                                message.textContent = "YOU WIN!";
                                resetBtn.style.display = "block";

                                //game.reset();
                        } else if (guessNum < 0) {
                                mysteryWordText.textContent = mysteryWord.toUpperCase();
                                message.textContent = "GAME OVER!";
                                resetBtn.style.display = "block";

                                //game.reset();
                        }

                }
        }

}

