//Variables (✿◠‿◠)

let deck = $(".deck");
let cardList = [
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-bomb",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-bomb"
];
let card = $(".card");
let timer = $(".timer");
let moves = $(".moves");
let counter = 0;
let restart = $(".restart");
let stars = $(".fa-star");
let win = 0;
let openCards = [];
let starEnd = 3;
//Functions (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Shuffle cards
function shuffleCards(card) {
  let cardElem = shuffle(cardList);
  cardElem.forEach(function(card) {
    var shuffled = `<li class="card ${card}"></li>`;
    deck.append(shuffled);
  });
}
//Cards functions
//Open card
function openCard() {
  if (openCards.length < 2) {
    $(".card").click(function() {
      $(this).addClass("open show disabled animated bounce");
      openCards.push(this);
      matchCards();
      winner();
    });
  }
}
//Close cards
function closeCard() {
  $(".card").removeClass("open show disabled animated bounce");
  $(".deck").removeClass("disabled");
  openCards = [];
}

//Card class

//Match cards
function matchCards() {
  if (openCards.length === 2) {
    $(".deck").addClass("disabled");
    if (openCards[0].classList[2] === openCards[1].classList[2]) {
      openCards[0].classList.add("match");
      openCards[1].classList.add("match");
      $(openCards[0]).addClass("disabled animated shake");
      $(openCards[1]).addClass("disabled animated shake");
      win++;
    }
  } else {
    setTimeout(closeCard, 3000);
  }
}

//Timer
function timing() {
  let time = 0;
  timeCount = setInterval(function() {
    time = time + 1;
    timer.text(time + " seconds");
  }, 1000);
}
//Moves and star rating
$(function CountMoves(card) {
  $(".card").click(function moveCounter(card) {
    counter++;
    moves.html("Moves: " + counter);
    if (counter === 25) {
      //star rating according to moves
      $(stars[stars.length - 1]).toggleClass("fa-star fa-star-o");
      starEnd = 2;
    } else if (counter === 30) {
      $(stars[stars.length - 2]).toggleClass("fa-star fa-star-o");
      starEnd = 1;
    } else if (counter === 35) {
      $(stars[stars.length - 3]).toggleClass("fa-star fa-star-o");
      starEnd = 0;
    }
    if (counter === 1) {
      timing();
    }
  });
});

//Restart Game
restart.click(function() {
  location.reload(); // Reloads page
});

//End Game
function winner() {
  if (win === 6) {
    clearInterval(timeCount);
    swal({
      // Sweet Alert https://sweetalert2.github.io/
      title: "Congratulations!",
      text:
        "You won the game in " +
        timer.text() +
        " with " +
        counter-- +
        " moves and you got " +
        starEnd +
        "/3 stars !",
      type: "success",
      allowOutsideClick: false,
      animation: false,
      customClass: "animated swing"
    });
  }
}

// Calling all the monsters (Starting game)
shuffleCards();
openCard();
