let winCount = 0;
let wordBank = ["spider", "shark", "bear", "eagle", "rooster", "rabbit", "dog", "crab", "elephant", "tiger", "sea turtle", "kangaroo", "giant panda", "weasel", "whale", "dolphin", "giraffe", "rhino", "gorilla", "zebra"]
let gameState = true;

const guessedLetters = document.getElementById('guessedLetters');
const mysteryWordText = document.getElementById('mysteryWordText');
const totalWins = document.getElementById('totalWins');
const guessTxt = document.getElementById('guessTxt');
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const gameText = document.getElementById("gameText");

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

                gameState = true;

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

        },

        win: function () {
                if (!mysterySet.includes("_")) {
                        winCount++;
                        totalWins.textContent = winCount;
                        message.textContent = "YOU WIN!";
                        resetBtn.style.display = "block";
                        gameState = false;

                        //game.reset();
                }

        },

        over: function () {
              if (gameState ==true) {

                mysteryWordText.textContent = mysteryWord.toUpperCase();
                message.textContent = "GAME OVER!";
                resetBtn.style.display = "block";
                gameState = false;
              }
                //game.reset();
        }


}

document.onkeyup = function (event) {

        game.reset();
        gameText.style.display = "block";


        //user interaction function
        document.onkeyup = function (event) {

                let userInput = event.key.toLowerCase();


                //Check for alphabet input
                if (userInput.match(/^[a-z]$/) && !guessedSet.includes(userInput) && gameState === true) {
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
                                //Print Wrong Guess
                                guessedLetters.textContent = "";
                                for (i = 0; i < guessedSet.length; i++) {
                                        let text = guessedSet[i].toUpperCase();
                                        guessedLetters.append(text + " ");

                                }

                                if (guessNum <= 0) {
                                        game.over();                        
                                }

                        } else {
                                //Correct Guess
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

                                game.win ();

                                if (guessNum <= 0) {
                                        game.over();                        
                                }

                        }

                        if (guessNum >= 0) {
                                guessTxt.textContent = guessNum;

                        }

                        console.log(guessNum)

                        //check for win state




                }
        }

}

