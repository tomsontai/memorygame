// plays audio 
function playSound() {
    var audio = new Audio("../audio/RestartGame.wav");
    audio.play();
}

/*
Creates a board object. 
*/
class Board {

    constructor(rows = STARTING_ROWS, cols = STARTING_ROWS) {
        //Max number of correct tiles to allocate
        this.rows = rows;
        this.cols = cols;
        this.blueTileAllocation = Math.ceil(ALLOCATION_SCALAR * (this.rows * this.cols)) + 1;
        this.boardGraphic = null;

        //Board must be in a container div with id="container"
        this.container = document.getElementById("container");
    }

    renderBoard() {
        this.lockBoardInput();

        playSound();

        const board = this.initBoardGraphic();
        availableAttempts = 0;

        for (let row = 0; row < this.boardRows; row++) {
            let row = document.createElement("div");
            row.className = "row";

            for (let col = 0; col < this.boardCols; col++) {
                let isBlueTile = Math.floor(Math.random() * 2);
                let tile;

                if (isBlueTile && availableAttempts != this.blueTileAllocation) {
                    // append correct tiles
                    tile = Tile.renderTile(1, this);
                    Tile.revealAnimation(tile);
                    row.appendChild(tile);
                    availableAttempts++;

                } else {
                    // append the incorrect tiles
                    tile = Tile.renderTile(0, this);
                    row.appendChild(tile);
                }
                Tile.initialRenderAnimation(tile);
            }
            board.appendChild(row);
        }
        // after appending the tiles, rotate the board. 
        this.rotateBoard();

        
    }

    //
    //Board must be instantiated first before re-rendered. This method is to set up the next game. 
    rerenderBoard() {
        let playSound = document.getElementById('RestartGame');
        playSound.play();
        this.resizeBoard();
        this.setCurrentTrial();

        setTimeout(() => {
            this.blueTileAllocation = Math.ceil(ALLOCATION_SCALAR * this.boardCols * this.boardRows) + 1;
            Tile.setTileTab(this.blueTileAllocation);
            this.container.removeChild(this.boardGraphic);
            this.renderBoard();

        }, NEXT_LEVEL_DELAY);

        displayAttempts = false;
        document.getElementById("attempt-counter").innerHTML = null;

        
    }

    // renderTerminate() {
    //     var btn = document.createElement('button');
    //     btn.setAttribute('class', 'btn btn-danger');
    //     btn.setAttribute('id', 'terminate');
    //     btn.setAttribute('onclick', 'terminateGame()');
    //     btn.setAttribute('value', 'Terminate');
         
    //     // <button class="btn btn-danger" id="terminate" onclick="terminateGame()">Terminate</button>
    // }

    rotateBoard() {
        setTimeout(() => {
            //89.9 degrees because if 90 degs, edges are not straight. 
            this.container.style.transform = "rotate(89.9deg)"; 
            this.container.style.transition = "transform 2s";
            setTimeout(() => this.unlockBoardInput(), BOARD_INPUT_UNLOCK_DELAY);
        }, BOARD_ROTATE_DELAY);

        this.container.style.transform = null;
        this.container.style.transition = null;
    }

    //Helper for rerenderBoard()
    resizeBoard() {
        if (perfectAttempts && availableAttempts == 0) {
            this.boardRows = rowOrCol ? ++this.boardRows : this.boardRows;
            this.boardCols = !rowOrCol ? ++this.boardCols : this.boardCols;
        } else {
            this.boardRows = !rowOrCol ? --this.boardRows : this.boardRows;
            this.boardCols = rowOrCol ? --this.boardCols : this.boardCols;
            perfectAttempts = true; //Reset for new level
        }
        
        rowOrCol = !rowOrCol;

        if (this.boardRows < STARTING_ROWS || this.boardCols < STARTING_ROWS) {
            this.boardRows = STARTING_ROWS;
            this.boardCols = STARTING_ROWS;
        }
    }

    //Helper for renderBoard()
    initBoardGraphic() {
        let board = document.createElement("div");
        board.style.padding = `${BOARD_BORDER_THICKNESS}px`;
        board.id = "board";
        this.boardGraphic = board;
        this.container.appendChild(board);

        

        return board;
    }

    setCurrentTrial() {
        const trialTab = document.getElementById("trials");
        if (perfectAttempts && availableAttempts == 0) {
            trialTab.innerHTML = `GAME ${++trial}`;
            // currentScore += BONUS_POINTS;
        } else {
            trialTab.innerHTML = `GAME ${--trial}`;
        }
    }

    displayRemainingAttempts() {
        let attemptMessage = document.getElementById("attempt-counter");
        attemptMessage.innerHTML = `You can uncover ${availableAttempts} more tile(s)!`
    }

    lockBoardInput() {
        this.container.style.pointerEvents = "none";
    }

    unlockBoardInput() {
        this.container.style.pointerEvents = null;
    }

    // Setters
    set boardRows(rows) {
        this.rows = rows;
    }

    set boardCols(cols) {
        this.cols = cols;
    }

    // Getters
    get boardRows() {
        return this.rows;
    }

    get boardCols() {
        return this.cols;
    }

}