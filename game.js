const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

let canvasSize;
let elementSize;

const playerPosition = {
    x: undefined,
    y: undefined,
};

function setCanvasSize() {
    const wHeight = window.innerHeight;
    const wWidth = window.innerWidth;
    canvasSize = wHeight < wWidth ? wHeight * 0.8 : wWidth * 0.8;

    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height", canvasSize);

    elementSize = canvasSize / 10;
    // elementSize = (canvasSize / 10) - 1;

    startGame();
}

function startGame() {
    game.font = elementSize + "px Verdana";
    game.textAlign = "end";
    //game.textAlign = "";

    const map = maps[0];
    const mapRow = map.trim().split("\n");
    const mapRowCol = mapRow.map((row) => row.trim().split(""));

    game.clearRect(0, 0, canvasSize, canvasSize);
    mapRowCol.forEach((row, x) => {
        row.forEach((col, y) => {
            const emoji = emojis[col];
            const posX = elementSize * (y + 1); //+5
            const posY = elementSize * (x + 1); //-5

            //Posicion del jugador
            if (col == "O" && !playerPosition.x && !playerPosition.y) {
                playerPosition.x = posX;
                playerPosition.y = posY;
            }

            game.fillText(emoji, posX, posY);
        });
    });

    //Render player
    movePlayer();
}

function movePlayer() {
    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

window.addEventListener("keydown", moveByKeys); // window or document
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function moveByKeys(event) {
    switch (event.key) {
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        case "ArrowDown":
            moveDown();
            break;
        default:
            break;
    }
}

function moveUp() {
    const move = playerPosition.y - elementSize;
    if (!(move < elementSize)) {
        playerPosition.y -= elementSize;
        startGame();
    }
}
function moveLeft() {
    const move = playerPosition.x - elementSize;
    if (!(move < elementSize)) {
        playerPosition.x -= elementSize;
        startGame();
    }
}
function moveRight() {
    const move = playerPosition.x + elementSize;
    if (!(move > canvasSize)) {
        playerPosition.x += elementSize;
        startGame();
    }
}
function moveDown() {
    const move = playerPosition.y + elementSize;
    if (!(move > canvasSize)) {
        playerPosition.y += elementSize;
        startGame();
    }
}
