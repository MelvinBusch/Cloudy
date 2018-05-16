const SOCKET = io.connect("http://localhost:3000");
let button;
let canvas;

let rotated = [];
let rps;

let cloud1;
let cloud2;
let canvasWidth;
let canvasHeight;
let frameCount = 0;
let ctx;
let clouds = [];

let html;

window.addEventListener("load", init);

function init() {

  html = document.documentElement;

  button = document.getElementById("rotate");

  cloud1 = document.getElementById("cloud-1");
  cloud2 = document.getElementById("cloud-2");

  SOCKET.on("pressed", function() {
    rotated.push("");
    setTimeout(() => rotated.splice(0, 1), 1000);
    rps = rotated.length;
    console.log("Das Rad dreht sich: " + rps + " mal pro Sekunde");
  });

  setup();
}

function setup() {
  // Set canvas width and height
  canvasWidth = html.clientWidth;
  canvasHeight = html.clientHeight;
  canvas = document.getElementById("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx = canvas.getContext("2d");

  // create Clouds
  for (let i = 0; i < 20; i++) {
    let x = Math.floor(Math.random() * (canvasWidth * .6 + canvasWidth * .2));
    let y = Math.floor(Math.random() * (canvasHeight * .6 + canvasHeight * .2));

    clouds[i] = new Cloud(x, y, Math.random() < .5 ? cloud1 : cloud2);
  }

  window.requestAnimationFrame(draw);
}


function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Background
  let background = ctx.createLinearGradient(0, 0, 0, canvasHeight);
  background.addColorStop(0, "rgb(173, 225, 248)");
  background.addColorStop(1, "rgb(232, 194, 225)");
  ctx.fillStyle = background;
  ctx.strokeStyle = "none";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.save();

  // Render Clouds to Screen
  for (let i = 0; i < clouds.length; i++) {
    clouds[i].shake();
    clouds[i].show();
  }

  ctx.restore();

  frameCount++;
  window.requestAnimationFrame(draw);
}

class Cloud {
  constructor(_xPos, _yPos, _image) {
    this.x = _xPos;
    this.y = _yPos;
    this.xAcc;
    this.yAcc;
    this.image = _image;
    this.imageScale = Math.random() * .3 + .2;
    this.noise = new PerlinNoise(1, .005);
    this.frameCountOffset = Math.random() * 100;
  }

  shake() {
    this.xAcc = this.noise.noise(frameCount);
    this.yAcc = this.noise.noise(frameCount + this.frameCountOffset);
  }

  show() {
    let height = cloud2.width * this.imageScale;
    let width = cloud2.height * this.imageScale;
    ctx.globalAlpha = .6;
    ctx.drawImage(this.image, this.x + this.xAcc, this.y + this.yAcc, height, width);
  }
}