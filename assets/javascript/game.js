var game = {
    words: [],
    chosen_word: null,
    correctLetters: [],
    guesses: [],
    alphabet: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
    start: function(){
        this.chosen_word = "batman"
        this.depictWord();
    },
    letterSelect: function(letter){
        if(!this.alphabet.includes(letter.toLowerCase())){
            return;
        }
        var inclusion = this.chosen_word.includes(letter.toUpperCase()) || this.chosen_word.includes(letter.toLowerCase());
        if(inclusion){
            this.correctLetters.push(letter);
        }
        if(!this.guesses.includes(letter)){
            this.guesses.push(letter);
        }
        this.updateGuesses();
        this.depictWord();
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
        document.getElementById("text").textContent = depiction;
    },
    updateGuesses: function(){
        var guessSpan = document.getElementById("guesses");
        guessSpan.textContent = "";
        for(var i = 0;i < this.guesses.length;i++){
            var newSpan = document.createElement("span");
            newSpan.textContent = this.guesses[i];
            if(this.correctLetters.includes(this.guesses[i])){
                newSpan.style.color = "red";
            }
            console.log(this.guesses);
            guessSpan.append(newSpan);
            if((i+1) < this.guesses.length){
                var commaSpan = document.createElement("span");
                commaSpan.textContent = ", ";
                guessSpan.append(commaSpan);
            }
        }
    }
}
game.start();
document.onkeyup = function(event){
    game.letterSelect(event.key);
}