const Gpio = require("onoff").Gpio;
const postEvent = require("./postEvent");

const doorSwitch = new Gpio(22, "in");
let currentState = 0; // Defaults to closed

setInterval(() => {
  doorSwitch.read(function(err, newState) {

    if (currentState === newState) return;

    const value2 = newState === 0 ? "closed" : "open";
    const eventData = {
      value1: "Garage Door is ",
      value2
    };
    process.stdOut.write(`Garage door is ${value2}`); 
    currentState = newState;
    postEvent(eventData);
  });
}, 2000);
