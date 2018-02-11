const Gpio = require("onoff").Gpio;
const postEvent = require("./postEvent");

const doorSwitch = new Gpio(22, "in");
doorSwitch.watch(function(err, value) {
  const value2 = value === 0 ? "closed" : "open";
  const eventData = {
    value1: "Garage Door is ",
    value2
  };

  postEvent(eventData);
});
