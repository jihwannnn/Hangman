const word_list = [
    ["c","a","t"],
    ["k","i","w","i"],
    ["o","r","a","n","g","e"],
    ["c","u","c","u","m","b","e","r"],
    ["h","e","t","e","r","o","s","c","e","d","a","s","t","i","c","i","t","y"]
]

var attempts = 6;

var random = Math.floor((Math.random()*(word_list.length)));
var answer = word_list[random];

var guess_array = new Array(answer.length);
var pushed_array = new Array(26);
var pointer = 0;

for (var i = 0; i < answer.length; i++){
    guess_array[i] = "_";
}



document.addEventListener('DOMContentLoaded', function(){

    var wordElement = document.querySelector("#word");
    var lettersElement = document.querySelector("#letters");
    var hangmanCanvas = document.querySelector("#hangman_canvas");
    var ctx = hangmanCanvas.getContext('2d');

    function printWord(){
        wordElement.innerHTML = "";

        for (var i = 0; i < answer.length; i++){
            var guessing = document.createTextNode(guess_array[i]);
            wordElement.appendChild(guessing);
        }
    }

    function printLetters() {
        for (var i = 97; i <= 122; i++) {
            var letter = String.fromCharCode(i);
            var button = document.createElement('button');
            button.textContent = letter;

            button.addEventListener('click', function(e) {
                var guess = e.target.textContent;

                if (pushed_array.includes(guess)) alert("you already pushed the button!")

                else {
                    pushed_array[pointer] = guess;
                    pointer++;

                    if (!guess_array.includes(guess)) checkGuess(guess);
                }

                
            });

            lettersElement.appendChild(button);
        }
    }

    function checkGuess(guess) {

        var found = false;

        for (var i = 0; i < answer.length; i++) {
            if (answer[i] === guess) {
                guess_array[i] = guess;
                found = true;
            }
        }

        printWord();

        if (!found) {
            attempts--;
            draw(ctx, attempts);

            if (attempts === 0) alert("Game Over! The word was: " + answer.join(""));
        }

        if (guess_array.join("") === answer.join("")) alert("Congratulations! You guessed the word: " + answer.join(""));
    }

    function draw(ctx, attempts) {

        ctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
        ctx.beginPath();


        ctx.moveTo(20, 180);
        ctx.lineTo(20, 20);
        ctx.lineTo(100, 20);
        ctx.lineTo(100, 50);

    
        if (attempts < 6) {
            ctx.moveTo(100, 50);
            ctx.lineTo(80, 70);
        }

        if (attempts < 5) {
            ctx.moveTo(100, 50);
            ctx.lineTo(120, 70);
        }

        if (attempts < 4) {
            ctx.moveTo(100, 20);
            ctx.lineTo(100, 70);
        }

        if (attempts < 3) {
            ctx.arc(100, 90, 20, 0, Math.PI * 2);
        }

        if (attempts < 2) {
            ctx.moveTo(100, 110);
            ctx.lineTo(100, 150);
        }

        if (attempts < 1) {
            ctx.moveTo(100, 120);
            ctx.lineTo(80, 140);
            ctx.moveTo(100, 120);
            ctx.lineTo(120, 140);
        }

        ctx.stroke();
    }

    printWord();
    printLetters();
    draw(ctx, attempts);
});

