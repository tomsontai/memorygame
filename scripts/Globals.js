//Initial row and column length in board
const STARTING_ROWS = 5;
const STARTING_COLUMNS = 5;

//Board
const BOARD_BORDER_THICKNESS = 3;
const BOARD_ROTATE_DELAY = 7500; //Must at least twice as long as TILE_REVEAL_DELAY
const BOARD_INPUT_UNLOCK_DELAY = 2000;
const NEXT_LEVEL_DELAY = 3000;
// const BONUS_POINTS = 10; // Functionality not required, but may do it after the assignment is finished.
const INITIAL_ANIMATION_DELAY = 10;

//Tile
const TILE_SIZE = 50;
const ALLOCATION_SCALAR = 0.15; //Percentage of correct tiles to allocate
const TILE_REVEAL_DELAY = 3000;
const TILE_COLOR_CHANGE_DELAY = 300;
const WRONG_TILE_COLOUR = "#9C0100";
const FINAL_TILE_COLOUR = "#006300"
const UNSELECTED_TILE_COLOUR = "#403c0d";
const SELECTED_TILE_COLOUR = "#0F91A1";

const POINTS_PER_TILE = 1;

let displayAttempts = false;
let perfectAttempts = true;
let availableAttempts;
let trial = 1;
let currentScore = 0;

//Increase board size by row or col
// true for row and false for col
let rowOrCol = true; 