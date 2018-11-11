const deck = ["&#9917;", "&#9731;", "&#9742;", "&#9752;", "&#9760;", "&#9762;", "&#9785;", "&#9822;"];
const twoDecks = [...deck, ...deck];
let moveCounter;
let matchCounter;
let firstCardDiv;
let showingNonMatchingCards;
let timerId;
let numberOfSeconds;

function initializeCards() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";

    shuffleArray(twoDecks);

    for (let card of twoDecks)
    {
        const cardDiv = document.createElement("div");
        cardDiv.innerText = "?";
        cardDiv["data-card"] = card;
        cardDiv.className = "card";
        cardDiv.addEventListener("click", onCardClicked);

        gameBoard.appendChild(cardDiv);
    }
}

function onCardClicked() {
    if (showingNonMatchingCards)
    {
        // We don't want to respond to clicks while showing non-matching cards.
        return;
    }

    moveCounter++;

    if (moveCounter === 1)
    {
        timerId = setInterval(() => {
            numberOfSeconds++;
            refreshTimer();
        }, 1000);
    }

    refreshMoveCounter();
    refreshStarRating();

    this.innerHTML = this["data-card"];

    if (firstCardDiv === null) {
        firstCardDiv = this;
        this.removeEventListener("click", onCardClicked);
    }
    else {
        if (firstCardDiv["data-card"] === this["data-card"]) {
            this.removeEventListener("click", onCardClicked);
            firstCardDiv = null;
            matchCounter++;

            if (matchCounter === deck.length)
            {
                clearInterval(timerId)
            }
        }
        else
        {
            showingNonMatchingCards = true;

            setTimeout(() => {
                firstCardDiv.innerText = "?";
                firstCardDiv.addEventListener("click", onCardClicked);

                this.innerText = "?";

                firstCardDiv = null;
                showingNonMatchingCards = false;
            }, 750);
        }
    }
}

function refreshTimer()
{
    let date = new Date(numberOfSeconds * 1000)
    document.getElementById("timer").innerText = date.toISOString().substr(11, 8);
}

function refreshMoveCounter() {
    document.getElementById("move-counter").innerText = moveCounter;
}

function refreshStarRating() {
    const starRatingHTML = getStarRatingHTML();
    document.getElementById("star-rating").innerHTML = starRatingHTML; 
}

function getStarRatingHTML() {
    if (moveCounter <= 24)
    {
        return "&#9733;&#9733;&#9733;";
    }

    if (moveCounter <= 32)
    {
        return "&#9733;&#9733;&#9734;";
    }

    return "&#9733;&#9734;&#9734;";
}

function resetGameBoard() {
    moveCounter = 0;
    matchCounter = 0;

    if (timerId !== null)
    {
        clearInterval(timerId);
    }

    numberOfSeconds = 0;
    firstCardDiv = null;
    showingNonMatchingCards = false;

    refreshMoveCounter();
    refreshTimer();
    refreshStarRating();
    initializeCards();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}