let board = new five.Board();

board.on("ready", function() {

  const button = new five.Button(2, {
    "holdtime": 50
  });

  button.on("press", function() {
    console.log("Hallo Flo!");

    document.getElementById("test").innerText = "Button pressed!";
  });

  console.log("Board is ready!");
});