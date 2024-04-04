// // function that prompts the user for a move selection and checks whether its a valid move.
// function getPlayerChoice() {
//   while (true) {
//     let userInput = prompt("Choose your move! <| Rock | Paper | Scissors |> what'll it be?");
//     userInput = userInput.toLowerCase();
    
//     if (userInput === null) {
//       console.log("User cancelled the prompt.");
//       return null;
//     }

//     if (userInput !== "rock" && userInput !== "paper" && userInput !== "scissors") {
//       console.log("illegal move! please choose from one of the three");
//     } else {
//         console.log(userInput)
//         return userInput
//       }
//   }
// }

function createScoreCounter() { // the robot helped me write this code
  let playerWins = 0;
  let computerWins = 0;

  function incrementPlayerWins() {
    playerWins += 1;
  }

  function incrementComputerWins() {
    computerWins += 1;
  }

  function getScores() {
    return `Player ${playerWins} Computer ${computerWins}`;
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
    getScores,
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
  const gameButtons = document.querySelectorAll("#choices button");
  console.log("Game buttons:", gameButtons);
  
  const scoreCounter = createScoreCounter();

  gameButtons.forEach((button) => {
    console.log("gameButtons function called");
    button.addEventListener("click", () => {
      console.log("Button clicked:", button.id);
      const roundResult = playRound(button.id, getComputerChoice(), scoreCounter);
      console.log(roundResult);
      console.log(scoreCounter.getScores());
      // console.log(scoreCounter.displayWinner())
    });
    });
}

playGame();

