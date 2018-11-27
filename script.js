const memorycards = [
  { id: 'applejack', image: "./image/apple.png"},
  { id: 'rarity', image: "./image/rarity.jpg" },
  { id: 'rainbowdash', image: "./image/rainbowdash.png" },
  { id: 'pinkie', image: "./image/pinkie2.png" },
  { id: 'twilightsparkle', image: "./image/twilight.jpg"},
  { id: 'celestia', image: "./image/celestia.jpg" },
  { id: 'fluttershy', image: "./image/flutter.jpg" },
  { id: 'spike', image: "./image/spike.png" },
]

const createCard = (id, image) => {
  return `
  <div class="memory-card" data-pony=${id}>
    <div class="item-front"></div>
    <img class="item-back" src="${image}" alt="">
  </div>`
}
const duplicated = [...memorycards, ...memorycards]
duplicated.forEach(function(card) {
const memorygame = document.querySelector('.memory-game');
memorygame.innerHTML +=createCard(card.id, card.image);
});



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


cards.forEach(card => card.addEventListener('click', flipCard));

(function shuffle() {
  cards.forEach(card=> {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  })
})();
