let winCount = 0;
let wordBank = ["shark", "bear", "eagle", "rooster"]

const correctLetters = document.getElementById('correctLetters');
const mysteryWordText = document.getElementById('mysteryWordText');
const totalWins = document.getElementById('totalWins');

let correctSet = [""];
let wrongSet = [""];

document.onkeyup = function (event) {

        mysteryWord = wordBank[Math.floor(Math.random() * wordBank.length)];
        mysteryWordText.textContent = mysteryWord;

        document.onkeyup = function (event) {

                let userInput = event.key.toLowerCase();
                const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
                let userGuesses = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]



                //Check for alphabet input
                if (alphabet.includes(userInput) === true) {

                        let letterCheck = mysteryWord.search(userInput);
                        console.log(letterCheck)

                        if (letterCheck < 0){
                                wrongSet.push(userInput);
                                //Print Wrong Guesses
                                wrongLetters.textContent = "";
                                for (i = 0; i < wrongSet.length; i++) {
                                        let text = wrongSet[i];
                                        wrongLetters.append(text + " ");
                                }

                        } else{
                        
                                correctSet.push(userInput);

                                //Print Correct Guesses
                                correctLetters.textContent = "";
                                for (i = 0; i < correctSet.length; i++) {
                                        let text = correctSet[i];
                                        correctLetters.append(text + " ");
                                }
                        }

                        

                        //winCount++;
                        //totalWins.textContent = winCount;

                } else {
                        alert("Not a letter!")
                }




        }
}





