function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let chooseBlock = function () {
  let number = getRandomInt(7);
  //let number = 1;
  let block = [];
  switch (number) {
    case 0:
      block = [
        { x: 7, y: 2 },
        { rotation: 1, block: "tBlock" },
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
      ];
      break;
    case 1:
      block = [
        { x: 7, y: 2 },
        { rotation: 1, block: "strait" },
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: -2, y: 0 },
      ];
      break;
    case 2:
      block = [
        { x: 7, y: 2 },
        { rotation: 1, block: "rightL" },
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: -1, y: 1 },
      ];
      break;
    case 3:
      block = [
        { x: 7, y: 2 },
        { rotation: 1, block: "leftL" },
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: -1, y: -1 },
      ];
      break;
    case 4:
      block = [
        { x: 7, y: 2 },
        { rotation: 1, block: "square" },
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: -1 },
      ];
      break;
    case 5:
      block = [
        { x: 7, y: 2 },
        { rotation: 1, block: "leftS" },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: -1 },
      ];
      break;
    case 6:
      block = [
        { x: 7, y: 2 },
        { rotation: 1, block: "rightS" },
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },
      ];
      break;

    default:
      break;
  }
  return block;
};

let createGrid = function () {
  let grid = [];
  grid.push([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  for (let i = 0; i <= 19; i++) {
    grid.push([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
  }
  grid.push([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);

  return grid;
};

let downWardsMovement = function (i, j, Block, grid) {
  let bolean = false;
  if (i === j) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        for (let k = 2; k < Block.length; k++) {
          if (Block[0].y + Block[k].y === i && Block[0].x + Block[k].x === j) {
            if (0 !== grid[i + 1][j - 1]) {
              bolean = true;
            }
          }
        }
      }
    }
    if (bolean === false) {
      block[0].y++;
    } else {
      return (landed = true);
    }
  }
};

let render = function (Block, grid) {
  const container = document.getElementById("container");
  container.innerHTML = "";

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const snakeSegment = document.createElement("div");
      snakeSegment.id = "block";
      snakeSegment.style = `
                   grid-row: ${i + 1} / ${i + 1};
                   grid-column: ${j + 1}/${j + 1};`;
      if (grid[i][j] === 0) {
        snakeSegment.className = "background";
      } else if (grid[i][j] === 1) {
        snakeSegment.className = "border";
      } else if (grid[i][j] === 2) {
        snakeSegment.className = "tBlock";
      } else if (grid[i][j] === 3) {
        snakeSegment.className = "strait";
      } else if (grid[i][j] === 4) {
        snakeSegment.className = "rightL";
      } else if (grid[i][j] === 5) {
        snakeSegment.className = "leftL";
      } else if (grid[i][j] === 6) {
        snakeSegment.className = "square";
      } else if (grid[i][j] === 7) {
        snakeSegment.className = "leftS";
      } else if (grid[i][j] === 8) {
        snakeSegment.className = "rightS";
      }

      container.appendChild(snakeSegment);
    }
  }

  for (let i = 2; i < Block.length; i++) {
    const snakeSegment = document.createElement("div");
    snakeSegment.id = "block";
    snakeSegment.style = `
             grid-row: ${Block[0].y + Block[i].y + 1} / ${
      Block[0].y + Block[i].y + 1
    };
             grid-column: ${Block[0].x + Block[i].x}/${
      Block[0].x + Block[i].x
    };`;
    snakeSegment.className = block[1].block;

    container.appendChild(snakeSegment);
  }
};

