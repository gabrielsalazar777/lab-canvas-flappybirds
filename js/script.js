const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

const background = new Image();
background.src = "/images/bg.png";

const fabyImg = new Image();
fabyImg.src = "/images/flappy.png";

let animationId;
let gameOn = false;

const faby = {
  x: 400,
  y: 200,
  width: 80,
  height: 56,
  speedX: 0,
  speedY: 0,
  gravity: 0.2,
  gravitySpeed: 0,
  update() {
    if (this.y + this.height >= canvas.height) {
      this.speedY = -5;
    }

    if (this.y <= 0) {
      this.y += 10;
    }

    if (this.speedY < 2) {
      this.speedY += this.gravity;
    } else {
      this.speedY = this.speedY;
    }
    this.y += this.speedY;
    ctx.drawImage(fabyImg, this.x, this.y, this.width, this.height);
  },
  newPosition(event) {
    switch (event.code) {
      case "ArrowLeft":
        this.x -= 6;
        break;
      case "ArrowRight":
        this.x += 6;
        break;
      case "Space":
        if (this.speedY > -5) {
          console.log("space");
          this.speedY -= 1;
        }
        break;
    }
  },
};

function animationLoop() {
  ctx.clearRect(0, 0, 1200, 600);
  ctx.drawImage(background, 0, 0, 1200, 600);
  faby.update();
}

function startGame() {
  console.log("starting");
  animationId = setInterval(animationLoop, 16);
}

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
  document.addEventListener("keydown", (e) => {
    faby.newPosition(e);
  });
};
