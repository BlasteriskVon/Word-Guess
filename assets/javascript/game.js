var game = {
    started: false,
    words: [],
    chosen_word: null,
    possibleWords: ["batman", "superman", "spiderman", "goku", "antman"],
    correctLetters: [],
    guesses: [],
    remainingGuesses: 0,
    victories: 0,
    alphabet: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
    start: function(){
        var intro = document.getElementById("intro");
        var gameDiv = document.getElementById("game");
        intro.setAttribute("hidden", true);
        gameDiv.removeAttribute("hidden");
        
        this.started = true;
        this.chosen_word = this.possibleWords[Math.floor(Math.random()*this.possibleWords.length)];
        this.remainingGuesses = Math.ceil(Math.random()*5)+this.chosen_word.length;
        this.correctLetters = [];
        this.guesses = [];
        this.updateGuesses();
        this.depictWord();
    },
    letterSelect: function(letter){
        if(!this.alphabet.includes(letter.toLowerCase())){
            return;
        }
        if(!this.started){
            this.start();
            return;
        }
        var inclusion = this.chosen_word.includes(letter.toUpperCase()) || this.chosen_word.includes(letter.toLowerCase());
        if(inclusion){
            this.correctLetters.push(letter);
        }
        if(!this.guesses.includes(letter)){
            this.guesses.push(letter);
        }
        this.remainingGuesses--;
        if(this.remainingGuesses > 0){
            this.updateGuesses();
            this.depictWord();
        } else {
            this.lose();
        }        
    },
    depictWord: function(){
        var depiction = "";
        for(var i = 0;i < this.chosen_word.length;i++){
            if(this.correctLetters.includes(this.chosen_word.charAt(i))){
                depiction += this.chosen_word.charAt(i);
            } else {
                depiction += "_";
            }
            if((i+1) < this.chosen_word.length){
                depiction += " ";
            }
        }
        if(depiction.includes("_")){
            var remaining = document.getElementById("remaining");
            remaining.textContent = this.remainingGuesses;
            document.getElementById("text").textContent = depiction;
        } else {
            this.victory();
        }
    },
    updateGuesses: function(){
        var guessSpan = document.getElementById("guesses");
        guessSpan.textContent = "";
        for(var i = 0;i < this.guesses.length;i++){
            var newSpan = document.createElement("span");
            newSpan.textContent = this.guesses[i];
            if(this.correctLetters.includes(this.guesses[i])){
                newSpan.style.color = "blue";
            }
            console.log(this.guesses);
            guessSpan.append(newSpan);
            if((i+1) < this.guesses.length){
                var commaSpan = document.createElement("span");
                commaSpan.textContent = ", ";
                guessSpan.append(commaSpan);
            }
        }
    },
    victory: function(){
        var introText = document.getElementById("introText");
        introText.textContent = 'You win! The word was "' + this.chosen_word + '"! Press any letter to play again!';
        this.victories++;
        document.getElementById("wins").textContent = "Number of wins: " + this.victories;
        document.getElementById("intro").removeAttribute("hidden");
        document.getElementById("game").setAttribute("hidden", true);
        this.started = false;
    },
    lose: function(){
        var introText = document.getElementById("introText");
        introText.textContent = 'Sorry! The word was "' + this.chosen_word + '"! Press any letter to try again!';
        document.getElementById("wins").textContent = "Number of wins: " + this.victories;
        document.getElementById("intro").removeAttribute("hidden");
        document.getElementById("game").setAttribute("hidden", true);
        this.started = false;
    }
}
document.onkeyup = function(event){
    game.letterSelect(event.key);
}