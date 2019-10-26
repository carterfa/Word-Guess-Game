//establishes global variables
let guessedSet = [];
let mysterySet = [];
let winCount = 0;
let gameState = true;
let guessNum = 10;

const guessedLetters = document.getElementById('guessedLetters');
const mysteryWordText = document.getElementById('mysteryWordText');
const totalWins = document.getElementById('totalWins');
const guessTxt = document.getElementById('guessTxt');
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const gameText = document.getElementById("gameText");

const game = {

        //generates new word and prepares the game for play
        reset: function () {
                let wordBank = ["spider", "shark", "bear", "eagle", "rooster", "rabbit", "dog", "crab", "elephant", "tiger", "sea turtle", "kangaroo", "giant panda", "weasel", "whale", "dolphin", "giraffe", "rhino", "gorilla", "zebra"]
                //reset sets
                guessedSet = [];
                mysterySet = [];

                //reset guesses
                guessNum = 10;

                gameState = true;

                //reset display
                gameText.style.display = "block";
                guessedLetters.textContent = "";
                guessTxt.textContent = "10";

                //Generates random mystery word from word bank
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

                game.display();

                resetBtn.style.display = "none";
                message.textContent = "";

        },

        //displays the contents of the mystery array
        display: function () {

                //Displays contents of array
                mysteryWordText.textContent = "";
                for (i = 0; i < mysterySet.length; i++) {
                        let character = mysterySet[i];
                        if (mysterySet[i] === " ") {
                                //displays space in case of animal name with 2 words
                                mysteryWordText.append('\xa0');
                        } else {
                                mysteryWordText.append(character.toUpperCase() + " ");
                        }

                }

        },

        //checks to see if player won and if so displays dialog
        win: function () {
                if (!mysterySet.includes("_")) {
                        winCount++;
                        totalWins.textContent = winCount;
                        message.textContent = "YOU WIN!";
                        resetBtn.style.display = "block";
                        gameState = false;
                }

        },

        //checks to see if player lost and if so displays dialog
        over: function () {
                if (guessNum <= 0 && gameState === true) {
                        mysteryWordText.textContent = mysteryWord.toUpperCase();
                        message.textContent = "GAME OVER!";
                        resetBtn.style.display = "block";
                        gameState = false;
                }

        },

        //adds guessed letters
        print: function (userInput) {

                guessedSet.push(userInput);

                //Print Guess
                guessedLetters.textContent = "";
                for (i = 0; i < guessedSet.length; i++) {
                        let text = guessedSet[i].toUpperCase();
                        guessedLetters.append(text + " ");

                }


        },

        //reviews user input to determine if wrong or correct guess
        check: function (userInput) {
                //Searches mystery word for letters incl. repeats, if found letter adjust mystery set array
                let letterCheck = false;
                for (i = 0; i <= mysteryWord.length; i++) {
                        if (userInput == mysteryWord[i]) {
                                letterCheck = true;
                                mysterySet[i] = userInput;
                                //console.log(mysterySet);
                        }
                }

                //for when no match was found
                if (!letterCheck) {

                        game.print(userInput);
                        game.over();

                        //for when matches were found
                } else {
                        // //Redisplay to include found letters
                        // mysteryWordText.textContent = "";
                        // for (i = 0; i < mysterySet.length; i++) {
                        //         let character = mysterySet[i];
                        //         if (mysterySet[i] === " ") {
                        //                 mysteryWordText.append('\xa0');
                        //         } else {
                        //                 mysteryWordText.append(character.toUpperCase() + " ");
                        //         }
                        // }
                        game.display();
                        game.print(userInput);
                        game.win();
                        game.over();
                }

        }
}

document.addEventListener("DOMContentLoaded", function () {

        //user interaction function
        document.onkeyup = function (event) {

                let userInput = event.key.toLowerCase();

                //Check for alphabet input
                if (userInput.match(/^[a-z]$/) && !guessedSet.includes(userInput) && gameState === true) {

                        guessNum--;
                        guessTxt.textContent = guessNum;

                        game.check(userInput);
                }
        }
});

