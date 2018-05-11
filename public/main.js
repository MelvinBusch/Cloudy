let socket = io.connect("http://localhost:3000");
let healine;

socket.on("pressed", counter);

window.addEventListener("load", init);

function init() {
  console.log("Ready to play!");

  headline = document.querySelector("#game-start h1");
  // setTimeout(5000, bounce);
}

function bounce() {
  console.log("Hallo");
}

function counter() {}