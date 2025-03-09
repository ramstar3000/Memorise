API_KEY2 = "" // Add your API key again here

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
    document.getElementById('flips').innerText = num_flips

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
    
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    // Animate matched cards for a short duration, perhaps a flash or something

    // Reset the board for the next turn
    setTimeout(resetBoard, 250);
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
        card.querySelector('.card-inner').innerText = value; // Display the number
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

        // Do animation for all the cards
        card_array.forEach(card => card.classList.add('finished'));

        return true;
    }
    return false;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeElapsed++;
        document.getElementById('timer').innerText = timeElapsed; // Update timer display
    }, 1000); // Increment every second
}

function stopTimer() {
    clearInterval(timerInterval); // Stop the interval
    console.log('Game over! Time elapsed:', timeElapsed);
}

function resetTimer() {
    timeElapsed = 0;
    document.getElementById('timer').innerText = timeElapsed; // Reset timer display
    start = false
}


async function getImageDescriptions(topic) {
    const apiKey = API_KEY;
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const prompt = `Generate a list of 8 diverse and creative image descriptions based on the topic: "${topic}". Each description should be unique and imaginative. Seperate each with ||`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // Adjust the model if needed
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7
            })
        });

        const data = await response.json();
        // console.log(data);
        const output = data.choices[0].message.content;
        // console.log(output);
        return output;
    } catch (error) {
        console.error("Error fetching image descriptions:", error);
    }
}


async function generateImage(description) {
    const apiKey = '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'; // Replace with your OpenAI API key
    const dalleApiUrl = 'https://api.openai.com/v1/images/generations';

    try {
        const response = await fetch(dalleApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "dall-e-2", // Cheapest model
                prompt: description,
                n: 1, // Generate one image per description
                size: "512x512" // Smallest (cheapest) resolution
            })
        });

        const data = await response.json();

        if (data.data && data.data.length > 0) {
            return data.data[0].url; // Get the image URL
        } else {
            console.error("DALL·E API Error:", data);
        }
    } catch (error) {
        console.error("Error generating image:", error);
    }
}


// // Example usage
// getImageDescriptions("Futuristic Cities").then(descriptions => {
//     document.getElementById("output").innerText = descriptions;
// });



function flip() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.classList.toggle('flipped'); // Toggle the flipped state

        const cardInner = card.querySelector('.card-inner');
        if (card.classList.contains('flipped')) {
            cardInner.style.color = 'black'; // Set text color to black when flipped
        } else {
            cardInner.style.color = ''; // Reset to default (CSS handles it)
        }
    });
}



// Start the game
initGame();
