document.addEventListener("DOMContentLoaded", (event) => {
  "use strict";

  const startButton = document.getElementById("start-btn");
  const playAgainButton = document.getElementById("again-btn");
  const cardContainer = document.querySelector(".memory-game");
  // const memoryCard = document.querySelectorAll('.memory-card');
  const backFaceImages = ["snow"]; //"snow", "snow","snow", "snow", "snow"?
  const frontFaceImages = [
    "ace-of-pentacles",
    "devil",
    "empress",
    "hermit",
    "star",
    "three-of-cups",
  ];
  const cardsPickList = [...frontFaceImages, ...frontFaceImages];
  const cardCount = cardsPickList.length;

  let revealedCount = 0;
  let activeCard = null;
  let waitingEndOfMove = false;

  playAgainButton.style.display = "none";

  startButton.addEventListener("click", startGame); //or this () => {});

  function startGame() {
    console.log("Game started");
    startButton.style.display = "none";
    playAgainButton.style.display = "block";
    playAgainButton.style.disabled = false;
    playAgainButton.onclick = playAgain;
    initializeCards();
  }

  function playAgain() {
    console.log("Play again");
    revealedCount = 0;
    activeCard = null;
    waitingEndOfMove = false;
    initializeCards();
  }

  //hide play again

  function initializeCards() {
    cardContainer.innerHTML = "";
    const shuffledCards = shuffle(cardsPickList);
    for (let i = 0; i < cardCount; i++) {
      const card = buildCard(shuffledCards[i]);
      cardContainer.appendChild(card);
    }
  }

  function buildCard(card) {
    const element = document.createElement("div");
    element.classList.add("memory-card");
    element.setAttribute("data-card", card);

    const frontFace = document.createElement("img");
    frontFace.classList.add("front-face");
    frontFace.src = `../images/${card}.jpg`;

    const backFace = document.createElement("img");
    backFace.classList.add("back-face");
    backFace.src = "../images/snow.jpg";

    element.appendChild(frontFace);
    element.appendChild(backFace);

    element.addEventListener("click", handleCardClick);

    return element;
  }

  function handleCardClick(event) {
    const clickedCard = event.currentTarget;

    if (
      waitingEndOfMove ||
      clickedCard === activeCard ||
      clickedCard.classList.contains("flip")
    ) {
      return;
    }

    clickedCard.classList.add("flip");

    if (!activeCard) {
      activeCard = clickedCard;
      return;
    }

    checkForMatch(clickedCard);
  }

  function checkForMatch(clickedCard) {
    const card1 = activeCard.getAttribute("data-card");
    const card2 = clickedCard.getAttribute("data-card");

    if (card1 === card2) {
      revealedCount += 2;
      activeCard = null;
      if (revealedCount === cardCount) {
        setTimeout(() => alert("You won!"), 500);
      }
    } else {
      waitingEndOfMove = true;
      setTimeout(() => {
        activeCard.classList.remove("flip");
        clickedCard.classList.remove("flip");
        activeCard = null;
        waitingEndOfMove = false;
      }, 1000);
    }
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
});
