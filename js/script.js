const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

const background = new Image();
background.src = "/images/bg.png";

const fabyImg = new Image();
fabyImg.src = "/images/flappy.png";

const obstacleTopImg = new Image();
obstacleTopImg.src = "/images/obstacle_top.png";
const obstacleBottomImg = new Image();
obstacleBottomImg.src = "/images/obstacle_bottom.png";

let animationId;
let gameOn = false;
let obstacleId;
let obstacleArray = [];

class Obstacle {
  constructor() {
    this.gap = 100;
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.gap);
    this.bottomY = this.y + this.gap;
  }
  draw() {
    ctx.drawImage(obstacleBottomImg, this.x, this.bottomY);
  }

  update() {
    this.x -= 2;
  }
}

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

function generateObstacles() {
  obstacleArray.push(new Obstacle());
}

function animationLoop() {
  ctx.clearRect(0, 0, 1200, 600);
  ctx.drawImage(background, 0, 0, 1200, 600);
  faby.update();
  obstacleArray.forEach((obstacle, i, arr) => {
    if (obstacle.x < 0) {
      arr.splice(i, 1);
    }
    obstacle.update();
    obstacle.draw();
  });
}

function startGame() {
  console.log("starting");
  animationId = setInterval(animationLoop, 16);
  obstacleId = setInterval(generateObstacles, 5000);
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
