const SOCKET = io.connect("http://localhost:3000");

let t = 0;
let c1, c2;
let clouds = [];
let drops = [];
let canvasBorder = 20;

let rps = 0;
let rotated = [];

let pressed = false;

// Socket Event
SOCKET.on("rotating", () => {
  rotated.push("");
  setTimeout(() => rotated.splice(0, 1), 1000);

  rps = rotated.length / 2;

  console.log("Das Rad dreht sich: " + rps + " mal pro Sekunde");
});

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Background
  c1 = color(173, 225, 248);
  c2 = color(232, 194, 225);

  // Clouds
  for (var i = 0; i < 10; i++) {
    clouds[i] = new Cloud(random(canvasBorder, width - canvasBorder), random(canvasBorder, height - canvasBorder));
  }

}

function draw() {
  // background
  backgroundGradient(0, 0, width, height, c1, c2);

  clouds.forEach((cloud) => {
    cloud.show();
  });


  // Move ahead in time
  t += .01;
}

function backgroundGradient(x, y, w, h, c1, c2) {
  noFill();
  for (var i = y; i <= y + h; i++) {
    var inter = map(i, y, y + h, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

/*// Raindrops
let drop = new Rain();
drops.push(drop);

for (let i = drops.length - 1; i >= 0; i--) {
  drops[i].update();
  drops[i].show();

  if (drops[i].done()) {
    drops.splice(i, 1);
  }
}*/