let checkLanding = function (grid, Block, landed) {
  if (landed === true) {
    setTimeout(() => {
      for (let i = 1; i < grid.length; i++) {
        for (let j = 1; j < grid[i].length; j++) {
          for (let k = 2; k < Block.length; k++) {
            if (
              Block[0].y + Block[k].y === i &&
              Block[0].x + Block[k].x === j
            ) {
              if (0 !== grid[i + 1][j - 1]) {
                if (Block[1].block === "tBlock") {
                  for (let k = 2; k < Block.length; k++) {
                    grid[Block[0].y + Block[k].y][
                      Block[0].x + Block[k].x - 1
                    ] = 2;
                  }
                } else if (Block[1].block === "strait") {
                  for (let k = 2; k < Block.length; k++) {
                    grid[Block[0].y + Block[k].y][
                      Block[0].x + Block[k].x - 1
                    ] = 3;
                  }
                } else if (Block[1].block === "rightL") {
                  for (let k = 2; k < Block.length; k++) {
                    grid[Block[0].y + Block[k].y][
                      Block[0].x + Block[k].x - 1
                    ] = 4;
                  }
                } else if (Block[1].block === "leftL") {
                  for (let k = 2; k < Block.length; k++) {
                    grid[Block[0].y + Block[k].y][
                      Block[0].x + Block[k].x - 1
                    ] = 5;
                  }
                } else if (Block[1].block === "square") {
                  for (let k = 2; k < Block.length; k++) {
                    grid[Block[0].y + Block[k].y][
                      Block[0].x + Block[k].x - 1
                    ] = 6;
                  }
                } else if (Block[1].block === "leftS") {
                  for (let k = 2; k < Block.length; k++) {
                    grid[Block[0].y + Block[k].y][
                      Block[0].x + Block[k].x - 1
                    ] = 7;
                  }
                } else if (Block[1].block === "rightS") {
                  for (let k = 2; k < Block.length; k++) {
                    grid[Block[0].y + Block[k].y][
                      Block[0].x + Block[k].x - 1
                    ] = 8;
                  }
                }
                return (land = true);
              } else landing = false;
            }
          }
        }
      }
    }, "50");
  }
};

let checkDeath = function (grid) {
  let text = JSON.stringify(grid[1]);

  if (
    text.includes("2") ||
    text.includes("3") ||
    text.includes("4") ||
    text.includes("5") ||
    text.includes("6") ||
    text.includes("7") ||
    text.includes("8")
  ) {
    return (death = true);
  }
};

let addRestartButton = function () {
  const snakeContainer = document.getElementById("container");
  const resetForm = document.createElement("form");
  const resetButton = document.createElement("button");

  resetForm.className = "resetForm";
  resetButton.innerText = "RESTART";

  resetForm.appendChild(resetButton);

  snakeContainer.appendChild(resetForm);
};

