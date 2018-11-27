'use strict';

const cards = document.querySelectorAll('.memory-card');

function resetBoard() {
  [hasFlipCard, stopFlip] = [false, false];
  [firstCard, secondCard] = [null, null];
}
let hasFlipCard = false;
let stopFlip = false;
let firstCard, secondCard;

function flipCard() {
  if (stopFlip) return;
  if (this === firstCard) return;
  this.classList.add('flip');


if (!hasFlipCard) {
  hasFlipCard = true;
  firstCard = this;
  return;
}

secondCard = this;

checkForPair();
}

function checkForPair() {
  let ifPair = firstCard.dataset.pony === secondCard.dataset.pony;
  ifPair ?  disableCards(): unFlipCards();
  }

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
   secondCard.removeEventListener('click', flipCard);

   resetBoard();
}

function unFlipCards () {
  stopFlip = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    // stopFlip = false;
    resetBoard();
  }, 1700);
}

(function shuffle() {
  cards.forEach(card=> {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  })
})();
