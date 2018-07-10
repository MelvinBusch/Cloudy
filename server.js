// Setup
const express = require("express");
const app = express();
const server = app.listen(process.env.PORT || 3000, listen);

let host;
let port;

const five = require("johnny-five");
const board = new five.Board();
let sensor;

function listen() {
  host = server.address().address;
  port = server.address().port;
  console.log('Sever startet at: http://' + host + ':' + port);
}

app.use(express.static('public'));

// Socket Connection
let io = require("socket.io")(server);

board.on("ready", () => {
  console.log("Board is ready...");

  sensor = new five.Sensor({
    pin: "A0",
    threshold: 100
  });

  io.sockets.on("connection", (socket) => {

    // When rotating send event
    sensor.on("change", () => {
      socket.emit("rotating");
    });

    // Handling disconnect
    socket.on("disconnect", () => {
      console.log("Client: " + socket.id + " disconnected");
    });
  });
});