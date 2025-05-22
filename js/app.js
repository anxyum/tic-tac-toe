const $newGameScreenPickPlayerIcons = document.querySelectorAll(
  ".new-game-screen-pick-player-icon"
);
const $newGameScreenNewGameCpuPlayer = document.querySelector(
  ".new-game-screen-new-game-buttons__button"
);
const $newGameScreenNewGamePlayer = document.querySelector(
  ".new-game-screen-new-game-buttons__button--secondary"
);
const $newGameScreen = document.querySelector(".new-game-screen");
const $gameScreen = document.querySelector(".game-screen");
const $gridCells = document.querySelectorAll(".game-screen-grid__cell");
const $turnIndicator = document.querySelector(
  ".game-screen-header-turn-indicator"
);
const $resetGridButton = document.querySelector(
  ".game-screen-header-restart-btn"
);
const $endGameScreen = document.querySelector(".game-screen-end-game-modal");
const $nextRoundButton = document.querySelector(
  ".game-screen-end-game-modal-buttons__button--secondary"
);
const $quitGameButton = document.querySelector(
  ".game-screen-end-game-modal-buttons__button"
);
const $winnerIcon = document.querySelector(
  ".game-screen-end-game-modal__title"
);
const $winnerText = document.querySelector(
  ".game-screen-end-game-modal__paragraph"
);
const $scoreTrackers = {
  x: document.querySelector("#score-x"),
  o: document.querySelector("#score-o"),
  tie: document.querySelector("#score-tie"),
};
let scoreTracker = {
  x: 0,
  o: 0,
  tie: 0,
};

const turnIndicators = {
  x: '<?xml version="1.0" encoding="UTF-8"?><svg class="game-screen-header-icons__cross" width="16" height="16" fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="m27.681 1.6344c-1.1716-1.1716-3.0711-1.1716-4.2427 0l-7.4383 7.4383-7.4383-7.4383c-1.1716-1.1716-3.0711-1.1716-4.2426 0l-2.6846 2.6846c-1.1716 1.1716-1.1716 3.0711 0 4.2426l7.4383 7.4383-7.4383 7.4383c-1.1716 1.1716-1.1716 3.0711 0 4.2427l2.6846 2.6846c1.1716 1.1716 3.0711 1.1716 4.2426 0l7.4383-7.4383 7.4383 7.4383c1.1716 1.1716 3.0711 1.1716 4.2427 0l2.6846-2.6846c1.1716-1.1716 1.1716-3.0711 0-4.2427l-7.4383-7.4383 7.4383-7.4383c1.1716-1.1716 1.1716-3.0711 0-4.2426l-2.6846-2.6846z" clip-rule="evenodd" fill-rule="evenodd"/></svg>',
  o: '<?xml version="1.0" encoding="UTF-8"?><svg class="game-screen-header-icons__oval" width="16" height="16" fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="m31.97 15.871c0-8.7651-7.1055-15.871-15.871-15.871-8.765 0-15.871 7.1055-15.871 15.871 0 8.7651 7.1055 15.871 15.871 15.871 8.7651 0 15.871-7.1055 15.871-15.871zm-22.336 0c0-3.571 2.8948-6.4658 6.4658-6.4658 3.571 0 6.4658 2.8948 6.4658 6.4658s-2.8948 6.4658-6.4658 6.4658c-3.5709 0-6.4658-2.8948-6.4658-6.4658z" clip-rule="evenodd" fill-rule="evenodd"/></svg>',
};
const symbols = {
  x: '<?xml version="1.0" encoding="UTF-8"?><svg class="game-screen-header-icons__cross" width="40" height="40" fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="m27.681 1.6344c-1.1716-1.1716-3.0711-1.1716-4.2427 0l-7.4383 7.4383-7.4383-7.4383c-1.1716-1.1716-3.0711-1.1716-4.2426 0l-2.6846 2.6846c-1.1716 1.1716-1.1716 3.0711 0 4.2426l7.4383 7.4383-7.4383 7.4383c-1.1716 1.1716-1.1716 3.0711 0 4.2427l2.6846 2.6846c1.1716 1.1716 3.0711 1.1716 4.2426 0l7.4383-7.4383 7.4383 7.4383c1.1716 1.1716 3.0711 1.1716 4.2427 0l2.6846-2.6846c1.1716-1.1716 1.1716-3.0711 0-4.2427l-7.4383-7.4383 7.4383-7.4383c1.1716-1.1716 1.1716-3.0711 0-4.2426l-2.6846-2.6846z" clip-rule="evenodd" fill-rule="evenodd"/></svg>',
  o: '<?xml version="1.0" encoding="UTF-8"?><svg class="game-screen-header-icons__oval" width="40" height="40" fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="m31.97 15.871c0-8.7651-7.1055-15.871-15.871-15.871-8.765 0-15.871 7.1055-15.871 15.871 0 8.7651 7.1055 15.871 15.871 15.871 8.7651 0 15.871-7.1055 15.871-15.871zm-22.336 0c0-3.571 2.8948-6.4658 6.4658-6.4658 3.571 0 6.4658 2.8948 6.4658 6.4658s-2.8948 6.4658-6.4658 6.4658c-3.5709 0-6.4658-2.8948-6.4658-6.4658z" clip-rule="evenodd" fill-rule="evenodd"/></svg>',
};
const swapPlayer = {
  x: "o",
  o: "x",
};

let currentPlayer = "o";
let playerOne = "o";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isSoloGame = true;

function updateTurnIndicator() {
  $turnIndicator.innerHTML =
    turnIndicators[currentPlayer] +
    '<span class="game-screen-header-turn-indicator__title">turn</span>';
}

