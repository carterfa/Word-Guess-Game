let gameBegin = false;
let winCount = 0;

document.onkeyup = function(event) {
    document.getElementById('gameText').style.display = "inline-block";
    document.getElementById('initialText').style.display = "none";
    gameBegin= true;
        
    const correctLetters = document.getElementById('correctLetters');
    const totalWins = document.getElementById('totalWins');
    
    document.onkeyup = function(event) {
    if (gameBegin == true){

            let userInput = event.key.toLowerCase();
            const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
            
            if (alphabet.includes(userInput) === true){
                correctLetters.textContent = userInput;
                winCount++;
                totalWins.textContent = winCount;
            } else {
                alert("Not a letter!")
            }


            
            

    }




    }
 }
