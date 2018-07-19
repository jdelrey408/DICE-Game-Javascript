/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



//1. Create variables for game.

//Define the variables +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var scores, roundScore, activePlayer, gamePlaying;
init(); //LINE 172
//The starting score for each player (2x).
//scores = [0,0];

//The round score
//roundScore = 0;

//The active player - current player playing
//0 will be first player - because in an array 0 is first position. See line 20 for example of array.
//1 will be second player
//activePlayer = 0;


//DICE & RANDOM NUMBER CALCULATIONS  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Math.random() which will give you a random number between 0 and 1.
//multiplying Math.random() * 6 and adding 1 will give us numbers between 1 and 6.
//Math.floor() will give us a integer without decminals

//dice = Math.floor(Math.random() * 6) + 1; //Adding 1 will give us a range ebtween 1 and 6.


//DOM manipulations
//We want to go to DOm webpage and select current value (look at html and find ID or Class)
//document used to select the windo object (DOM)
//querySelector is used in conjunction with a CSS ID or Class element. In this case current-
//Text content method is used change method
//notice we got rid of zero for current, this is so we can also select the other player. We just have to change activeplaeyr value.

//CHANGE CONTENT OF AN HTML ELEMENT++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//PRINTS OUT PLAIN TEXT (.textContent)

//document.querySelector('#current-' + activePlayer).textContent = dice; //SETTER - Sets a value

//PRINT OUR DATA with styled HTML (.innerHTML)
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//READ AND STORE A VARIABLE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Storing it into variable x
//var x = document.querySelector('#score-0').textContent; // GETTER because we get a value. READ ONLY
//console.log(x); //This value shows up where the selector was which was score-0 aka 43.


//  change CSS style of an element Use querySelector ++++++++++++++++++++++++++++++++++++++++++++++=
//We are initiatlly going to hide the dice image. We target the class of the image and display none.
//style.
//css property (ex display)
//then value for proeprty (ex: none)
//document.querySelector('.dice').style.display = 'none';


//SET ALL THE VALUES IN BEGGINING OF GAME TO 0 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//getElementByID
//Notice in getElementById we don't use # on the id.
//getElementById has a lowercase alst d

//document.getElementById('score-0').textContent = '0';
//document.getElementById('score-1').textContent = '0';
//document.getElementById('current-0').textContent = '0';
//document.getElementById('current-1').textContent = '0';

//SET UP AN EVENT HANDLER (ex. on click) ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//in this example event handler will happen on buttn to roll dice
//btn-roll is the class to target
//addEventListener - enables the event listener
//Add two arguments
//  1. event type ('click')
//  2. Callback function - The function that will be caleld when the event occure (ex: btn without parenthesis). Not callaed by us but another function.

//function btn (){}; //function for addEventListener argument (#2)
//btn () //call function

//CALLBACK FUNCTION
//document.querySelector('.btn-roll').addEventListener('click', btn); //

//ANONYMOUS FUNCTION - a function that doesn't have a name. Can only be used once. Cannot be called outside of the function it is in.
//In this example we write the function on the inside of the addEventListener argument.
document.querySelector('.btn-roll').addEventListener('click', function() {
  //gameplaying state
  if (gamePlaying) {
    //1. Need a random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Set the variable for the document queryselector dice to be reused
    var diceDOM = document.querySelector('.dice');

    //2b. Display the result (change from none to block)
    diceDOM.style.display = 'block';

    //2c. link the images.
    diceDOM.src = 'dice-' + dice + '.png'; //dice in this case is a number value. So set up yuor images like this.

    //3. update the round score, but only if the roll number was not a 1.
    if (dice !== 1) { //!== different opperator
      //add score - update value
      roundScore += dice; //roundscore = roundscore + dice. remember roundscore was defined as a variable globlly.
      //display in interface
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }


  } );


  //HOLD BUTTON EVENT LISTENER+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
      //Add current score to global score
      //  scores[activePlayer] = scores[activePlayer] + roundscore;
      scores[activePlayer] += roundScore; //keep in mind scores[activePlayer] gives the lcoation of the score in the array and the player through active player.

      //Update the UI by writting to the global score
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]; //remember active player is default 0 so we combine it with this concat method.

      //check if player won the game
      if (scores[activePlayer] >= 100) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none'; //HIDE THE DICE AT END.
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); //Show style for winner
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');//remvoe style for active class (red dot) which is the class before winner is added on top.
        gamePlaying = false;
      } else {
        nextPlayer();
      };

    };
  } );


  //DRY PRINCIPLE BY CREATING A FUNCTION BOTH FUNCTIONS CAN USE. BUTTON CLICK AND HOLD BUTTON.+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  function nextPlayer() {
    //next player (if the other player rolls a one the turn ends so default here)
    //TERNARY OPERATOR
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //If activePlayer = 0, then(?) activeePlayer = 1, else(1) (:) active player is 0.
    roundScore = 0; //reset the value when the player changes

    //clear the current values after round ends
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

   //change css using toggle
   document.querySelector('.player-0-panel').classList.toggle('active'); //active is name of CSS class in html
   document.querySelector('.player-1-panel').classList.toggle('active');

   //old reference
   //remove and add classes - active state. Will be using querySelector cause we are targeting a class.
   //document.querySelector('.player-0-panel').classList.remove('active'); //active is name of CSS class in html
   //document.querySelector('.player-1-panel').classList.add('active');

   //Hide the dice when a 1 is rolled for next player
   document.querySelector('.dice').style.display = 'none';
 };

//START A NEW GAME - GAME INITIALIZATION+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Notice how init() which is a function we created was passed into the argement as init.
document.querySelector('.btn-new').addEventListener('click', init);

//PUT ALL STARTING VARIABLES IN A FUNCTION FOR DRY SINCE WE USE THE VARS IN MULTIPLE PLACES++++++++++++++++++++++++++++
function init() {
  //reset player scores back to 0
  scores = [0,0];
  //reset active player
  activePlayer = 0;
  //reset roundscore
  roundScore = 0;
  //state variable - a condition of a system
  gamePlaying = true;

  //clear dice display
  document.querySelector('.dice').style.display = 'none';
  //set global and current values for all players
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  //reset the names for players
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  //reset winner class /active class
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active'); //first remvoed it then added it
};
