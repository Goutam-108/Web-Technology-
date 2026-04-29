// Initialize variables
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const guessInput = document.getElementById('guessInput');
const checkBtn = document.getElementById('checkBtn');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const resetBtn = document.getElementById('resetBtn');

checkBtn.addEventListener('click', () => {
    const userGuess = Number(guessInput.value);
    
    // Validation
    if (!userGuess || userGuess < 1 || userGuess > 100) {
        message.textContent = "Please enter a number between 1 and 100!";
        message.style.color = "orange";
        return;
    }

    attempts++;
    attemptsDisplay.textContent = attempts;

    if (userGuess === randomNumber) {
        message.textContent = `🎉 Correct! It was ${randomNumber}.`;
        message.style.color = "green";
        endGame();
    } else if (userGuess > randomNumber) {
        message.textContent = "Too high! Try again.";
        message.style.color = "red";
    } else {
        message.textContent = "Too low! Try again.";
        message.style.color = "red";
    }
    
    guessInput.value = ''; // Clear input
    guessInput.focus();
});

function endGame() {
    checkBtn.disabled = true;
    resetBtn.style.display = "inline-block";
}

resetBtn.addEventListener('click', () => {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptsDisplay.textContent = attempts;
    message.textContent = "";
    checkBtn.disabled = false;
    resetBtn.style.display = "none";
    guessInput.value = "";
});