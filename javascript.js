// Returns a random choice of RPS when run.
function getComputerChoice() {
    let n_rand = Math.random(); // select random number to pick rps

    if (n_rand===0) {           // run it again in the rare case rand picks 0.00
        return getComputerChoice();
    } else if (n_rand>0 && n_rand<0.33){
        return 'rock';
    } else if (n_rand>=0.33 && n_rand<0.667){
        return 'paper';
    } else {
        return 'scissors'
    }
}

//Given input player and computer choices, returns whether the player won as a Boolean
function playRound(playerSelection, computerSelection) { 
    let playerSelectionLower = playerSelection.toLowerCase();       //fix any input errors
    let computerSelectionLower = computerSelection.toLowerCase();

    if (playerSelectionLower==='rock'){             // for rock: return false if losing matchup, true if winning matchup
        if (computerSelectionLower==='paper'){
            return false;
        } else {
            return true;
        }
    } else if (playerSelectionLower==='paper'){     // etc.
        if (computerSelectionLower==='scissors'){
            return false;
        } else {
            return true;
        }
    } else if (playerSelectionLower==='scissors'){
        if (computerSelectionLower==='rock'){
            return false;
        } else {
            return true;
        }
    } else {
        return false;       // auto-lose if you put in something random as input
    }
}

// given an RPS choice and whether the player won, return the appropriate message.
function getMessage(playerSelection, playerWin){
    if (playerSelection === 'rock'){
        if (playerWin) {
            return "You win! Rock beats scissors.";
        } else {
            return "You lose! Paper beats rock.";
        }
    } else if (playerSelection === 'paper') {
        if (playerWin) {
            return "You win! Paper beats rock.";
        } else {
            return "You lose! Scissors beats paper.";
        }
    } else if (playerSelection === 'scissors') {
        if (playerWin) {
            return "You win! Scissors beats paper.";
        } else {
            return "You lose! Rock beats scissors.";
        }
    }
    return "Hmm.. getMessage() got weird input: " + playerSelection;  // in case something weird happens
}

// update the variables for player and computer scores, given choices and current array of scores
function updateScores(playerChoiceLower, computerChoice, scores) {
    if (playerChoiceLower===computerChoice){   // in case of a tie
        scores[0] += 0.5;
        scores[1] += 0.5;
    } else {
        if (playRound(playerChoiceLower, computerChoice)) {     //increment scores appropriately
            scores[0]++;
        } else {
            scores[1]++;
        }
    }
    return scores;  //return new values
}

// update the visual scoreboard on the screen
function updateScoreboard(playerChoiceLower, computerChoice) {
    playerScoreboard.textContent = "Player: "+scores[0];        //update scoreboard with latest scores
    computerScoreboard.textContent = "Computer: "+scores[1];

    let newMsg1 = document.createElement('div');                // update round history to show what each player chose
    newMsg1.textContent = "You chose " + playerChoiceLower + "... Computer chose " + computerChoice + "!";
    roundHistory.appendChild(newMsg1);

    if (playerChoiceLower===computerChoice){                    //update round history with round results
        let newMsg = document.createElement('div');
        newMsg.textContent = ("It's a tie :/");
        roundHistory.appendChild(newMsg);
    } else {
        let newMsg = document.createElement('div');
        newMsg.textContent = getMessage(playerChoiceLower, playRound(playerChoiceLower, computerChoice));

        roundHistory.appendChild(newMsg);
    }

    let lineBreak = document.createElement('div');                  // add a new line to round history
    lineBreak.textContent = "-------";
    roundHistory.appendChild(lineBreak);  
}

// function to perform end of game protocols; print winner, disable buttons
function endGame(scores) {
    if (scores[0] >= winCon){    // if player wins  
        let endMsg = document.createElement('div');
        endMsg.textContent = "PLAYER WIN LETS GO";
        roundHistory.appendChild(endMsg);
    } else if (scores[1] >= winCon) {    // if computer wins
        let endMsg = document.createElement('div');
        endMsg.textContent = "Computer win.. the AI is learning :0";
        roundHistory.appendChild(endMsg);
    } 
    buttons.forEach((button) => {   // disable buttons 
        button.disabled = true;
    });
}

// variable definitions
const buttons = document.querySelectorAll('.gameButton');        // select all buttons
const resetButton = document.querySelector('.resetButton');
const scoreboard = document.querySelector('.scoreboard');   // select the scoreboard
let scores = [0, 0];                                        // initialize scores; [0] is player, [1] is computer
const winCon = 5;                                           // set points required to win
const playerScoreboard = document.querySelector('.playerScore');        // select divs for player and computer score updates
const computerScoreboard = document.querySelector('.computerScore');
const roundHistory = document.querySelector('.roundHistory');

// Event listener for each button. Pressing a button will play a round, update the scores
// and scoreboard, and then end the game if anyone has reached 5 points yet.
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        let playerChoiceLower = button.textContent.toLowerCase();   // get player and computer choices
        let computerChoice = getComputerChoice();

        scores = updateScores(playerChoiceLower, computerChoice, scores);   // update score variables
        updateScoreboard(playerChoiceLower, computerChoice);                // update scoreboard

        if (scores[0] >= winCon || scores[1] >= winCon){        // proceed to end of game if winCon is met by either player
            endGame(scores);
        }
    });
});

// reset button behavior, on click
resetButton.addEventListener('click', () => { 
    roundHistory.textContent = "";                              // reset round history printouts
    scores[0] = 0;                                              // reset scores and scoreboard
    scores[1] = 0;
    playerScoreboard.textContent = "Player: "+scores[0];
    computerScoreboard.textContent = "Computer: "+scores[1];

    buttons.forEach((button) => {                       // reactivate buttons if they were locked by endGame()
        button.disabled = false;
    });
});
