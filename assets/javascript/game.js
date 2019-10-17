let winCount = 0;
let wordBank = ["shark", "bear", "eagle", "rooster", "rabbit", "dog", "crab", "elephant", "tiger", "turtle", "kangaroo", "panda", "weasel", "whale", "dolphin", "giraffe"]

const guessedLetters = document.getElementById('guessedLetters');
const mysteryWordText = document.getElementById('mysteryWordText');
const totalWins = document.getElementById('totalWins');
const guessTxt = document.getElementById('guessTxt');

document.onkeyup = function (event) {

//establishes empty sets
let guessedSet = [];
let mysterySet = [];

//reset guesses
let guessNum = 10;

//reset display
guessedLetters.textContent ="";
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
                                guessedSet.push(userInput);
                                guessNum--;
                                //Print Guesses
                                guessedLetters.textContent = "";
                                for (i = 0; i < guessedSet.length; i++) {
                                        let text = guessedSet[i].toUpperCase();
                                        guessedLetters.append(text + " ");
                                        
                                }

                        } else if (letterCheck > 0) {

                                guessedSet.push(userInput);
                                guessNum--;

                                //Redisplay to include found letters
                                mysteryWordText.textContent = "";
                                for (i = 0; i < mysterySet.length; i++) {
                                        let character = mysterySet[i];
                                        mysteryWordText.append(character);
                                        
                                }

                                //Print Correct Guesses
                                guessedLetters.textContent = "";
                                for (i = 0; i < guessedSet.length; i++) {
                                        let text = guessedSet[i].toUpperCase();
                                        guessedLetters.append(text + " ");
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
                guessedLetters.textContent ="";
                guessTxt.textContent = "10";

                guessNum = 10;

                //establishes empty sets
                guessedSet = [];
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
                guessedLetters.textContent ="";
                guessTxt.textContent = "10";

                //establishes empty sets
                guessedSet = [];
                guessedSet = [];
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

