
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
    if (winScore < 49){
        winScore = 50;
    }

    players = [];
    for (let i = 0; i < numPlayers; i++) {
        let playerName = prompt(`Anna pelaajan ${i + 1} nimi:`);
        if (!playerName || playerName == '' || playerName == null)
            { players.push({ name: `player ${i+1}` , score: 0, roundScore: 0 });
        } else {
         players.push({ name: playerName, score: 0, roundScore: 0 });
        }
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
    let roll1 =  Math.floor(Math.random() * 6) + 1
    let roll2 = 0;
    if (diceCount == 2) {
        roll2 = Math.floor(Math.random() * 6) + 1;
        document.getElementById("dice-rolls").textContent = `Heitit: ${roll1}, ${roll2}`;
    } else {
        document.getElementById("dice-rolls").textContent = `Heitit: ${roll1}`;
    }

    // Lasketaan pisteet
    if (roll1 === roll2) { // Tuplat
        if (roll1 == 1) { // Kaksi ykköstä
            players[currentPlayer].roundScore += 25;
            alert("Heitit kaksi ykköstä! Saat 25 pistettä.");
            document.getElementById("thrown-points").textContent = `Pistemäärä: ${players[currentPlayer].roundScore}`
        } else {
            players[currentPlayer].roundScore += (roll1 + roll2) * 2; // Tupla-arvo
            document.getElementById("thrown-points").textContent = `Pistemäärä: ${players[currentPlayer].roundScore}`
        }
    } else {
        if (roll1 == 1 || roll2 == 1) {
            // Yksi noppa on 1:stä -> vuoro päättyy
            players[currentPlayer].roundScore = 0;
            document.getElementById("thrown-points").textContent = `Pistemäärä: ${players[currentPlayer].roundScore}`
            alert("Heitit ykkösen! Vuoro päättyy.");
            endTurn();
        }else {
        players[currentPlayer].roundScore += roll1 + roll2;
        document.getElementById("thrown-points").textContent = `Pistemäärä: ${players[currentPlayer].roundScore}`
    }}
    for (let i = 0; i < numPlayers; i++)
        {
            if (players[currentPlayer].score >= winScore) {
                document.getElementById("thrown-points").textContent = `Pistemäärä: ${players[currentPlayer].roundScore}`
                alert(`${players[currentPlayer].name} voitti pelin!`);
                resetGame(); 
        }
    }
}

// Lopeta vuoro
function endTurn() {
    players[currentPlayer].score += players[currentPlayer].roundScore;
    players[currentPlayer].roundScore = 0;
    document.getElementById("thrown-points").textContent = `Pistemäärä: ${players[currentPlayer].roundScore}`
    updateScoreboard();
    currentPlayer = (currentPlayer + 1) % numPlayers;
    updatePlayerTurn();


    // Tarkista voittaja
        if (players[currentPlayer].score >= winScore) {
            document.getElementById("thrown-points").textContent = `Pistemäärä: ${players[currentPlayer].roundScore}`
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