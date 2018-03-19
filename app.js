/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScores, activePlayer, gameState,previousDice;
let roll = document.querySelector('.btn-roll');

let scoreForWin = 100;
init();

//document.querySelector('#current-' + activePlayer).textContent = dice;

document.querySelector('.form').addEventListener('submit', function (e) {
    e.preventDefault();
    var input = document.querySelector('.input').value;
    if (input) {  
        scoreForWin = input;
        document.querySelector('.button').textContent = 'Score for win was setted.';
    }
});


roll.addEventListener('click', function () {

    if(!gameState) return

    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';



    // if (dice === 6  && previousDice === 6) {
        
    //     scores[activePlayer] = 0;
    //     document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //     nextPlayer();
    // } else 
    
    if (dice1 !==1  && dice2 !== 1) {

        // previousDice = dice;
        roundScores += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScores;

    } else {
        nextPlayer();
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if(!gameState) return

    scores[activePlayer] += roundScores;

    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // check if won

    if (scores[activePlayer] >= scoreForWin) {
        gameState = false;
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!!';
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none'; 

        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    } else {
        nextPlayer();
    }


})

function nextPlayer() {
    previousDice = 0;
    roundScores = 0;

    document.getElementById('current-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';


    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
    //document.getElementById('dice-1').style.display = 'none';
    //document.getElementById('dice-2').style.display = 'none'; 
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScores = 0;
    activePlayer = 0;
    gameState = true;
    previousDice = 0;


    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none'; 

    document.getElementById('score-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('name-0').textContent = 'Player1';
    document.getElementById('name-1').textContent = 'Player2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');

}