let rotate = function (block, grid, lastRotation) {
  for (let i = 0; i < 2; i++) {
    for (let k = 2; k < block.length; k++) {
      if (
        grid[block[0].y + block[k].y][block[0].x + block[k].x] !== 0 &&
        grid[block[0].y + block[k].y][block[0].x + block[k].x - 2] !== 0
      ) {
        block[1].rotation = lastRotation[0];

        break;
      }
    }

    if (block[1].block === "tBlock") {
      if (block[1].rotation === 1) {
        block[2] = { x: 0, y: 0 };
        block[3] = { x: -1, y: 0 };
        block[4] = { x: 1, y: 0 };
        block[5] = { x: 0, y: -1 };
      } else if (block[1].rotation === 2) {
        block[2] = { x: 0, y: 0 };
        block[3] = { x: 0, y: 1 };
        block[4] = { x: 1, y: 0 };
        block[5] = { x: 0, y: -1 };
      } else if (block[1].rotation === 3) {
        block[2] = { x: 0, y: 0 };
        block[3] = { x: 0, y: 1 };
        block[4] = { x: -1, y: 0 };
        block[5] = { x: 1, y: 0 };
      } else if (block[1].rotation === 0) {
        block[2] = { x: 0, y: 0 };
        block[3] = { x: 0, y: 1 };
        block[4] = { x: -1, y: 0 };
        block[5] = { x: 0, y: -1 };
      }
    }
    if (block[1].block === "strait") {
      if (block[1].rotation === 1) {
        block[2] = { x: 0, y: 0 };
        block[3] = { x: -1, y: 0 };
        block[4] = { x: 1, y: 0 };
        block[5] = { x: -2, y: 0 };
      } else if (block[1].rotation === 2) {
        block[2] = { x: 0, y: 0 };
        block[3] = { x: 0, y: -1 };
        block[4] = { x: 0, y: 1 };
        block[5] = { x: 0, y: -2 };
      } else if (block[1].rotation === 3) {
        block[2] = { x: 0, y: -1 };
        block[3] = { x: -1, y: -1 };
        block[4] = { x: 1, y: -1 };
        block[5] = { x: -2, y: -1 };
      } else if (block[1].rotation === 0) {
        block[2] = { x: -1, y: 0 };
        block[3] = { x: -1, y: -1 };
        block[4] = { x: -1, y: 1 };
        block[5] = { x: -1, y: -2 };
      }
    }
    if (block[1].block === "rightL") {
      if (block[1].rotation === 1) {
        block[2] = { x: 0, y: 0 };
        block[3] = { x: -1, y: 0 };
        block[4] = { x: 1, y: 0 };
        block[5] = { x: -1, y: 1 };
      } else if (block[1].rotation === 2) {
        block[2] = { x: 0, y: 0 };
        block[3] = { x: 0, y: -1 };
        block[4] = { x: 0, y: 1 };
        block[5] = { x: -1, y: -1 };
      } else if (block[1].rotation === 3) {
        block[2] = { x: 0, y: 0 };
        block[3] = { x: 1, y: 0 };
        block[4] = { x: -1, y: 0 };
        block[5] = { x: 1, y: -1 };
      } else if (block[1].rotation === 0) {
        block[2] = { x: 0, y: 0 };
        block[3] = { x: 0, y: -1 };
        block[4] = { x: 0, y: 1 };
        block[5] = { x: 1, y: 1 };
      }
    }
    if (block[1].block === "leftL") {
      if (block[1].rotation === 1) {
        block[2] = { x: 0, y: 0 };
        block[3] = { x: -1, y: 0 };
        block[4] = { x: 1, y: 0 };
        block[5] = { x: -1, y: -1 };
      } else if (block[1].rotation === 2) {
        block[2] = { x: 0, y: 0 };
        block[3] = { x: 0, y: -1 };
        block[4] = { x: 0, y: 1 };
        block[5] = { x: 1, y: -1 };
      } else if (block[1].rotation === 3) {
        block[2] = { x: 0, y: 0 };
        block[3] = { x: 1, y: 0 };
        block[4] = { x: -1, y: 0 };
        block[5] = { x: 1, y: 1 };
      } else if (block[1].rotation === 0) {
        block[2] = { x: 0, y: 0 };
        block[3] = { x: 0, y: -1 };
        block[4] = { x: 0, y: 1 };
        block[5] = { x: -1, y: 1 };
      }
    }
    if (block[1].block === "square") {
      if (block[1].rotation === 1) {
      } else if (block[1].rotation === 2) {
      } else if (block[1].rotation === 3) {
      } else if (block[1].rotation === 0) {
      }
    }
    if (block[1].block === "leftS") {
      if (block[1].rotation === 1) {
        block[2] = { x: 0, y: 0 };
        block[3] = { x: 1, y: 0 };
        block[4] = { x: 0, y: -1 };
        block[5] = { x: -1, y: -1 };
      } else if (block[1].rotation === 2) {
        block[2] = { x: 0, y: 1 };
        block[3] = { x: 0, y: -0 };
        block[4] = { x: 1, y: -1 };
        block[5] = { x: 1, y: 0 };
      } else if (block[1].rotation === 3) {
        block[2] = { x: 0, y: 1 };
        block[3] = { x: 1, y: 1 };
        block[4] = { x: 0, y: 0 };
        block[5] = { x: -1, y: 0 };
      } else if (block[1].rotation === 0) {
        block[2] = { x: -1, y: 1 };
        block[3] = { x: -1, y: -0 };
        block[4] = { x: 0, y: -1 };
        block[5] = { x: 0, y: 0 };
      }
    }
    if (block[1].block === "rightS") {
      if (block[1].rotation === 1) {
        block[2] = { x: 0, y: 0 };
        block[3] = { x: -1, y: 0 };
        block[4] = { x: 0, y: -1 };
        block[5] = { x: 1, y: -1 };
      } else if (block[1].rotation === 2) {
        block[2] = { x: 1, y: 1 };
        block[3] = { x: 1, y: -0 };
        block[4] = { x: 0, y: -1 };
        block[5] = { x: 0, y: 0 };
      } else if (block[1].rotation === 3) {
        block[2] = { x: 0, y: 1 };
        block[3] = { x: -1, y: 1 };
        block[4] = { x: 0, y: 0 };
        block[5] = { x: 1, y: 0 };
      } else if (block[1].rotation === 0) {
        block[2] = { x: 0, y: 1 };
        block[3] = { x: 0, y: -0 };
        block[4] = { x: -1, y: -1 };
        block[5] = { x: -1, y: 0 };
      }
    }

    for (let k = 2; k < block.length; k++) {
      if (grid[block[0].y + block[k].y][block[0].x + block[k].x - 1] !== 0) {
        if (grid[block[0].y + block[k].y][block[0].x + block[k].x] !== 0) {
          block[0].x--;
        } else if (
          grid[block[0].y + block[k].y][block[0].x + block[k].x - 2] !== 0
        ) {
          block[0].x++;
        } else {
          block[1].rotation = lastRotation[0];
          break;
        }
      }
    }
    let bolean = false;
    for (let k = 2; k < block.length; k++) {
      if (grid[block[0].y + block[k].y][block[0].x + block[k].x - 1] !== 0) {
        bolean = true;
      }
    }
    if (bolean === true) {
      block[1].rotation = lastRotation[0];
      block[0].x = lastRotation[1];
    }
  }
};
const score = document.getElementById("score");
score.innerHTML = 0;
let scoreCount = 0;
let clear = function (grid) {
  let pointsToAdd = 0;
  for (let i = 1; i < grid.length - 1; i++) {
    let text = JSON.stringify(grid[i]);
    if (!text.includes("0")) {
      pointsToAdd += 1000;
      setTimeout(() => {
        grid.splice(i, 1);
        grid.splice(0, 1);
        grid.unshift([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
        grid.unshift([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
      }, "25");
    }
  }

  return pointsToAdd;
};

let hitbox = function (Block, grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      for (let k = 2; k < Block.length; k++) {
        if (grid[Block[0].y + Block[k].y][Block[0].x + Block[k].x] !== 0) {
          return (blockmovement = "right");
        }
        if (grid[Block[0].y + Block[k].y][Block[0].x + Block[k].x - 2] !== 0) {
          return (blockmovement = "left");
        }
      }
    }
  }
};
let alterSpeed = function (movCount, movSpeed, points) {
  let countCache = movCount;
  let SpeedCache = movSpeed;

  if (points > 4000 && points < 8000 && movSpeed !== 4 && movSpeed !== 1) {
    countCache = 4;
    SpeedCache = 4;
  } else if (
    points > 8000 &&
    points < 12000 &&
    movSpeed !== 3 &&
    movSpeed !== 1
  ) {
    countCache = 3;
    SpeedCache = 3;
  } else if (points > 12000 && movSpeed !== 2 && movSpeed !== 1) {
    countCache = 2;
    SpeedCache = 2;
  }

  return [countCache, SpeedCache, countCache, SpeedCache];
};

let counter = function (i, j) {
  if (i === j) {
    i = 0;
  } else {
    i++;
  }
  return i;
};

function renderpoints(points) {
  let score = document.getElementById("score");
  score.innerHTML = "";
  points = points + 900000000;
  points = points + "";

  console.log();
  for (let i = 1; i < 9; i++) {
    let number = document.createElement("p");
    number.textContent = points[i];
    score.appendChild(number);
  }
}

document.getElementById("D").addEventListener("click", () => {
  let blockmovement = hitbox(block, grid);

  if (death !== true && blockmovement !== "right") {
    block[0].x++;
  }
});

document.getElementById("A").addEventListener("click", () => {
  let blockmovement = hitbox(block, grid);

  if (death !== true && blockmovement !== "left") {
    block[0].x--;
  }
});

document.getElementById("W").addEventListener("click", () => {
  lastRotation[0] = block[1].rotation;
  lastRotation[1] = block[0].x;

  if (death !== true) {
    if (block[1].rotation <= 2) {
      block[1].rotation++;
    } else {
      block[1].rotation = block[1].rotation - 3;
    }
  }

  rotate(block, grid, lastRotation);
});

document.getElementById("S").addEventListener("touchstart", () => {
  if (sHeld) {
    movCount = 1;
    movSpeed = 1;
    sHeld = false;
  }
});
document.getElementById("S").addEventListener("touchend", () => {
  if (!sHeld) {
    movCount = 5;
    movSpeed = 5;
    sHeld = true;
  }
});

let grid = createGrid();

let landed = true;
let death = false;
let block = [];

let delay = 50;
let points = 0;

let movCount = 5;
let movSpeed = 5;
let checkCount = 10;
let checkSpeed = 10;
let sHeld = true;
let lastRotation = [0, 0];

let countCache = 5;
let SpeedCache = 5;

var keys = [];
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if ((e.key === "s" || e.key === "ArrowDown") && sHeld === true) {
    movCount = 1;
    movSpeed = 1;
    sHeld = false;
  }
}

function keyUpHandler(e) {
  if ((e.key === "s" || e.key === "ArrowDown") && sHeld === false) {
    movCount = 5;
    movSpeed = 5;
    sHeld = true;
  }
}

let pause = false;

window.addEventListener("keydown", (e) => {
  let blockmovement = hitbox(block, grid);
  lastRotation[0] = block[1].rotation;
  lastRotation[1] = block[0].x;

  if (death !== true) {
    if (e.key === "p") {
      if (pause === false) {
        pause = true;
      } else if (pause === true) {
        pause = false;
      }
    }
    if (!pause) {
      if (
        (e.key === "a" || e.key === "ArrowLeft") &&
        blockmovement !== "left"
      ) {
        block[0].x--;
      } else if (
        (e.key === "d" || e.key === "ArrowRight") &&
        blockmovement !== "right"
      ) {
        block[0].x++;
      } else if (e.key === "q") {
        if (block[1].rotation >= 1) {
          block[1].rotation--;
        } else {
          block[1].rotation = block[1].rotation + 3;
        }
      } else if (e.key === "e" || e.key === "w" || e.key === "ArrowUp") {
        if (block[1].rotation <= 2) {
          block[1].rotation++;
        } else {
          block[1].rotation = block[1].rotation - 3;
        }
      }
    }

    rotate(block, grid, lastRotation);
  }
});

block = chooseBlock();
let land = false;

let blockTick = setInterval(function () {
  if (pause === false) {
    if (!sHeld) {
      points += 1;
    }
    movCount = counter(movCount, movSpeed);
    [movCount, movSpeed, countCache, SpeedCache] = alterSpeed(
      movCount,
      movSpeed,
      points
    );

    let death = checkDeath(grid);

    if (land === true) {
      block = chooseBlock();
      landed = false;
      land = false;
    }
    landed = downWardsMovement(movCount, movSpeed, block, grid);
    land = checkLanding(grid, block, landed);

    render(block, grid);
    points += clear(grid);
    renderpoints(points);
    if (death === true) {
      clearInterval(blockTick);
      addRestartButton();
    }
  }
}, delay);
// jag vet att du läser det här
