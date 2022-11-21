const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", setCanvasSize);
window.addEventListener('resize', setCanvasSize);

let canvasSize;
let elementSize;

function setCanvasSize(){
    const wHeight = window.innerHeight;
    const wWidth = window.innerWidth;
    canvasSize = wHeight < wWidth ? wHeight * 0.8 : wWidth * 0.8;

    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height", canvasSize);

     elementSize = (canvasSize / 10);
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
    
    for (let i = 1; i <= 10; i++) {
        game.fillText(emojis["X"], elementSize * i, elementSize);
    }

}