function place(position, player) {
  const $cell = $gridCells[position];
  $cell.removeEventListener("click", gridCellClick);
  $cell.innerHTML = symbols[currentPlayer];
  gameBoard[position] = player;
  const gameState = isGameFinished(gameBoard);
  if (gameState === "Égalité") {
    console.log("EGALITE");
    scoreTracker["tie"] += 1;
    $endGameScreen.classList.remove("hidden");
    $winnerIcon.innerHTML = "round tied";
    $winnerText.textContent = "";
  } else if (gameState.endsWith("gagne")) {
    const winner = gameState.split(" ")[0];
    $endGameScreen.classList.remove("hidden");
    scoreTracker[winner] += 1;
    $winnerIcon.innerHTML = `<span>${symbols[winner]}</span>takes the round`;
    if (isSoloGame) {
      if (winner === playerOne) $winnerText.textContent = "You won!";
      else $winnerText.textContent = "Oh no, you lost...";
    } else {
      if (winner === playerOne) $winnerText.textContent = "Player 1 wins!";
      else $winnerText.textContent = "Player 2 wins!";
    }
  }
  currentPlayer = swapPlayer[currentPlayer];
  updateTurnIndicator();
}

function gridCellClick(e) {
  const dataCellId = parseInt(e.target.getAttribute("data-cell-id"));
  place(dataCellId, currentPlayer);
  if (isSoloGame) {
    place(predictBestMove(gameBoard, currentPlayer), currentPlayer);
  }
}

function resetGrid() {
  $gridCells.forEach(($gridCell) => {
    $gridCell.innerHTML = "";
    $gridCell.addEventListener("click", gridCellClick);
  });
  gameBoard = ["", "", "", "", "", "", "", "", ""];
}

function isGameFinished(grid) {
  const lines = [
    // Lignes
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // Colonnes
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // Diagonales
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  for (let line of lines) {
    const [a, b, c] = line;

    if (
      grid[a[0]][a[1]] &&
      grid[a[0]][a[1]] === grid[b[0]][b[1]] &&
      grid[a[0]][a[1]] === grid[c[0]][c[1]]
    ) {
      return grid[a[0]][a[1]] + " gagne";
    }
  }

  if (grid.flat().every((cell) => cell)) return "Égalité";
  return "Rien";
}

function updateScoreTracker() {
  $scoreTrackers.o.textContent = scoreTracker.o;
  $scoreTrackers.x.textContent = scoreTracker.x;
  $scoreTrackers.tie.textContent = scoreTracker.tie;
}

function evaluateGridValue(grid, turn, steps = 0) {
  let isWin = isGameFinished(grid);
  if (isWin.endsWith("gagne"))
    if (isWin.startsWith(turn)) return { value: 10, steps };
    else return { value: -10, steps };
  else if (isWin === "Égalité") return { value: 0, steps };
  let cells = [];
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === "") {
      cells.push(i);
    }
  }

  const values = cells.map((cell) => {
    let newGrid = structuredClone(grid);
    newGrid[cell] = turn;
    const { value, step } = evaluateGridValue(newGrid, swapPlayer[turn], steps);
    return { value: -value, steps: step };
  });

  let max = values[0];
  values.forEach((value) => {
    if (
      value.value > max.value ||
      (value.value === max.value && value.steps < max.steps)
    ) {
      max = value;
    }
  });
  return max;
}

function predictBestMove(grid, turn) {
  let cells = [];
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === "") {
      cells.push(i);
    }
  }

  console.log(cells);

  const values = cells.map((cell) => {
    let newGrid = structuredClone(grid);
    newGrid[cell] = turn;
    const { value, steps } = evaluateGridValue(newGrid, swapPlayer[turn]);
    return { value: -value, steps, cell };
  });

  console.log(values);
  let max = values[0];
  values.forEach((value) => {
    if (
      value.value > max.value ||
      (value.value === max.value && value.steps < max.steps)
    ) {
      max = value;
    }
  });
  console.log(max);
  return max.cell;
}

$newGameScreenPickPlayerIcons.forEach(function ($newGameScreenPickPlayerIcon) {
  $newGameScreenPickPlayerIcon.addEventListener("click", function () {
    for (let i = 0; i < $newGameScreenPickPlayerIcons.length; i++) {
      $newGameScreenPickPlayerIcons[i].classList.remove(
        "new-game-screen-pick-player-icon--selected"
      );
    }

    $newGameScreenPickPlayerIcon.classList.add(
      "new-game-screen-pick-player-icon--selected"
    );
    currentPlayer = $newGameScreenPickPlayerIcon.getAttribute("data-player");
    playerOne = $newGameScreenPickPlayerIcon.getAttribute("data-player");

    console.log(currentPlayer);
  });
});

$newGameScreenNewGameCpuPlayer.addEventListener("click", function () {
  $newGameScreen.classList.add("hidden");
  $gameScreen.classList.remove("hidden");
  isSoloGame = true;
  updateTurnIndicator();
  resetGrid();
  scoreTracker = {
    x: 0,
    o: 0,
    tie: 0,
  };
  updateScoreTracker();
});

$newGameScreenNewGamePlayer.addEventListener("click", function () {
  $newGameScreen.classList.add("hidden");
  $gameScreen.classList.remove("hidden");
  isSoloGame = false;
  updateTurnIndicator();
  resetGrid();
  scoreTracker = {
    x: 0,
    o: 0,
    tie: 0,
  };
  updateScoreTracker();
});

$resetGridButton.addEventListener("click", resetGrid);

$quitGameButton.addEventListener("click", (e) => {
  $endGameScreen.classList.add("hidden");
  $gameScreen.classList.add("hidden");
  $newGameScreen.classList.remove("hidden");
});

$nextRoundButton.addEventListener("click", (e) => {
  updateScoreTracker();
  $endGameScreen.classList.add("hidden");
  resetGrid();
});
