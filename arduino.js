const five = require("johnny-five");
let board = new five.Board();

board.on("ready", function() {

  const button = new five.Button(2, {
    "holdtime": 50
  });

  button.on("press", function() {
    console.log("Hallo Welt!");
  });

  console.log("Board is ready!");
});