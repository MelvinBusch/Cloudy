// Client Code goes here

// Connecting to the socket
socket = io.connect("http://localhost:3000");

// Recieving Data from the socket
socket.on('mouse',
  function(data) {
    // Code to execute with the data sent
  }
);

// Sending Data to the socket
function sendmouse(xpos, ypos) {

  // Data Object
  var data = {
    x: xpos,
    y: ypos
  };

  // Send that object to the socket
  socket.emit('mouse', data);
}