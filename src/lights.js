var Gpio = require('onoff').Gpio;

var leftEar = new Gpio(0, 'out');
var rightEar = new Gpio(1, 'out');

var alarmInterval = undefined;
var currentEar = leftEar;

var rest = function() {
  leftEar.write(0);
  rightEar.write(0);
  currentEar = leftEar;
}

var step = function() {
  currentEar.write(0);
  currentEar = currentEar === leftEar ? rightEar : leftEar;
  currentEar.write(1);
}

module.exports = {

  setAlarm: function(interval) {
    if (alarmInterval) {
      clearInterval(alarmInterval);
    }
    alarmInterval = setInterval(step, interval);
  },

  clearAlarm: function() {
    if (alarmInterval) {
      clearInterval(alarmInterval);
      alarmInterval = undefined;
    }
  }
}
