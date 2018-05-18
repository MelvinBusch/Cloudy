// Setup
let express = require("express");
let app = express();
let server = app.listen(process.env.PORT || 3000, listen);

let five = require("johnny-five");
let board = new five.Board();

let host;
let port;

function listen() {
  host = server.address().address;
  port = server.address().port;
  console.log('Sever startet at: http://' + host + ':' + port);
}

app.use(express.static('public'));

// Socket Connection
let io = require("socket.io")(server);

board.on("ready", function() {
  console.log("Board is ready...");

  let button = new five.Button(2, {
    "holdtime": 50
  });

  io.sockets.on("connection", function(socket) {

    console.log("New Connection: " + socket.id);

    button.on("press", function() {
      socket.emit("pressed");
    });

    // Handling disconnect
    socket.on("disconnect", function() {
      console.log("Client: " + socket.id + " disconnected");
    });
  });
});