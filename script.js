/* EVENT LISCENERS */

document.querySelector('.rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.paper-button')
.addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.scissors-button')
.addEventListener('click', () => {
  playGame('scissors');
});

document.querySelector('.reset-score-button')
.addEventListener('click', () => {
  displayResetConfirmation();
});

document.querySelector('.auto-play-button')
.addEventListener('click', () => {
  autoplay();
});


document.body.addEventListener('keydown', (event) =>{
  if (event.key === 'r'){
    playGame('rock');

  } else if (event.key === 'p') {
    playGame('paper');
    
  } else if (event.key === 's'){
    playGame('scissors');

  } else if(event.key === 'a'){
    autoplay();

  } else if (event.key === 'Backspace'){
    displayResetConfirmation();
  }
})

// Starts the game
function playGame(playerMove) {
  let result = '';
  let computerMove = pickRandomMove();

  if (playerMove === 'rock'){
    if (computerMove === 'rock') {
      result = 'Tie';
    } else if (computerMove === 'paper'){
      result = 'You lose';
    } else if (computerMove === 'scissors'){
      result = 'You win';
    }

  } else if (playerMove === 'paper'){
      if (computerMove === 'rock'){
      result = 'You win';
    } else if (computerMove === 'paper'){
      result = 'Tie';
    } else if (computerMove  === 'scissors'){
      result = 'You lose';
    }

  } else if (playerMove === 'scissors'){
      if(computerMove === 'rock'){
      result = 'You lose';
    } else if (computerMove === 'paper'){
      result = 'You win';
    } else if (computerMove === 'scissors'){
      result = 'Tie';
    }
  }
  else{
    result = 'ERROR'
  }

  if (result === 'You win'){
    score.wins ++;
  } else if (result === 'You lose'){
    score.losses ++;
  } else if (result === 'Tie'){
    score.ties ++;
  }


  // Show result
  document.body.querySelector('.js-result').innerHTML = result;

  // Show Player choice and Computer choice
  document.body.querySelector('.js-moves')
    .innerHTML = `You
<img class="move-icon" src="imgs/${playerMove}-emoji.png" alt="">
<img class="move-icon" src="imgs/${computerMove}-emoji.png" alt="">
Computer`

  // Update the score view
  updateScoreElement();

  // Store score in local storage
  localStorage.setItem('score', JSON.stringify(score))
}

// Update score insite the paragraph 'js-score'
function updateScoreElement(){
  document.body.querySelector('.js-score')
  .innerText = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// Display an message asking if the
// user is right about reset score or no
function displayResetConfirmation(){
  let confirmation = undefined;

  const confirmContainer = document
    .querySelector('.reset-score-confirmation-container');

  confirmContainer.innerHTML = `
    <p>
      Are you sure you want to reset the score?

      <button class="js-yes-confirm-button">Yes</button>
      <button class="js-no-confirm-button">No</button>
    </p>
  `

  /* Add event listeners to both confirmation buttons*/

  document.querySelector('.js-yes-confirm-button')
    .addEventListener('click', () => {
      resetScore();
      updateScoreElement();
      confirmContainer.innerHTML = '';
  });

  document.querySelector('.js-no-confirm-button')
    .addEventListener('click', () => {
      confirmContainer.innerHTML = '';
  });

  return confirmation;

}

// Reset the score object in memory and
// remove the score from local storage
function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
}

// Get a random move
function pickRandomMove() {
  let computerMove = '';
  let randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1/3){
    randomMove = 'rock';

  } else if (randomNumber >= 0 && randomNumber < 2/3){
    randomMove = 'paper';

  } else if (randomNumber >= 0 && randomNumber >= 2/3){
    randomMove = 'scissors';
  }

  return randomMove;
}

let isAutoPlaying = false;
let intervalID = 0;

// Starts auto play game mode
function autoplay(){
  const autoplayButton = document.querySelector('.auto-play-button');

  autoplayButton.classList.toggle('toggled-button');

  const autoPlayButton = document.querySelector('.auto-play-button');

  // Select all move buttons
  const rockButton = document.querySelector(`.rock-button`);
  const paperButton = document.querySelector(`.paper-button`);
  const scissorsButton = document.querySelector(`.scissors-button`);

  if (!isAutoPlaying){
    isAutoPlaying = true;

    autoPlayButton.innerText = 'Stop Playing';

    // Repeate the game each 1 second
    intervalID = setInterval( () => {
    const playerMove = pickRandomMove();

    // Check if autoplaymove is rock
    if (playerMove === 'rock'){
      rockButton.classList.add('selected-move-button');

      if (paperButton.classList.contains('selected-move-button')){
        paperButton.classList.remove('selected-move-button')
      }
      if (scissorsButton.classList.contains('selected-move-button')){
        scissorsButton.classList.remove('selected-move-button')
      }
    // Check if autoplaymove is paper
    } else if (playerMove === 'paper'){
      paperButton.classList.add('selected-move-button');
      
      if (rockButton.classList.contains('selected-move-button')){
        rockButton.classList.remove('selected-move-button')
      }
      if (scissorsButton.classList.contains('selected-move-button')){
        scissorsButton.classList.remove('selected-move-button')
      }    
    // Check if autoplaymove is scissors
    } else if (playerMove === 'scissors'){
      scissorsButton.classList.add('selected-move-button');
      
      if (rockButton.classList.contains('selected-move-button')){
        rockButton.classList.remove('selected-move-button')
      }
      if (paperButton.classList.contains('selected-move-button')){
        paperButton.classList.remove('selected-move-button')
      }
      
    }

    playGame(playerMove);

    },1000);
    
  } else{
    // Stop autoplay
    clearInterval(intervalID);

    isAutoPlaying = false;

    autoPlayButton.innerText = 'Auto Play';

    if (rockButton.classList.contains('selected-move-button')){
      rockButton.classList.remove('selected-move-button');
      console.log('remove rock');
    }
    if (paperButton.classList.contains('selected-move-button')){
      paperButton.classList.remove('selected-move-button')
      console.log('remove paper');
    }
    if (scissorsButton.classList.contains('selected-move-button')){
      scissorsButton.classList.remove('selected-move-button')
      console.log('remove scissors');
    }
  }
}
  
// Get score from local storage or initialize an object with score
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

// Update the score paragraph
updateScoreElement()
