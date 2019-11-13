//establishes global variables
let guessedSet = [];
let mysterySet = [];
let scoreCount = 0;
let gameState = true;
let guessNum = 10;
let modalActive = false;

//object containing game functions
const game = {

        //generates new word and prepares the game for play
        play: function () {
                //let wordBank = ["spider", "shark", "bear", "eagle", "rooster", "rabbit", "dog", "crab", "elephant", "tiger", "sea turtle", "kangaroo", "giant panda", "weasel", "whale", "dolphin", "giraffe", "rhino", "gorilla", "zebra"]
                let wordBank = ["pacific spiny lumpsucker", "whale shark", "green moray eel", "bottlenose dolphin", "southern sea otter", "african penguin", "beluga", "giant pacific octopus", "weedy sea dragon", "narwhal", "zebra shark", "american lobster", "sandbar shark", "japanese spider crab", "humphead wrasse", "giant grouper", "great white shark", "southern stingray", "orca", "splendid garden eel", "blue hippo tang", "striped garden eel", "clown anemonefish", "blue crab", "lionfish", "harbor seal", "california sea lion", "walrus", "blacktip reef shark", "harlequin sweetlips", "bat sea star", "horseshoe crab", "manta ray", "blue whale", "variegated sea urchin", "giant green anemone", "longspine snipefish", "ochre sea star", "porcupine crab", "swell shark", "spotted ratfish", "threespine stickleback", "garibaldi damselfish", "california sheephead", "copper rockfish", "blackbar soldierfish", "bowmouth guitarfish", "cownose ray", "french angelfish", "giant trevally", "golden trevally", "green sea turtle", "loggerhead sea turtle", "leatherback sea turtle", "hawaiian cleaner shrimp", "leopard whipray", "longcomb sawfish", "porcupine ray", "yellow tang", "tasseled wobbegong", "spotted wobbegong", "spotted eagle ray", "tarpon", "yellowtail snapper", "spanish hogfish", "bignose unicornfish", "longnose butterfly fish", "lemonpeel angelfish", "pacific sea nettle", "white spotted jelly", "moon jelly", "eastern fiddler ray", "pajama cardinalfish", "striped burrfish", "squarespot anthias", "yellowback fusilier", "humpback whale", "right whale"]
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
                $('#guessTxt').text("Guesses Left: " + guessNum);
                $('#message').text("");
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
                $("#guessBtn").focus();

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

                $("#resultText").html("&#9989;");
                $("#resultModal").show();

                setTimeout(function(){ 
                        $("#resultModal").hide(); }, 2000);

                let guessTotal = guessedSet.length;

                if (guessTotal <= 3 ){
                        scoreCount += 200;
                }

                if (guessTotal > 3 && guessTotal < 7){
                        scoreCount += 100;
                }

                if (guessTotal >= 7){
                        scoreCount += 50;
                }

                totalScore.textContent = scoreCount;
                $("#message").text("YOU WIN!");
                $("#playBtn").show();
                $("#playBtn").focus();
                $("#playBtn").text("PLAY AGAIN");
                $("#guessBtn").hide();
                gameState = false;
        },

        //checks to see if player lost and if so displays dialog
        over: function () {

                $("#resultText").html("&#10060;");
                $("#resultModal").show();

                setTimeout(function(){ 
                        $("#resultModal").hide(); }, 2000);

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
                        $('#guessTxt').text("Guesses Left: " + guessNum);

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

                $("#" + userInput).css("opacity", 0.2);
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

        guess: function (animalInput) {

                if (animalInput) {
                        if (animalInput === mysteryWord) {
                                $('#mysteryWordText').text(mysteryWord.toUpperCase());
                                modalActive = false;
                                $("#guessModal").hide();
                                $("#animalInput").val("");
                                game.win();
                        } else {
                                modalActive = false;
                                $("#guessModal").hide();
                                $("#animalInput").val("");
                                game.over();
                        }
                }
        }
}

//waits for page to load before performing functions
$(document).ready(function () {

        //hides buttons on initial startup
        $("#resultModal").hide();
        $("#keyboard").hide();
        $("#guessBtn").hide();
        $(".stats").hide();

        //user interaction function
        document.onkeyup = function (event) {
                //logs keyboard input
                let userInput = event.key.toLowerCase();
                //only allows alphabet characters
                if (userInput.match(/^[a-z]$/) && modalActive === false) {
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

        //opens guess the word modal
        $("#guessBtn").on("click", function () {
                modalActive = true;
                $("#guessModal").show();
                $("#animalInput").focus();
        })

        //modal submit button function
        $("#submitBtn").on("click", function () {
                if ($("#animalInput").val()) {
                        animalInput = $("#animalInput").val().trim().toLowerCase();
                        game.guess(animalInput);
                }
        })

        //press enter to submit 
        $("#animalInput").keydown(function (event) {
                if (event.which == 13) {
                        if ($("#animalInput").val()) {
                                animalInput = $("#animalInput").val().trim().toLowerCase();
                                game.guess(animalInput);
                        }
                        event.preventDefault();
                }
        })

        //close modal function
        $("#modalClose").on("click", function () {
                modalActive = false;
                $("#guessModal").hide();
                $("#animalInput").val("");
        })

});

