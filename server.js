// General Server Setup
let express = require("express");
let app = express();
let server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Sever startet at: http://' + host + ':' + port);
}

app.use(express.static('public'));

// Socket Connection
let io = require("socket.io")(server);

// Handling new Connections
io.sockets.on("connection", function(socket) {
  console.log("New Client Connection: " + socket.id);

  socket.on("disconnect", function() {
    console.log("Client: " + socket.id + " disconnected");
  });
});