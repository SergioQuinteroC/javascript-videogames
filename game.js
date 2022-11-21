const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

let canvasSize;
let elementSize;

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
    console.log({
        canvasSize,
        elementSize,
    });

    game.font = elementSize + "px Verdana";
    game.textAlign = "end";
    //game.textAlign = "";

    const map = maps[0];
    const mapRow = map.trim().split("\n");
    const mapRowCol = mapRow.map((row) => row.trim().split(""));

    mapRowCol.forEach((row, x) => {
        row.forEach((col, y) => {
            const emoji = emojis[col];
            const posX = elementSize * (y + 1) + 5;
            const posY = elementSize * (x + 1) - 5;
            game.fillText(emoji, posX, posY);
        });
    });
}
