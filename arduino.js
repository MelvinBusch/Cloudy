const five = require("johnny-five");
const board = new five.Board();

let sensor;

board.on("ready", () => {
  console.log("Board is ready!");

  sensor = new five.Sensor({
    pin: "A0",
    threshold: 100
  });


  sensor.on("change", () => {
    console.log(sensor.value);
  });
});