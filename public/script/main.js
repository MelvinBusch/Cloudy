// socket.io
const SOCKET = io.connect("http://localhost:3000");
let button;

// Rotationserkennung
let rotated = [];
let rps;

// Canvas
let canvas;
let frameCount = 0;
let html;
let canvasWidth;
let canvasHeight;
let ctx;
let clouds = [];
let raindrop;

window.addEventListener("load", init);

function init() {

  html = document.documentElement;

  button = document.getElementById("rotate");

  SOCKET.on("pressed", function() {
    rotated.push("");
    setTimeout(() => rotated.splice(0, 1), 1000);
    rps = rotated.length;
    console.log("Das Rad dreht sich: " + rps + " mal pro Sekunde");
  });

  setup();
}

function setup() {
  // Image Data
  let cloud1 = document.getElementById("cloud-1");
  let cloud2 = document.getElementById("cloud-2");

  // Set canvas width and height
  canvasWidth = html.clientWidth;
  canvasHeight = html.clientHeight;
  canvas = document.getElementById("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx = canvas.getContext("2d");

  // create Clouds
  for (let i = 0; i < 50; i++) {
    let x = Math.floor(Math.random() * (canvasWidth * .6 + canvasWidth * .2));
    let y = Math.floor(Math.random() * (canvasHeight * .6 + canvasHeight * .2));

    clouds[i] = new Cloud(x, y, Math.random() < .5 ? cloud1 : cloud2);
  }

  raindrop = new Raindrop(500, 500);

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
  raindrop.show();

  ctx.ellipse(this.x, this.y, 50, 50, 45 * Math.PI / 180, 0, 2 * Math.PI);

  frameCount++;
  window.requestAnimationFrame(draw);
}