'use strict';

/*
 user

 roll dice
1.generate random
2.disply roll
3.is 1 ? switch player: add score to current score
4.diplay new score

hold score
1.add score to total score 
2.if score >= 100 current Player wins

reset game

set all score=0
set p1 as starter

*/

// declear var
const player1 = {
  currentScore: 0,
  totalScore: 0,
  add: function () {
    this.totalScore += this.currentScore;
    this.currentScore = 0;
  },
  reset: function () {
    this.currentScore = 0;
    this.totalScore = 0;
  },
};
const player2 = {
  currentScore: 0,
  totalScore: 0,
  add: function () {
    this.totalScore += this.currentScore;
    this.currentScore = 0;
  },
  reset: function () {
    this.currentScore = 0;
    this.totalScore = 0;
  },
};
let currentIsPlayer1 = true;
let currentPlayer = 0; // 0:p1 1:p2
const winScore = 10; // 胜利分数
let gameState = true; // true :gaming false: game over
let roll = 0; // the value of dice
// documents
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const scoreP1 = document.querySelector('#score--0');
const scoreP2 = document.querySelector('#score--1');
const currentScore1 = document.querySelector('#current--0');
const currentScore2 = document.querySelector('#current--1');
const playerShow1 = document.querySelector('.player--0'); // use
const playerShow2 = document.querySelector('.player--1');

// function
// const showDice = function (roll) {
//   document.querySelector('img').src = `dice-${roll}.png`;
// };

const displyScore = function () {
  scoreP1.textContent = player1.totalScore;
  scoreP2.textContent = player2.totalScore;
  currentScore1.textContent = player1.currentScore;
  currentScore2.textContent = player2.currentScore;
};

// const changePlayer = function () {
//   if (currentPlayer1) {
//     //change to player2
//     currentIsPlayer1 = !currentIsPlayer1;
//     playerShow1.classList.remove('player--active');
//     playerShow2.classList.add('player--active');
//   } else {
//     currentIsPlayer1 = !currentIsPlayer1;
//     playerShow2.classList.remove('player--active');
//     playerShow1.classList.add('player--active');
//   }
// };

const changePlayer = function () {
  currentPlayer = 1 ^ currentPlayer; // 0-->1 1-->0
  playerShow1.classList.toggle('player--active');
  playerShow2.classList.toggle('player--active');
};

// const newGame = function () {
//   player1.reset();
//   player2.reset();
//   currentIsPlayer1 = true;
//   gameState = true;
//   btnNew.classList.remove();
//   displyScore();
// };
const newGame = function () {
  player1.reset();
  player2.reset();
  currentPlayer = 0;
  gameState = true;
  displyScore();
};

const showWinner = function () {
  btnRoll.classList.add('.hidden');
  document.querySelector(`#name--${currentPlayer}`).textContent =
    'PLAYER 1 WIN';
  document
    .querySelector(`#player--${currentPlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`#player--${currentPlayer}`)
    .classList.remove('player--active');
};
displyScore();
// row dice
// 1.add listener
btnRoll.addEventListener('click', function () {
  if (!gameState) {
    return;
  }
  roll = Math.trunc(Math.random() * 6) + 1;
  document.querySelector('img').src = `dice-${roll}.png`;
  if (currentPlayer == 0) {
    player1.currentScore += roll;
  } else {
    player2.currentScore += roll;
  }
  if (roll === 1) {
    // switch
    if (currentIsPlayer1) {
      player1.currentScore = 0;
    } else {
      player2.currentScore = 0;
    }
    // currentIsPlayer1 = !currentIsPlayer1;
    changePlayer();
  }
  displyScore();
  console.log(player2.currentScore);
});

btnHold.addEventListener('click', function () {
  if (!gameState) {
    return;
  }
  if (currentIsPlayer1) {
    player1.add();
  } else {
    player2.add();
  }
  // 胜利条件
  if (player1.totalScore >= winScore || player2.totalScore >= winScore) {
    showWinner();
    gameState = false;
    btnNew.classList.add('show');
  }

  changePlayer();
  displyScore();
});
btnNew.addEventListener('click', function () {
  newGame();
});
