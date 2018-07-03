const SOCKET = io.connect("http://localhost:3000");

let img = [];

let t = 0;
let c1, c2;
let background;
let clouds = [];
let drops = [];
let sun;
let canvasBorder = 20;

let rps = 0;
let rotated = [];

let pressed = false;

// Socket Event
SOCKET.on("rotating", () => {
  rotated.push(true);
  setTimeout(() => rotated.splice(0, 1), 1000);
});

function keyPressed() {
  if (key === " ") {
    rotated.push(true);
    setTimeout(() => rotated.splice(0, 1), 1000);
  }
}

function preload() {
  img[0] = loadImage("img/cloud-particle-1.png");
  img[1] = loadImage("img/cloud-particle-2.png");
  img[2] = loadImage("img/sun.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // Background
  c1 = color(173, 225, 248);
  c2 = color(232, 194, 225);
  createBackground();

  // Sun
  sun = new Sun();

  // Clouds
  for (let i = 0; i < 35; i++) { // 60
    clouds[i] = new Cloud(random(canvasBorder, width - canvasBorder), random(canvasBorder, height - canvasBorder));
  }



}

function draw() {
  // background
  image(background, 0, 0);

  // Sun
  sun.show();

  // Clouds
  clouds.forEach((cloud) => {
    cloud.show();
  });

  rps = rotated.length / 2;

  // Move ahead in time
  t += 1;
}

function createBackground() {
  background = createImage(width, height);
  background.loadPixels();
  for (let i = 0; i < background.width; i++) {
    for (let j = 0; j < background.height; j++) {
      var inter = map(j, 0, background.height, 0, 1);
      var c = lerpColor(c1, c2, inter);
      background.set(i, j, c);
    }
  }
  background.updatePixels();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}