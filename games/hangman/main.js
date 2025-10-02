let words = ["javascript", "python", "hangman", "programming", "developer", "function", "variable", "object", "array", "string"];
let chosenWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let maxAttempts = 6;
let attemptsLeft = maxAttempts;

function displayWord() {
    let display = "";
    for (let i = 0; i < chosenWord.length; i++) {
        if (guessedLetters.includes(chosenWord[i])) {
            display += chosenWord[i] + " ";
        } else {
            display += "_ ";
        }
    }
    document.getElementById("wordDisplay").innerText = display.trim();
}


function updateAttempts() {
    document.getElementById("attemptsLeft").innerText = "Attempts Left: " + attemptsLeft;
}

function checkWin() {
    for (let i = 0; i < chosenWord.length; i++) {
        if (!guessedLetters.includes(chosenWord[i])) {
            return false;
        }
    }
    return true;
}

function guessLetter() {
    let letter = document.getElementById("letterInput").value.toLowerCase();
    document.getElementById("letterInput").value = ""; // clear input
    if (letter.length !== 1 || !letter.match(/[a-z]/i)) {
        alert("Please enter a single letter.");
        return;
    }
    if (guessedLetters.includes(letter)) {
        alert("You already guessed that letter.");
        return;
    }
    guessedLetters.push(letter);
    if (!chosenWord.includes(letter)) {
        attemptsLeft--;
        updateAttempts();
    }
    displayWord();
    if (checkWin()) {
        setTimeout(() => alert("🎉 Congratulations! You've guessed the word: " + chosenWord), 100);
        resetGame();
    } else if (attemptsLeft <= 0) {
        setTimeout(() => alert("💀 Game Over! The word was: " + chosenWord), 100);
        resetGame();
    }
}

function resetGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    attemptsLeft = maxAttempts;
    updateAttempts();
    displayWord();
}

// initialize game on load
window.onload = () => {
    displayWord();
    updateAttempts();
};