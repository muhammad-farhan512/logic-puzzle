const gameBoard = document.getElementById("gameBoard");
const shuffleButton = document.getElementById("shuffleButton");
const moveCounter = document.getElementById("moveCounter");
const timerElement = document.getElementById("timer");

let tiles = [];
let emptyIndex = 15; // Last tile is initially the empty one
let moveCount = 0;
let timer,
  seconds = 0;

// Function to generate the grid
function generateGrid() {
  tiles = [...Array(15).keys()].map((x) => x + 1); // Numbers 1-15
  tiles.push(""); // Empty tile
  tiles.forEach((tile, index) => {
    const tileElement = document.createElement("div");
    tileElement.classList.add("tile");
    if (tile === "") {
      tileElement.classList.add("empty");
    } else {
      tileElement.textContent = tile;
    }
    tileElement.addEventListener("click", () => moveTile(index));
    gameBoard.appendChild(tileElement);
  });
}

// Function to shuffle the tiles
function shuffleTiles() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  updateGrid();
}

// Function to update the grid
function updateGrid() {
  gameBoard.innerHTML = "";
  tiles.forEach((tile, index) => {
    const tileElement = document.createElement("div");
    tileElement.classList.add("tile");
    if (tile === "") {
      tileElement.classList.add("empty");
      emptyIndex = index;
    } else {
      tileElement.textContent = tile;
    }
    tileElement.addEventListener("click", () => moveTile(index));
    gameBoard.appendChild(tileElement);
  });
}

// Function to move a tile
function moveTile(index) {
  if (isAdjacent(index, emptyIndex)) {
    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
    emptyIndex = index;
    updateGrid();
    moveCount++;
    moveCounter.textContent = moveCount;
    checkWin();
  }
}

// Function to check if two tiles are adjacent
function isAdjacent(index1, index2) {
  const row1 = Math.floor(index1 / 4);
  const col1 = index1 % 4;
  const row2 = Math.floor(index2 / 4);
  const col2 = index2 % 4;
  return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
}

// Function to check if the player has won
function checkWin() {
  if (tiles.slice(0, 15).every((tile, index) => tile === index + 1)) {
    alert("Congratulations! You solved the puzzle!");
    stopTimer();
  }
}

// Timer functions
function startTimer() {
  timer = setInterval(() => {
    seconds++;
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    timerElement.textContent = `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

// Shuffle button event listener
shuffleButton.addEventListener("click", () => {
  shuffleTiles();
  moveCount = 0;
  moveCounter.textContent = moveCount;
  stopTimer();
  seconds = 0;
  timerElement.textContent = "00:00";
  startTimer();
});

// Initial setup
generateGrid();
shuffleTiles();
startTimer();
