/*Game Begin: have 2 slots and have a button to increase slots for players+names. Also let players choose the end point count; Set 100 at the beginning
Rules: 1 Dice; Let the playe throw as many times until dice hits 1. Also let him to stop throwing if he chooses to: If stops throwing, sum the dice rolls. Else Dont.
Rules: 2 Dice; Let player throw as many times; If both dice have same number. Double the amount. If you throw 2 ones. you get 25 points. If you throw 1 one. Their turn ends. No summing;
Note: If you throw 3 doubles in a row. your round ends and you dont get points. */

let numPlayers = 0;
let playerNames = [];
let currentPlayerIndex = 0;
let playerScores = [];
let roundScore = 0;
let consecutiveDoubles = 0; // Track consecutive doubles
let isGameActive = false;
let useTwoDice = false;
let dice = {
    sides: 6,
    roll: function () {
      let randomNumber = Math.floor(Math.random() * this.sides) + 1;
      return randomNumber;
    }
}

function Aloitapeli() {
    numPlayers = document.getElementById("num-players").value;
    document.getElementById("aloitus").style.display = "none";
    document.getElementById("players-setup").style.display = "block";
    for(let i = 0; i < numPlayers; i++) {
        playerNames.push(window.prompt("Lisää pelaajan nimi"));
    }
    document.getElementById("player-names").innerHTML = playerNames.join("<br>");
    playerScores = Array(numPlayers).fill(0); // Initialize scores
}

function startgame() {
    isGameActive = true;
    if (confirm("Haluatko pelata kahdella nopalla")) {
        useTwoDice = true;
    } else {
        useTwoDice = false;
    }
    document.getElementById("players-setup").style.display = "none";
    document.getElementById("game").style.display = "block";
    updateUI();
}

function rollDice() {
    let diceRolls = [];
    let sum = 0;
    if (useTwoDice) {
        let die1 = dice.roll();
        let die2 = dice.roll();
        diceRolls = [die1, die2];
        sum = die1 + die2;

        // Check for doubles
        if (die1 === die2) {
            consecutiveDoubles++;
            if (die1 === 1) {
                if (consecutiveDoubles === 3) {
                    // End the round if 3 doubles in a row
                    endTurn();
                } else {
                    // Double the points if the dice match but not double 1's
                    roundScore *= 2;
                }
            } else {
                roundScore += sum;
            }
        } else {
            consecutiveDoubles = 0; // Reset doubles counter if no doubles
            roundScore += sum;
        }

        // Check if the player rolls two 1's
        if (die1 === 1 && die2 === 1) {
            roundScore = 25; // Special rule: two 1's give 25 points
            endTurn(); // End the player's turn immediately
        }

        // If one die is 1, the turn ends
        if (die1 === 1 || die2 === 1) {
            endTurn();
        }
    } else {
        let roll = dice.roll();
        diceRolls = [roll];
        sum = roll;

        // Check if the die shows 1
        if (roll === 1) {
            endTurn();
        } else {
            roundScore += sum;
        }
    }
    checkGameEnd();
}

function stopTurn() {
    playerScores[currentPlayerIndex] += roundScore;
    endTurn();
}

function endTurn() {
    roundScore = 0;
    consecutiveDoubles = 0; // Reset the consecutive doubles counter
    currentPlayerIndex = (currentPlayerIndex + 1) % numPlayers; // Move to the next player
}

function checkGameEnd() {
    // You can define a maximum score here, like 100 points to end the game
    const targetScore = 100;
    if (playerScores[currentPlayerIndex] >= targetScore) {
        alert(`${playerNames[currentPlayerIndex]} wins with ${playerScores[currentPlayerIndex]} points!`);
        resetGame();
    }
}

function resetGame() {
    playerScores = Array(numPlayers).fill(0);
    currentPlayerIndex = 0;
    roundScore = 0;
    consecutiveDoubles = 0;
    updateUI();
    isGameActive = false;
    document.getElementById("game").style.display = "none";
    document.getElementById("aloitus").style.display = "block";
}

function updateUI() {
    document.getElementById("current-player").innerText = `Player: ${playerNames[currentPlayerIndex]}`;
    document.getElementById("score").innerText = `Score: ${playerScores[currentPlayerIndex]}`;
    
    // Update the scoreboard
    const scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = '';
    playerNames.forEach((name, index) => {
        const li = document.createElement("li");
        li.textContent = `${name}: ${playerScores[index]} points`;
        scoreboard.appendChild(li);
    });
}
