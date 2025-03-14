document.addEventListener("DOMContentLoaded", () => {
    const startGameBtn = document.getElementById("start-game");
    const hitBtn = document.getElementById("hit");
    const standBtn = document.getElementById("stand");
    const newGameBtn = document.getElementById("new-game");
    const playerCards = document.getElementById("player-cards");
    const dealerCards = document.getElementById("dealer-cards");
    const playerScoreDisplay = document.getElementById("player-score");
    const dealerScoreDisplay = document.getElementById("dealer-score");
    const message = document.getElementById("message");

    let deck, playerHand, dealerHand;

    function createDeck() {
        let suits = ["♠", "♥", "♦", "♣"];
        let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        let newDeck = [];
        for (let suit of suits) {
            for (let value of values) {
                newDeck.push({ suit, value });
            }
        }
        return newDeck.sort(() => Math.random() - 0.5);
    }

    function calculateScore(hand) {
        let score = 0;
        let aces = 0;
        hand.forEach(card => {
            if (card.value === "A") {
                aces++;
                score += 11;
            } else if (["J", "Q", "K"].includes(card.value)) {
                score += 10;
            } else {
                score += parseInt(card.value);
            }
        });
        while (score > 21 && aces > 0) {
            score -= 10;
            aces--;
        }
        return score;
    }

    function renderCards() {
        playerCards.innerHTML = playerHand.map(card => `<div class="card">${card.value}${card.suit}</div>`).join("");
        dealerCards.innerHTML = dealerHand.map(card => `<div class="card">${card.value}${card.suit}</div>`).join("");
        playerScoreDisplay.textContent = calculateScore(playerHand);
        dealerScoreDisplay.textContent = calculateScore(dealerHand);
    }

    function startGame() {
        startGameBtn.style.display = "none";
        hitBtn.style.display = "inline-block";
        standBtn.style.display = "inline-block";
        newGameBtn.style.display = "none";
        message.textContent = "";

        deck = createDeck();
        playerHand = [deck.pop(), deck.pop()];
        dealerHand = [deck.pop(), deck.pop()];
        renderCards();
    }

    function hit() {
        playerHand.push(deck.pop());
        renderCards();
        if (calculateScore(playerHand) > 21) {
            endGame("You busted! Dealer wins.");
        }
    }

    function stand() {
        while (calculateScore(dealerHand) < 17) {
            dealerHand.push(deck.pop());
        }
        renderCards();
        let playerScore = calculateScore(playerHand);
        let dealerScore = calculateScore(dealerHand);

        if (dealerScore > 21 || playerScore > dealerScore) {
            endGame("You win!");
        } else if (playerScore === dealerScore) {
            endGame("It's a tie!");
        } else {
            endGame("Dealer wins.");
        }
    }

    function endGame(result) {
        hitBtn.style.display = "none";
        standBtn.style.display = "none";
        newGameBtn.style.display = "inline-block";
        message.textContent = result;
    }

    function newGame() {
        startGame();
    }

    startGameBtn.addEventListener("click", startGame);
    hitBtn.addEventListener("click", hit);
    standBtn.addEventListener("click", stand);
    newGameBtn.addEventListener("click", newGame);
});