var mcpadc;
try {
  mcpadc = require('mcp-spi-adc');
} catch(e) {
  mcpadc = {
    open: function(channel, config, callback) {
      callback();
      return {
        read: function(callback2) {
          callback2(undefined, {value: 0.49 / 3.3});
        }
      }
    }
  }
}

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
