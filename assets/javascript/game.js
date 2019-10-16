
let winCount = 0;
let wordBank = ["shark", "bear", "eagle", "rooster",]

const correctLetters = document.getElementById('correctLetters');
const mysteryWord = document.getElementById('mysteryWord');
const totalWins = document.getElementById('totalWins');

let correctSet = [""];
let wrongSet = [""];


document.onkeyup = function (event) {

        mysteryWord.textContent = wordBank[0];
        let userInput = event.key.toLowerCase();
        const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        let userGuesses = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]



        //Check for alphabet input
        if (alphabet.includes(userInput) === true) {


                correctSet.push(userInput);

                //Print Correct Guesses
                correctLetters.textContent = "";
                for (i = 0; i < correctSet.length; i++) {
                        let text = correctSet[i];
                        correctLetters.append(text + " ");
                }

                //winCount++;
                //totalWins.textContent = winCount;

        } else {
                alert("Not a letter!")
        }

}






