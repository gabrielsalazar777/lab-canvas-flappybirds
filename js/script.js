const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext('2d');

const background = new Image();
background.src = '/images/bg.png';

let animationId;
let gameOn = false;

function animationLoop() {
  ctx.clearRect(0, 0, 1200, 600);
  ctx.drawImage(background, 0, 0, 1200, 600);
}

function startGame() {
  console.log("starting");
  animationId = setInterval(animationLoop, 16);
};

window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    if (!gameOn) {
      gameOn = true;
      let logo = document.getElementById("logo");
      logo.style.visibility = "hidden";
      logo.style.height = "0px";

      let container = document.getElementById("game-board");
      container.style.visibility = "visible";
      container.style.height = "600px";

      let gameBoard = document.getElementById("my-canvas");
      gameBoard.height = "600";
      gameBoard.width = "1200";

      startGame();
    }
  };
};
