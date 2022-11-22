const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector("#lives");
const spanTime = document.querySelector("#time");
const spanRecord = document.querySelector("#record");
const pResult = document.querySelector("#result");

let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined,
};
const giftPosition = {
    x: undefined,
    y: undefined,
};
let bombsPosition = [];

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);


function setCanvasSize() {
    const wHeight = Number(window.innerHeight.toFixed(0));
    const wWidth = Number(window.innerWidth.toFixed(0));
    canvasSize = wHeight < wWidth ? wHeight * 0.75 : wWidth * 0.75;

    canvasSize = Number(canvasSize.toFixed(0));

    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height", canvasSize);

    elementSize = canvasSize / 10;
    elementSize = Number(elementSize.toFixed(0))
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    
    startGame();
}

function startGame() {
    game.font = elementSize + "px Verdana";
    game.textAlign = "end";

    const map = maps[level];

    if (!map) {
        gameWinAndSetRecord();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
    }

    const mapRow = map.trim().split("\n");
    const mapRowCol = mapRow.map((row) => row.trim().split(""));

    showLifes();

    bombsPosition = [];
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

            if (col == "I") {
                giftPosition.x = posX;
                giftPosition.y = posY;
            }
            if (col == "X") {
                bombsPosition.push({
                    x: posX,
                    y: posY,
                });
            }

            game.fillText(emoji, posX, posY);
        });
    });
    movePlayer();
}

function movePlayer() {
    const giftCollisionX =
        giftPosition.x.toFixed(3) == playerPosition.x.toFixed(3);
    const giftCollisionY =
        giftPosition.y.toFixed(3) == playerPosition.y.toFixed(3);

    if (giftCollisionX && giftCollisionY) {
        levelWin();
    }

    const bombsCollision = bombsPosition.find((bomb) => {
        return (
            bomb.x.toFixed(3) == playerPosition.x.toFixed(3) &&
            bomb.y.toFixed(3) == playerPosition.y.toFixed(3)
        );
    });

    if (bombsCollision) {
        levelFail();
    }

    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function levelWin() {
    level++;
    startGame();
}

function levelFail() {
    lives--;
    if (lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWinAndSetRecord() {
    console.log("¡Terminaste el juego!");
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem("record_time");
    const playerTime = +((Date.now() - timeStart) / 1000);

    if (recordTime) {
        if (recordTime >= playerTime) {
            localStorage.setItem("record_time", playerTime);
            pResult.innerHTML = "SUPERASTE EL RECORD :)";
        } else {
            pResult.innerHTML = "Lo siento, no superaste el records :(";
        }
    } else {
        localStorage.setItem("record_time", playerTime);
        pResult.innerHTML =
            "Primera vez? Muy bien, pero ahora trata de superar tu tiempo :)";
    }

}

function showLifes() {
    spanLives.innerText = emojis["HEART"].repeat(lives);
}

function showTime() {
    spanTime.innerText = +((Date.now() - timeStart) / 1000);
}
function showRecord() {
    spanRecord.innerHTML = localStorage.getItem("record_time");
}

window.addEventListener("keydown", moveByKeys); 
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
