const SOCKET = io.connect("http://localhost:3000");
let button;
let canvas;

let rotated = [];
let rps;

let cloud1;
let cloud2;

let html;

window.addEventListener("load", init);

function init() {

  html = document.documentElement;

  button = document.getElementById("rotate");

  cloud1 = document.getElementById("cloud-1");
  cloud2 = document.getElementById("cloud-2");

  button.addEventListener("click", function() {
    rotated.push("");
    setTimeout(() => rotated.splice(0, 1), 1000);
    rps = rotated.length;
    console.log("Das Rad dreht sich: " + rps + " mal pro Sekunde");
  });

  window.requestAnimationFrame(draw);
}

function draw() {

  let width = html.clientWidth;
  let height = html.clientHeight;

  canvas = document.getElementById("canvas");
  canvas.width = width;
  canvas.height = height;

  let ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, width, height);

  // Background
  let background = ctx.createLinearGradient(0, 0, 0, height);
  background.addColorStop(0, "rgb(173, 225, 248)");
  background.addColorStop(1, "rgb(232, 194, 225)");
  ctx.fillStyle = background;
  ctx.strokeStyle = "none";
  ctx.fillRect(0, 0, width, height);

  // Wolken
  let cloudPos = shake(100, 50);

  ctx.drawImage(cloud1, cloudPos.x, cloudPos.y);


  // ctx.drawImage(cloud2, 100, 300);



  window.requestAnimationFrame(draw);
}

function shake(_x, _y) {
  _x += (Math.random() + 1) * 20;
  _y += (Math.random() + 1) * 20;

  return {
    "x": _x,
    "y": _y
  }
}

/*
class Cloud {
  constructor(_x, _y, _image) {

  }
}
*/

// SOCKET.on("pressed", counter);