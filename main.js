/*Game Begin: have 2 slots and have a button to increase slots for players+names. Also let players choose the end point count; Set 100 at the beginning
Rules: 1 Dice; Let the playe throw as many times until dice hits 1. Also let him to stop throwing if he chooses to: If stops throwing, sum the dice rolls. Else Dont.
Rules: 2 Dice; Let player throw as many times; If both dice have same number. Double the amount. If you throw 2 ones. you get 25 points. If you throw 1 one. Their turn ends. No summing;
Note: If you throw 3 doubles in a row. your round ends and you dont get points. */
let numPlayers = 2;
let currentPlayer = 0;
let players = [];
let currentRoll = 0;
let diceCount = 1; // 1 = yksi noppa, 2 = kaksi noppaa
let winScore = 100; // Voittopisteet

// Pelaajien määrän ja muiden asetusten määrittäminen
function startGame() {
    numPlayers = document.getElementById("num-players").value;
    diceCount = document.getElementById("dice-count").value;
    winScore = document.getElementById("win-score").value;
    
    players = [];
    for (let i = 0; i < numPlayers; i++) {
        let playerName = prompt(`Anna pelaajan ${i + 1} nimi:`);
        players.push({ name: playerName, score: 0, roundScore: 0 });
    }

    document.getElementById("player-setup").style.display = "none";
    document.getElementById("game").style.display = "block";
    updateScoreboard();
    updatePlayerTurn();
}

// Päivitä pelaajan vuoro
function updatePlayerTurn() {
    document.getElementById("current-player").textContent = `${players[currentPlayer].name}'s vuoro`;
    currentRoll = 0;
    document.getElementById("dice-rolls").textContent = "Heitä noppaa!";
}

// Päivitä taulukko
function updateScoreboard() {
    let scoreboard = "<h2>Pisteet</h2><ul>";
    players.forEach(player => {
        scoreboard += `<li>${player.name}: ${player.score} pistettä</li>`;
    });
    scoreboard += "</ul>";
    document.getElementById("scoreboard").innerHTML = scoreboard;
}

// Heitä noppaa
function rollDice() {
    let roll1 = Math.floor(Math.random() * 6) + 1;
    let roll2 = 0;
    if (diceCount == 2) {
        roll2 = Math.floor(Math.random() * 6) + 1;
        document.getElementById("dice-rolls").textContent = `Heitit: ${roll1}, ${roll2}`;
    } else {
        document.getElementById("dice-rolls").textContent = `Heitit: ${roll1}`;
    }

    if (roll1 === 1 || roll2 === 1) {
        // Yksi noppa on 1:stä -> vuoro päättyy
        players[currentPlayer].roundScore = 0;
        alert("Heitit ykkösen! Vuoro päättyy.");
        endTurn();
    } else {
        // Lasketaan pisteet
        if (roll1 === roll2) { // Tuplat
            players[currentPlayer].roundScore += (roll1 + roll2) * 2;
            if (roll1 === 1 && roll2 === 1) { // Kaksi ykköstä
                players[currentPlayer].roundScore = 25;
                alert("Heitit kaksi ykköstä! Saat 25 pistettä.");
            }
        } else {
            players[currentPlayer].roundScore += roll1 + roll2;
        }
    }
}

// Lopeta vuoro
function endTurn() {
    players[currentPlayer].score += players[currentPlayer].roundScore;
    players[currentPlayer].roundScore = 0;
    updateScoreboard();
    currentPlayer = (currentPlayer + 1) % numPlayers;
    updatePlayerTurn();

    // Tarkista voittaja
    if (players[currentPlayer].score >= winScore) {
        alert(`${players[currentPlayer].name} voitti pelin!`);
        resetGame();
    }
}

// Uusi peli
function resetGame() {
    numPlayers = 2;
    currentPlayer = 0;
    players = [];
    document.getElementById("player-setup").style.display = "block";
    document.getElementById("game").style.display = "none";
}