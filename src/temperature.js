var mcpadc = require('mcp-spi-adc');

var currentTemperature;

var tempSensor = mcpadc.open(5, {speedHz: 20000}, function (err) {
  console.log('Temperature sensor open');
  if (err) throw err;

  setInterval(function () {
    tempSensor.read(function (err, reading) {
      if (err) throw err;
      currentTemperature =(reading.value * 3.3 - 0.5) * 100;
    });
  }, 1000);
});

module.exports = {
  getTemperature: function() {
    return currentTemperature;
  }
}