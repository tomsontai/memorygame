class Tile {
    
    static renderTile(correct, board) {
        let tile = document.createElement("div");
        
        //Tile attributes and style
        tile.className = "tile";
        tile.style.width = `${TILE_SIZE}px`;
        tile.style.height = `${TILE_SIZE}px`;

        tile.onclick = () => {
            if (correct) {
                Tile.blueTileAnimation(tile);
                Tile.setScore(POINTS_PER_TILE);
            } else {
                Tile.redTileAnimation(tile);
                Tile.setScore(-POINTS_PER_TILE);
                displayAttempts = true;
                perfectAttempts = false;
            }

            tile.onclick = null;
            availableAttempts = availableAttempts - 1;

            if (displayAttempts) {
                board.displayRemainingAttempts();
            }

            if (availableAttempts == 0) {
                board.lockBoardInput();
                board.rerenderBoard();
            }

            // if score is 0 or negative, terminate game and set Score to 0. 
            if (currentScore <= 0) {
                alert('You lose');
                localStorage.setItem("Score", 0);
                window.location = './summary.html';
            }
        }

        return tile;
    }

    static blueTileAnimation(tile) {
        //Remove hover effect
        tile.style.opacity = 1;
        tile.style.cursor = "default";

        //Rotate tile on y-axis
        tile.style.transform = "rotateY(180deg)";
        tile.style.transition = "transform 0.8s";
        setTimeout(() => {
            tile.style.backgroundColor = availableAttempts == 0 ? FINAL_TILE_COLOUR : SELECTED_TILE_COLOUR;
        }, TILE_COLOR_CHANGE_DELAY);
    }

    static redTileAnimation(tile) {
        //Remove the hover effect
        tile.style.opacity = 1;
        tile.style.cursor = "default";

        //Scale tile up
        tile.style.transform = "scale(1.5, 1.5)";
        tile.style.transition = "transform 0.5s";
        tile.style.backgroundColor = WRONG_TILE_COLOUR;

        setTimeout(() => {
            //Scale tile back down
            tile.style.transform = "scale(1, 1)";
            tile.style.transition = "transform 0.5s";
        }, TILE_COLOR_CHANGE_DELAY);
    }

    static initialRenderAnimation(tile) {
        setTimeout(() => {
            tile.style.transform = "rotate3D(1, 1, 0, 360deg)";
            tile.style.transition = "transform 1.5s";
        }, INITIAL_ANIMATION_DELAY);
        tile.style.transform = null;
        tile.style.transition = null;
    }

    static revealAnimation(tile) {
        setTimeout(() => {
            //Flip to reveal this is a correct tile
            Tile.blueTileAnimation(tile);

            //Enable hover effect
            tile.style.opacity = null;
            tile.style.cursor = null;

            //Flip back to conceal
            setTimeout(() => {
                tile.style.transform = "rotateY(0deg)";
                tile.style.transition = "transform 0.8s";
                setTimeout(() => tile.style.backgroundColor = UNSELECTED_TILE_COLOUR, TILE_COLOR_CHANGE_DELAY);
            }, TILE_REVEAL_DELAY);

        }, TILE_REVEAL_DELAY);
    }

    static setTileTab(tilesRemaining) {
        const tileTab = document.getElementById("tiles");
        tileTab.innerHTML = `TILES ${tilesRemaining}`;
    }

    static setScore(points) {
        const scoreTab = document.getElementById("score");
        scoreTab.innerHTML = null;
        currentScore += points;
        scoreTab.innerHTML = `SCORE ${currentScore}`;
    }
    
}