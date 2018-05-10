let socket = io.connect("http://localhost:3000");
let counterSpan;
let _counter = 0;

socket.on("pressed", counter);

document.addEventListener("DOMContentLoaded", init);

function init() {
  counterSpan = document.getElementById("counter");
  console.log(counterSpan);
}

function counter() {
  console.log();
  _counter++;
  counterSpan.innerText = _counter;
}