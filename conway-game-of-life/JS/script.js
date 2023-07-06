const colors = {
  CadetBlue: "#5F9EA0",
  yellowGreen: "#ecf87f",
  DarkMagenta: "#8B008B",
  DimGray: "#696969",
};

let canvasSize = 350;
const gridSize = 12;
let cellSize = canvasSize / gridSize;
let timer;
let generation = 0;

let grid;

function recalculateSizes() {
  canvasSize = floor(windowWidth * 0.5 > 450 ? 450 : windowWidth * 0.5);
  cellSize = canvasSize / gridSize;
}

function windowResized() {
  recalculateSizes();
  resizeCanvas(canvasSize, canvasSize);
}

function setup() {
  document.getElementById("generation").textContent = generation;
  recalculateSizes();
  const canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent("container");

  background(colors.CadetBlue);
  noLoop();

  grid = make2DArray();
}

function draw() {
  let next = make2DArray();
  generation += 1;
  document.getElementById("generation").textContent = generation;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      fill(Boolean(grid[i][j]) ? colors.DarkMagenta : colors.DimGray);
      rect(cellSize * i, cellSize * j, cellSize, cellSize);
    }
  }

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let neighbours = countNeighbors(grid, i, j);
      if (Boolean(grid[i][j])) {
        next[i][j] = Boolean(neighbours === 2 || neighbours === 3) ? 1 : 0;
      } else {
        next[i][j] = Boolean(neighbours === 3) ? 1 : 0;
      }
    }
  }

  grid = next;
  if (checkEnd()) {
    stop();
  }
}
function checkEnd() {
  let currentGrid = JSON.parse(JSON.stringify(grid));

  let next = make2DArray();
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let neighbours = countNeighbors(currentGrid, i, j);
      if (Boolean(currentGrid[i][j])) {
        next[i][j] = Boolean(neighbours === 2 || neighbours === 3) ? 1 : 0;
      } else {
        next[i][j] = Boolean(neighbours === 3) ? 1 : 0;
      }
    }
  }

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (currentGrid[i][j] !== next[i][j]) {
        return false;
      }
    }
  }

  return true;
}

function make2DArray() {
  let cols = new Array(gridSize);
  for (let i = 0; i < gridSize; i++) {
    cols[i] = [];
    for (let j = 0; j < gridSize; j++) {
      cols[i][j] = random([0, 1]);
    }
  }

  return cols;
}

function countNeighbors(grid, x, y) {
  let aliveNeighbors = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const isSelf = i === 0 && j === 0;
      const insideHorizontal = x + i >= 0 && x + i < gridSize;
      const insideVertical = y + j >= 0 && y + j < gridSize;

      if (insideHorizontal && insideVertical && !isSelf) {
        aliveNeighbors += grid[x + i][y + j];
      }
    }
  }

  return aliveNeighbors;
}

function start() {
  document.getElementById("btn-start").disabled = true;
  document.getElementById("btn-stop").disabled = false;
  document.getElementById("btn-run-1").disabled = true;
  document.getElementById("btn-run-5").disabled = true;
  document.getElementById("btn-run-10").disabled = true;
  timer = setInterval(() => {
    draw();
  }, 150);
}

function run(times = 1) {
  let counter = 0;

  document.getElementById("btn-start").disabled = true;
  document.getElementById("btn-stop").disabled = false;
  document.getElementById("btn-run-1").disabled = true;
  document.getElementById("btn-run-5").disabled = true;
  document.getElementById("btn-run-10").disabled = true;

  timer = setInterval(() => {
    if (counter === times) {
      stop();
    } else {
      draw();
      counter += 1;
    }
  }, 150);
}

function stop() {
  clearInterval(timer);
  document.getElementById("btn-start").disabled = false;
  document.getElementById("btn-stop").disabled = true;
  document.getElementById("btn-run-1").disabled = false;
  document.getElementById("btn-run-5").disabled = false;
  document.getElementById("btn-run-10").disabled = false;
}

function reset() {
  stop();
  generation = 0;
  grid = make2DArray();
  draw();
}
