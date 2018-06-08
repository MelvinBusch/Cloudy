let five = require("johnny-five");
let board = new five.Board();
let sensor;

let analog = true;

board.on("ready", () => {
  console.log("Board is ready!");

  if (analog) {
    sensor = new five.Sensor({
      pin: "A0",
      // freq: 500,
      threshold: 100
    });
  } else {
    sensor = new five.Sensor({
      pin: 2,
      type: "digital"
    });
  }


  sensor.on("change", () => {
    console.log(sensor.boolean);
  });
});