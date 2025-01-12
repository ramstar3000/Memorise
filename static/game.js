
function flipCard() {
    console.log('Card flipped');
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    console.log(firstCard, secondCard);

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    // Check if the pair of numbers form a match (e.g., 1 and 2, 3 and 4)
    const card1 = parseInt(firstCard.dataset.card, 10);
    const card2 = parseInt(secondCard.dataset.card, 10);

    // A pair is considered a match if their difference is 1 and the smaller number is odd
    const isMatch = Math.abs(card1 - card2) === 1 && Math.min(card1, card2) % 2 === 1;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 150);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}