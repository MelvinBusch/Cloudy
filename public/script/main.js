// Socket Verbindung
const SOCKET = io.connect("http://localhost:3000");
let button;

// Rotationserkennung
let rotated = [];
let rps = 0;

// Canvas
let canvas;
let html;
let canvasWidth;
let canvasHeight;
let ctx;
let frameCount = 0;

// Clouds
let clouds = [];
let cloud1;
let cloud2;

// Raindrops
let dropCount = 10;

window.addEventListener("load", init);

function init() {

  html = document.documentElement;

  button = document.getElementById("rotate");

  SOCKET.on("pressed", function() {
    rotated.push("");
    setTimeout(() => rotated.splice(0, 1), 1000);
    // console.log("Das Rad dreht sich: " + rps + " mal pro Sekunde");
  });

  // Press Space Bar for testing purpose without Arduino
  document.addEventListener("keypress", (_event) => {
    if (_event.key == " ") {
      rotated.push("");
      setTimeout(() => rotated.splice(0, 1), 1000);
    }
  });

  setup();
}

function setup() {
  // Image Data
  cloud1 = document.getElementById("cloud-1");
  cloud2 = document.getElementById("cloud-2");

  // Set canvas width and height
  canvasWidth = html.clientWidth;
  canvasHeight = html.clientHeight;
  canvas = document.getElementById("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx = canvas.getContext("2d");

  // create Clouds
  for (let i = 0; i < 30; i++) {
    let x = Math.floor(Math.random() * (canvasWidth * .6 + canvasWidth * .2));
    let y = Math.floor(Math.random() * (canvasHeight * .6 + canvasHeight * .2));

    clouds[i] = new Cloud(x, y, Math.random() < .5 ? cloud1 : cloud2);
    clouds[i].callRain(dropCount); // Übergabeparameter Anzahl Regentropfen
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

  // Display Clouds
  ctx.save();
  for (let i = 0; i < clouds.length; i++) {
    clouds[i].shake();
    clouds[i].show();

    clouds[i].raindrops.forEach((raindrop) => {
      if (raindrop.currentY > canvasHeight) {
        raindrop.currentY = clouds[i].y + clouds[i].yAcc + clouds[i].imageHeight;
        raindrop.x = randomInt(clouds[i].x + clouds[i].xAcc + 10, clouds[i].x + clouds[i].imageWidth + clouds[i].xAcc - 10);
      }
    });
  }
  ctx.restore();

  // Process Button Press
  rps = rotated.length;
  if (rps > 0) {
    // console.log(rps);
  }

  frameCount++;
  window.requestAnimationFrame(draw);
}

let interaction = setInterval(() => {
    // console.log(rps);

    if (rps > 2) {

      // Stop Rain
      for (let i = 0; i < clouds.length; i++) {
        let raindrops = clouds[i].raindrops;

        for (let j = 0; j < raindrops.length; j++) {
          if (raindrops[j].alpha != 0) {

            // TODO: Regentropfen ausfaden statt verschwinden

            raindrops[j].alpha = 0;
            break;
          }
        }
      }
    } else {

      // Start Rain again
      for (let i = 0; i < clouds.length; i++) {
        let raindrops = clouds[i].raindrops;

        for (let j = 0; j < raindrops.length; j++) {
          if (raindrops[j].alpha == 0) {

            // TODO: Regentropfen einfaden statt aufploppen

            raindrops[j].alpha = .8;
            break;
          }
        }
      }
    }
  },
  1000);

function randomArrayIndex(_array) {
  return Math.floor(Math.random() * _array.length);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function fade(_start, _end) {
  _end ? _end : 0;
  let factor = .02;

  if (_start > _end) {
    let id = setInterval(() => {
      _start -= factor;
      if (_start) {

      }
    }, 20)
  }
}