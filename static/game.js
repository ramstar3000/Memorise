// Initialize game state
let gameState = {
    shuffledCards: []
};

let lockBoard = false;  // Prevent further clicks while processing cards
let firstCard = null;   // Reference to the first flipped card
let secondCard = null;  // Reference to the second flipped card

let start = false
let start_time = 0
let timeElapsed = 0;  // Time elapsed in seconds
let timerInterval;

let num_flips = 0

const cards = document.querySelectorAll('.card'); // Select all cards
const card_array = Array.from(cards);

function flipCard() {

    if (! start){
        startTimer();
        start = true
    }

    num_flips += 1
    document.getElementById('flips').textContent = num_flips

    if (lockBoard) return;  // Prevent flipping more cards during processing
    if (this === firstCard) return;  // Prevent flipping the same card twice

    this.classList.add('flipped');  // Add flipped class to show card

    // If no card is selected yet, set this as the first card
    if (!firstCard) {
        firstCard = this;
        return;
    }

    // Set this as the second card and check for a match
    secondCard = this;
    checkForMatch();

    // Check if finished
    isGameOver();

}

function checkForMatch() {
    // Extract card values from dataset
    const card1 = parseInt(firstCard.dataset.card, 10);
    const card2 = parseInt(secondCard.dataset.card, 10);

    // A pair is considered a match if their difference is 1 and the smaller number is odd
    const isMatch = Math.abs(card1 - card2) === 0;

    // Handle match or mismatch
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    // Mark cards as matched
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    // Reset the board for the next turn
    resetBoard();
}

function unflipCards() {
    lockBoard = true;  // Lock the board during the unflip animation

    // Unflip cards after a short delay
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        // Reset the board for the next turn
        resetBoard();
    }, 150); // Adjust delay as needed
}

function resetBoard() {
    // Reset variables to default state
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function generatePairs() {
    const totalCards = cards.length; // e.g., 16 cards
    const totalPairs = totalCards / 2; // 8 pairs for 16 cards

    // Create pairs like (1, 1), (2, 2), ..., (8, 8)
    const pairs = [];
    for (let i = 1; i <= totalPairs; i++) {
        pairs.push(i);
        pairs.push(i);
    }

    // Shuffle the array to randomize card placement
    gameState.shuffledCards = pairs.sort(() => Math.random() - 0.5);

    console.log('Shuffled cards:', gameState.shuffledCards);

}

function assignCardValues() {



    cards.forEach((card, index) => {
        const value = gameState.shuffledCards[index];
        card.dataset.card = value;  // Assign value to card dataset
        card.querySelector('.card-inner').textContent = value; // Display the number
    });
}

function initGame() {
    // Generate card pairs and assign values
    start = false
    num_flips = 0

    generatePairs();
    assignCardValues();

    // Add click event listener to each card
    cards.forEach(card => card.addEventListener('click', flipCard));
}

function isGameOver() {

    if (card_array.every(card => card.classList.contains('matched'))) {
        stopTimer();
        return true;
    }
    return false;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeElapsed++;
        document.getElementById('timer').textContent = timeElapsed; // Update timer display
    }, 1000); // Increment every second
}

function stopTimer() {
    clearInterval(timerInterval); // Stop the interval
    console.log('Game over! Time elapsed:', timeElapsed);
}

function resetTimer() {
    timeElapsed = 0;
    document.getElementById('timer').textContent = timeElapsed; // Reset timer display
    start = false
}





// Start the game
initGame();
