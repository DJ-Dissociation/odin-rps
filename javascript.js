// console.log('hello!');

// Returns a random choice of RPS when run.
function getComputerChoice() {
    let n_rand = Math.random(); // select random number to pick rps

    if (n_rand===0) {           // run it again in the rare case rand picks 0.00
        return getComputerChoice();
    } else if (n_rand>0 && n_rand<0.33){
        return 'Rock';
    } else if (n_rand>=0.33 && n_rand<0.667){
        return 'Paper';
    } else {
        return 'Scissors'
    }
}

//Given input player and computer choices, returns whether the player won as a Boolean
function playRound(playerSelection, computerSelection) { 
    let playerSelectionLower = playerSelection.toLowerCase();       //fix any input errors
    let computerSelectionLower = computerSelection.toLowerCase();
    // console.log("player choice: "+playerSelectionLower);
    // console.log("computer choice: "+computerSelectionLower) ;
    // if (playerSelectionLower===computerSelectionLower) {
    //     return "It's a tie :/";
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
    if (playerSelection === "rock"){
        if (playerWin) {
            return "You Win! Rock beats Scissors";
        } else {
            return "You Lose! Paper beats Rock";
        }
    } else if (playerSelection === "paper") {
        if (playerWin) {
            return "You Win! Paper beats Rock";
        } else {
            return "You Lose! Scissors beats Paper";
        }
    } else if (playerSelection === "scissors") {
        if (playerWin) {
            return "You Win! Scissors beats Paper";
        } else {
            return "You Lose! Rock beats Paper";
        }
    } else {
        return //"Hmm.. getMessage() got weird input..";  // in case something weird happens
    }
}

// runs playRound() 5 times (hard-coded); prints status and score at the end.
function game() {
    // if (n_rounds < 1) {
    //     console.log("Hey now.. enter a good number");
    //     return;
    // }
    let player_score = 0;       // initialize scores
    let computer_score = 0;
    
    for (let i = 0; i < 5; i++) {   // for 5 rounds:
        let playerSelection = window.prompt("Choose your weapon...");    //get use input, and format
        let computerSelection = getComputerChoice();
        let playerWin = playRound(playerSelection, computerSelection);

        console.log("player choice: "+playerSelection.toLowerCase());
        console.log("computer choice: "+computerSelection.toLowerCase()) ;

        if (playerSelection.toLowerCase()===computerSelection.toLowerCase()){   // in case of a tie
            console.log("It's a tie :/");
            player_score += 0.5;
            computer_score += 0.5;
        } else {
            console.log(getMessage(playerSelection.toLowerCase(), playerWin));  //get the right message
            if (playerWin) {                                                    //increment scores appropriately
                player_score++;
            } else {
                computer_score++;
            }
        }
        console.log("win status: "+playerWin);                                  // print stats
        console.log("current player: "+player_score);
        console.log("current computer: "+computer_score);
        console.log("-------");
    }
    console.log("Final score: Player: "+player_score+". Computer: "+computer_score+".");    //print final results
    if (player_score > computer_score){
        console.log("Player Win!");
    } else if (computer_score > player_score){
        console.log("Computer Win..");
    } else {
        console.log("It's a tie :0");
    }
}