
// word list!
const word_list = [
    ["c","a","t"],
    ["k","i","w","i"],
    ["o","r","a","n","g","e"],
    ["c","u","c","u","m","b","e","r"],
    ["h","e","t","e","r","o","s","c","e","d","a","s","t","i","c","i","t","y"]
]

// available attempts 
var attempts = 6;

// pick random word in word list
var random = Math.floor((Math.random()*(word_list.length)));
var answer = word_list[random];

// guess arrary to filling
var guess_array = new Array(answer.length);

// letters already pushed
var pushed_array = new Array(26);
var pointer = 0;

// fill guess with _
for (var i = 0; i < answer.length; i++){
    guess_array[i] = "_";
}





document.addEventListener('DOMContentLoaded', function(){


    var wordElement = document.querySelector("#word");
    var lettersElement = document.querySelector("#letters");
    var hangmanCanvas = document.querySelector("#hangman_canvas");

    // the point to draw canvas
    var ctx = hangmanCanvas.getContext('2d');

    function printWord(){

        // print guess_array in #word
        wordElement.innerHTML = "";

        for (var i = 0; i < answer.length; i++){
            var guessing = document.createTextNode(guess_array[i]);
            wordElement.appendChild(guessing);
        }
    }

    // letter buttons
    function printLetters() {
        for (var i = 97; i <= 122; i++) {
            var letter = String.fromCharCode(i);
            var button = document.createElement('button');
            button.textContent = letter;

            // button click event
            button.addEventListener('click', buttonClick);
            lettersElement.appendChild(button);
        }
    }

    function buttonClick(e) {
        var guess = e.target.textContent;

        // change to red if it's already pushed
        if (pushed_array.includes(guess)) e.target.style.backgroundColor = "red";

        // call check guess function
        checkGuess(guess);
    }

    
    // keyboard event handler
    document.addEventListener('keydown', function(event) {
        var guess = event.key.toLowerCase();

        if (/^[a-zA-Z]$/.test(guess)) {
            checkGuess(guess);
        }
    });

    
    
    
    function checkGuess(guess) {
    
        // if the letter is already in pushed_array
        if (pushed_array.includes(guess)){
            alert("you already pushed the button!")
            return;
        }

        
        pushed_array[pointer] = guess;
        pointer++;

        var match = false;

        // check if the answer includes the letter
        for (var i = 0; i < answer.length; i++) {
            if (answer[i] === guess) {
                guess_array[i] = guess;
                match = true;
            }
        }

        printWord();

        // not match
        if (!match) attempts--;

        draw(ctx, attempts);

        // game over when attepmts === 0
        if (attempts === 0) {
            setTimeout(gameover, 100);
        }
        // win the game when guess === answer
        if (guess_array.join("") === answer.join("")){
            alert("Congratulations! You guessed the word: " + answer.join(""));
            refresh();
        }
    }

    // drawing hangman
    function draw(ctx, attempts) {


        ctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
        ctx.beginPath();


        ctx.moveTo(20, 150);
        ctx.lineTo(20, 20);
        ctx.lineTo(100, 20);
        ctx.lineTo(100, 50);

    
        if (attempts < 6) {
            ctx.arc(100, 60, 10, 0, Math.PI * 2);
        }

        if (attempts < 5) {
            ctx.moveTo(100, 70);
            ctx.lineTo(100, 110);
        }

        if (attempts < 4) {
            ctx.moveTo(100, 70);
            ctx.lineTo(120, 90);
        }

        if (attempts < 3) {
            ctx.moveTo(100, 70);
            ctx.lineTo(80, 90);
        }

        if (attempts < 2) {
            ctx.moveTo(100, 110);
            ctx.lineTo(120, 150);
        }

        if (attempts < 1) {
            ctx.moveTo(100, 110);
            ctx.lineTo(80, 150);
        }

        ctx.stroke();
    }

    // refresh the page at the end of the game
    function refresh(){
        location.reload();
    }

    function gameover(){
        alert("Game Over! The word was: " + answer.join(""));
        refresh();
    }

    printWord();
    printLetters();
    draw(ctx, attempts);
});

