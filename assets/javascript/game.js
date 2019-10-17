let winCount = 0;
let wordBank = ["shark", "bear", "eagle", "rooster", "rabbit", "dog", "crab", "elephant", "tiger", "turtle", "kangaroo", "panda", "weasel", "whale", "dolphin", "giraffe"]

const correctLetters = document.getElementById('correctLetters');
const mysteryWordText = document.getElementById('mysteryWordText');
const totalWins = document.getElementById('totalWins');
const guessTxt = document.getElementById('guessTxt');

document.onkeyup = function (event) {

//establishes empty sets
let correctSet = [];
let wrongSet = [];
let mysterySet = [];

//reset guesses
let guessNum = 10;

//reset display
wrongLetters.textContent = "";
correctLetters.textContent ="";
guessTxt.textContent = "10";

//Generates random mystery word from word bank
mysteryWordText.textContent = "";
mysteryWord = wordBank[Math.floor(Math.random() * wordBank.length)];
console.log(mysteryWord);

//Fills array with dashes
for (i = 0; i < mysteryWord.length; i++) {
        mysterySet.push("-");
}

//Displays contents of array
for (i = 0; i < mysterySet.length; i++) {
        let character = mysterySet[i];
        mysteryWordText.append(character);
}



//mysteryWordText.textContent = mysteryWord;


//user interaction function
document.onkeyup = function (event) {

        let userInput = event.key.toLowerCase();
        const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        let userGuesses = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

        //check for win state
        if (mysterySet.includes("-") === true) {
                //Check for alphabet input
                if (alphabet.includes(userInput) === true) {

                        //Searches mystery word for letters incl. repeats, if found letter adjust mystery set array
                        let letterCheck = 0;
                        for (i = 0; i <= mysteryWord.length; i++) {
                                if (userInput == mysteryWord[i]) {
                                        letterCheck++;
                                        mysterySet[i] = userInput;
                                        //console.log(mysterySet);
                                }

                        }

                        //let letterCheck = mysteryWord.search(userInput);
                        //console.log(letterCheck)

                        if (letterCheck <= 0) {
                                wrongSet.push(userInput);
                                guessNum--;
                                //Print Wrong Guesses
                                wrongLetters.textContent = "";
                                for (i = 0; i < wrongSet.length; i++) {
                                        let text = wrongSet[i].toUpperCase();
                                        wrongLetters.append(text + " ");
                                        
                                }

                        } else if (letterCheck > 0) {

                                correctSet.push(userInput);
                                guessNum--;

                                //Redisplay to include found letters
                                mysteryWordText.textContent = "";
                                for (i = 0; i < mysterySet.length; i++) {
                                        let character = mysterySet[i];
                                        mysteryWordText.append(character);
                                        
                                }

                                //Print Correct Guesses
                                correctLetters.textContent = "";
                                for (i = 0; i < correctSet.length; i++) {
                                        let text = correctSet[i].toUpperCase();
                                        correctLetters.append(text + " ");
                                }

                        }
                        guessTxt.textContent = guessNum;

                } else {
                        alert("Not a letter!");
                }



        } else {
                winCount++;
                totalWins.textContent = winCount;
                alert("YOU WIN!");

                //fix this later

                //reset display
                wrongLetters.textContent = "";
                correctLetters.textContent ="";
                guessTxt.textContent = "10";

                guessNum = 10;

                //establishes empty sets
                correctSet = [];
                wrongSet = [];
                mysterySet = [];

                //Generates random mystery word from word bank
                mysteryWordText.textContent = "";
                mysteryWord = wordBank[Math.floor(Math.random() * wordBank.length)];
                console.log(mysteryWord);

                //Fills array with dashes
                for (i = 0; i < mysteryWord.length; i++) {
                        mysterySet.push("-");
                }

                //Displays contents of array
                for (i = 0; i < mysterySet.length; i++) {
                        let character = mysterySet[i];
                        mysteryWordText.append(character);
                }

        }

        if (guessNum < 0){
                alert("GAME OVER");
                

                //fix this later
                //reset display
                wrongLetters.textContent = "";
                correctLetters.textContent ="";
                guessTxt.textContent = "10";

                //establishes empty sets
                correctSet = [];
                wrongSet = [];
                mysterySet = [];

                guessNum= 10;

                //Generates random mystery word from word bank
                mysteryWordText.textContent = "";
                mysteryWord = wordBank[Math.floor(Math.random() * wordBank.length)];
                console.log(mysteryWord);

                //Fills array with dashes
                for (i = 0; i < mysteryWord.length; i++) {
                        mysterySet.push("-");
                }

                //Displays contents of array
                for (i = 0; i < mysterySet.length; i++) {
                        let character = mysterySet[i];
                        mysteryWordText.append(character);
                }
        }
}

}

