const Gpio = require("onoff").Gpio;
const postEvent = require("./postEvent");

if (!process.env.DOOR_PIN || !process.env.INTERVAL_DELAY) {
  throw new Error(
    "Please configure .env file with DOOR_PIN and INTERVAL_DELAY"
  );
}

const doorSwitch = new Gpio(process.env.DOOR_PIN, "in");
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
}, process.env.INTERVAL_DELAY);
