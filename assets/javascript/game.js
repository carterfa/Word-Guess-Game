//establishes global variables
let guessedSet = [];
let mysterySet = [];
let winCount = 0;
let gameState = true;
let guessNum = 10;

//object containing game functions
const game = {

        //generates new word and prepares the game for play
        play: function () {
                let wordBank = ["spider", "shark", "bear", "eagle", "rooster", "rabbit", "dog", "crab", "elephant", "tiger", "sea turtle", "kangaroo", "giant panda", "weasel", "whale", "dolphin", "giraffe", "rhino", "gorilla", "zebra"]
                //let wordBank = ["pacific spiny lumpsucker", "whale shark"]
                //reset sets
                guessedSet = [];
                mysterySet = [];

                //reset guesses
                guessNum = 10;

                gameState = true;

                //reset display
                $(".stats").show();
                $("#guessBtn").show();
                $("#keyboard").show();
                $('#guessTxt').text("Guesses Left: "+guessNum);
                $('#message').text("");
                $('#message').text("Guess the Animal!");
                $(".letterBtn").css("opacity", 1);
                // $('#guessedLetters').text("");

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
                                //$('#mysteryWordText').append('\xa0');
                                $('#mysteryWordText').append("</br>");
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

        //check to see if valid user input
        valid: function (userInput) {

                //only registers if game is active, prevents user from guessing the same letter more than once
                if (!guessedSet.includes(userInput) && gameState === true) {
                        //decreases number of guesses
                        guessNum--;
                        $('#guessTxt').text("Guesses Left: "+guessNum);

                        game.check(userInput);
                        //if no more blanks in word run win state
                        if (!mysterySet.includes("_")) {
                                game.win();
                        }
                        //if user is out of guesses and still has not guessed the correct word run game over
                        if (guessNum <= 0 && gameState === true) {
                                game.over();
                        }
                }

        },

        //adds guessed letter to letter set, hides letter of guessed letter
        print: function (userInput) {

                guessedSet.push(userInput);

                // //Print Guess
                // $('#guessedLetters').text("");
                // for (i = 0; i < guessedSet.length; i++) {
                //         let text = guessedSet[i].toUpperCase();
                //         $("#guessedLetters").append(text + " ");

                // }

                $("#"+userInput).css("opacity", 0.2);
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
                animalInput = prompt("Guess the animal!");
                if (animalInput) {
                        if ((animalInput.toLowerCase().trim()) === mysteryWord) {
                                $('#mysteryWordText').text(mysteryWord.toUpperCase());
                                game.win();
                        } else {
                                game.over();
                        }
                }
        }
}

//waits for page to load before performing functions
$(document).ready(function () {

        //hides buttons on initial startup
        $("#keyboard").hide();
        $("#guessBtn").hide();
        $(".stats").hide();

        //user interaction function
        document.onkeyup = function (event) {
                //logs keyboard input
                let userInput = event.key.toLowerCase();
                //only allows alphabet characters
                if (userInput.match(/^[a-z]$/)) {
                        game.valid(userInput);
                }
        }

        //letter buttons function
        $(".letterBtn").on("click", function () {
                //logs button clicked as user input
                let userInput = $(this).attr("id");
                game.valid(userInput);
        })

        //starts game on click
        $("#playBtn").on("click", function () {
                game.play();
        })

        //prompts user to guess the word
        $("#guessBtn").on("click", function () {
                game.guess();
        })
});

