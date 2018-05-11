let five = require("johnny-five");
let board = new five.Board();

board.on("ready", function() {

  let button = new five.Button(2, {
    "holdtime": 50
  });

  button.on("press", function() {
    console.log("Hallo Papa!");
  });

  console.log("Board is ready!");
});