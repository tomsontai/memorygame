//Starts the game
function play() {
    let playSound = document.getElementById('RestartGame');
    playSound.play();
    const board = new Board();
    board.renderBoard();
    Tile.setTileTab(board.blueTileAllocation);
    board.container.removeChild(document.getElementById("play-button"));
}

// terminate the game
function terminateGame() {
    if (confirm('Terminating game, quit?')) {
        localStorage.setItem("Score", currentScore);
        window.location = './summary.html';
    }
}

// Sets name and player score to localStorage
function setName() {
    // let playerData = localStorage.players;
    // let players = [];

    // if (playerData != null) 
    //     players = JSON.parse(playerData);

    let tempScore = localStorage.Score;
    let name = document.getElementById("name").value;
    let nameScore = {name: name, score: tempScore};

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(nameScore)
    };

    fetch('/scores', options);
    window.location.href = "leaderboard.html";

    // players.push(score);

    // localStorage.players = JSON.stringify(players);
}

// sorts localStorage and prints out top 5 player scores
function setLeaderBoardScore() {
    var leaderboard = document.getElementById("leaderboardTableId");
    let dataLength = 0;
    fetch('/scores')
    .then(res => res.json())
    .then((data) => {
        console.log(data);
        (data.length < 5) ? dataLength = data.length : dataLength = 5;

        for(var i = 0; i < dataLength; i++) {
            let newRow = leaderboard.insertRow();
    
            let nameTD = newRow.insertCell(0);
            let nameHeading = document.createElement('h2');
            nameHeading.appendChild(document.createTextNode(data[i].name));
            nameTD.appendChild(nameHeading);
    
            let scoreTD = newRow.insertCell(1);
            let scoreHeading = document.createElement('h2');
            scoreHeading.appendChild(document.createTextNode(data[i].score));
            scoreTD.appendChild(scoreHeading);
    
        }
    });
    
    // var playerData = JSON.parse(data);
    // playerData.sort(function(a, b){return b.score - a.score});




    // for (let i = 0; i < dataLength; i++) {
    //     // if (i == 5) // Only display top 5. 
    //     //     break;
    //     let li = document.createElement('li');
    //     li.textContent = "Name: " + playerData[i].name + " ---- " + "Score: " + playerData[i].score;
    //     leaderboard.appendChild(li);
    // }
}

