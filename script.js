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
const duplicated = [...memorycards, ...memorycards];
//moved from foreach
const memorygame = document.querySelector('.memory-game');
duplicated.forEach(function(card) {
  memorygame.innerHTML +=createCard(card.id, card.image);
});

const cards = document.querySelectorAll('.memory-card');

function resetBoard() {
  [hasFlipCard, stopFlip] = [false, false];
  [firstCard, secondCard] = [null, null];

  //create replay button after game finish. If all cards is = cards who been flipped
  if(cards.length === memorygame.querySelectorAll('.flip').length){
    console.log('All is flipped!');
    memorygame.insertAdjacentHTML('beforeend','<div class="reset"><button class="reset-all"><h3>You won!</h3> <br> Press if you want to play again</button></div>');
    document.querySelector('.reset-all').addEventListener('click', resetAll);
  }
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
  }, 1600);
}

//when game won, remove flip, add a click and shuffle
function resetAll () {
  memorygame.removeChild(memorygame.querySelector('.reset'));
  setTimeout(() => {
    cards.forEach(card => {
      card.classList.remove('flip');
      card.addEventListener('click', flipCard);
    });
    shuffle();
  }, 300);
}

cards.forEach(card => card.addEventListener('click', flipCard));

//if reset, shuffle function
function shuffle() {
  cards.forEach(card=> {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  })
};

shuffle();
