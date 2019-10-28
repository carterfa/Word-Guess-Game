//establishes global variables
let guessedSet = [];
let mysterySet = [];
let winCount = 0;
let gameState = true;
let guessNum = 10;

const game = {

        //generates new word and prepares the game for play
        play: function () {
                let wordBank = ["spider", "shark", "bear", "eagle", "rooster", "rabbit", "dog", "crab", "elephant", "tiger", "sea turtle", "kangaroo", "giant panda", "weasel", "whale", "dolphin", "giraffe", "rhino", "gorilla", "zebra"]
                //reset sets
                guessedSet = [];
                mysterySet = [];

                //reset guesses
                guessNum = 10;

                gameState = true;

                //reset display
                $("#gameText").show();
                $("#guessBtn").show();
                $('#guessedLetters').text("");
                $('#guessTxt').text("10");
                $('#message').text("Guess the Animal!");

                //Generates random mystery word from word bank
                mysteryWord = wordBank[Math.floor(Math.random() * wordBank.length)];
                console.log(mysteryWord);

                //Fills array with dashes or spaces
                for (i = 0; i < mysteryWord.length; i++) {
                        if (mysteryWord[i] === " ") {
                                mysterySet.push(" ");
                        } else {
                                mysterySet.push("_");
                        }
                }

                //run display function
                game.display();

                //hides button
                $("#playBtn").hide();

        },

        //displays the contents of the mystery array
        display: function () {

                //Displays contents of array
                $('#mysteryWordText').text("");
                for (i = 0; i < mysterySet.length; i++) {
                        let character = mysterySet[i];
                        if (mysterySet[i] === " ") {
                                //displays space in case of animal name with 2 words
                                $('#mysteryWordText').append('\xa0');
                        } else {
                                $('#mysteryWordText').append(character.toUpperCase() + " ");
                        }

                }

        },

        //checks to see if player won and if so displays dialog
        win: function () {
                winCount++;
                totalWins.textContent = winCount;
                $("#message").text("YOU WIN!");
                $("#playBtn").show();
                $("#playBtn").focus();
                $("#playBtn").text("PLAY AGAIN");
                $("#guessBtn").hide();
                gameState = false;
        },

        //checks to see if player lost and if so displays dialog
        over: function () {
                $('#mysteryWordText').text(mysteryWord.toUpperCase());
                $("#message").text("GAME OVER!");
                $("#playBtn").show();
                $("#playBtn").focus();
                $("#playBtn").text("PLAY AGAIN");
                $("#guessBtn").hide();
                gameState = false;

        },

        //displays guessed letters
        print: function (userInput) {

                guessedSet.push(userInput);

                //Print Guess
                $('#guessedLetters').text("");
                for (i = 0; i < guessedSet.length; i++) {
                        let text = guessedSet[i].toUpperCase();
                        $("#guessedLetters").append(text + " ");

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
                        //for when matches were found
                } else {
                        game.display();
                        game.print(userInput);
                }

        },

        guess: function () {
                animalInput = prompt("Guess the animal!").toLowerCase().trim();
                if (animalInput === mysteryWord) {
                        $('#mysteryWordText').text(mysteryWord.toUpperCase());
                        game.win();
                } else {
                        game.over();
                }
        }
}

//waits for page to load before performing functions
$(document).ready(function () {

        //user interaction function
        document.onkeyup = function (event) {
                //logs keyboard input
                let userInput = event.key.toLowerCase();

                //Check for alphabet input
                if (userInput.match(/^[a-z]$/) && !guessedSet.includes(userInput) && gameState === true) {
                        //decreases number of guesses
                        guessNum--;
                        $('#guessTxt').text(guessNum);

                        game.check(userInput);

                        if (!mysterySet.includes("_")) {
                                game.win();
                        }

                        if (guessNum <= 0 && gameState === true) {
                                game.over();
                        }
                }
        }

        $("#playBtn").on("click", function () {
                game.play();
        })

        $("#guessBtn").on("click", function () {
                game.guess();
        })
});

