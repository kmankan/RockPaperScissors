// Future refactoring: split playGame() function into multiple functions -- it is very bloated

function createScoreCounter() { // the robot helped me write this code
  let playerWins = 0;
  let computerWins = 0;

  function incrementPlayerWins() {
    playerWins += 1;
  }

  function incrementComputerWins() {
    computerWins += 1;
  }

  function getPlayerScore() {
    return playerWins;
  }

  function getComputerScore() {
    return computerWins;
  }

  function displayWinner() {
    if (playerWins > computerWins) {
      return `The Player Wins!`
    } else if (computerWins > playerWins) {
      return 'The Computer Wins!'
    } else {
      return `The Game has ended in a tie!`
    }
  }

  return {
    incrementPlayerWins,
    incrementComputerWins,
    getPlayerScore,
    getComputerScore,
    displayWinner
  };
}

/* a function called getComputerChoice that will randomly return either ‘Rock’, ‘paper’ or ‘Scissors’. 
We’ll use this function in the game to make the computer’s play. */
function getComputerChoice() {
  const options = ["Rock", "Paper", "Scissors"];
  const computerSelection = Math.floor(Math.random() * options.length);
  return options[computerSelection].toLowerCase();
}

/* a function that plays a single round of Rock paper Scissors. 
The function should take two parameters - the playerSelection and computerSelection - 
and then return a string that declares the winner or tie of the round */

function playRound(playerChoice, computerChoice, scoreCounter) {
  if (playerChoice === "rock" && computerChoice === "scissors") {
    scoreCounter.incrementPlayerWins();
    return `You win! ${playerChoice} beats ${computerChoice}`;
  } 
  else if (playerChoice === "rock" && computerChoice === "paper") {
    scoreCounter.incrementComputerWins();
    return `You lose! ${computerChoice} beats ${playerChoice}`;
  }
  else if (playerChoice === "rock" && computerChoice === "rock") {
    return `It's a tie!`;
  }

  else if (playerChoice === "scissors" && computerChoice === "rock") {
    scoreCounter.incrementPlayerWins();
    return `You win! ${playerChoice} beats ${computerChoice}`;
  } 
  else if (playerChoice === "scissors" && computerChoice === "paper") {
    scoreCounter.incrementComputerWins();
    return `You lose! ${computerChoice} beats ${playerChoice}`;
  }
  else if (playerChoice === "scissors" && computerChoice === "scissors") {
    return `It's a tie!`; 
  }

  else if (playerChoice === "paper" && computerChoice === "rock") {
    scoreCounter.incrementPlayerWins();
    return `You win! ${playerChoice} beats ${computerChoice}`;
  } 
  else if (playerChoice === "paper" && computerChoice === "scissors") {
    scoreCounter.incrementComputerWins();
    return `You lose! ${computerChoice} beats ${playerChoice}`;
  }
  else if (playerChoice === "paper" && computerChoice === "paper") {
    return `It's a tie!`;
  } else {
    return `you missed an outcome! Player ${playerChoice} Computer ${computerChoice}`;
  }
}

function playGame() {
  const scoreCounter = createScoreCounter(); //start the game counter

  // Create scoreboard elements
  const scoreboard = document.querySelector("#scoreboard");
  
  const playerScore = document.createElement("h3"); //create element in DOM to track player
  playerScore.textContent = `Player: ${scoreCounter.getPlayerScore()}`; //add player score from ScoreCounter funciton
  scoreboard.appendChild(playerScore); //append to the scoreboard div

  const computerScore = document.createElement("h3"); //same as above for Computer
  computerScore.textContent = `Computer: ${scoreCounter.getComputerScore()}`;
  scoreboard.appendChild(computerScore)

  // Create game announcements element
  const announcement = document.querySelector("#announcement");
  const gameAnnouncement = document.createElement("p");
  gameAnnouncement.textContent = "Select your move to start the game";
  announcement.appendChild(gameAnnouncement);

  // Function that checks for win condition
  const checkWinner = (player, computer) => {
    switch (true) {
      case player === 5:
        gameAnnouncement.textContent = "Player Wins the Game! Congratulations!";
        disableButtons();
        return
      case computer == 5:
        gameAnnouncement.textContent = "Computer Wins the Game! Try your luck again";
        disableButtons();
        return
      default:
        return
    } 
  }; 

  // Function that disables the game buttons after either player has won
  const disableButtons = () => {
    gameButtons.forEach((button) => {
      button.disabled = true;
    });
  };

  // Function that restarts the game
  const resetGame = () => {
    location.reload();
  };

  // Create a reset button element
  const resetButton = document.querySelector("#reset button");
  resetButton.addEventListener("click", resetGame);

  //create a NodeList with all button ids
  const gameButtons = document.querySelectorAll("#choices button"); 

  //eventListener active for all buttons
  //when button is pressed, take its id and pass it as the playerChoice to the playRound function
  gameButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const roundResult = playRound(button.id, getComputerChoice(), scoreCounter);
      playerScore.textContent = `Player: ${scoreCounter.getPlayerScore()}`; //update playerScore in scoreboard div
      computerScore.textContent = `Computer: ${scoreCounter.getComputerScore()}`; //update computerScore in scoreboard div
      gameAnnouncement.textContent = roundResult //print the result of that match
      checkWinner(scoreCounter.getPlayerScore(), scoreCounter.getComputerScore());
    });
    });
}

playGame();

