/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, playing, lastDice;
newGame();
/*
dice = Math.floor(Math.random() * 6) + 1;
console.log('dice');

document.getElementById('current-' + activePlayer).textContent = dice;
document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
var globalScore = document.getElementById('score-1').textContent;
console.log(globalScore);
*/


document.querySelector('.btn-roll').addEventListener('click', function() {
  if(playing) {
    // random number
    var dice = Math.floor(Math.random() * 6) + 1;
    // display the result

    var result = document.querySelector('.dice');
    result.style.display = "";
    result.src = 'dice-' + dice + '.png';
    // update the result if dice is not equal to 1
    if(dice === 6 && lastDice ===6) {
      // player looses score
      scores[activePlayer] = 0;
      document.getElementById('score-' + activePlayer).textContent = 0;
      nextPlayer();
    }else if (dice !== 1) {
    roundScore += dice;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
    //next player
    nextPlayer();
    }

    lastDice = dice;
  }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if(playing) {
    // add current score to the player score
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      document.getElementById('name-' + activePlayer).textContent = 'Won the game!!!!'
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      playing = false;

    } else {
    nextPlayer();
    }
  }
});

function nextPlayer() {

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');


  document.querySelector('.dice').style.display = 'none';

};

document.querySelector('.btn-new').addEventListener('click', newGame);

function newGame() {

  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  playing = true;

  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

    document.getElementById('name-0').textContent = 'player 1';
    document.getElementById('name-1').textContent = 'player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}






















