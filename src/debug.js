var temperature = require('./temperature');

setInterval(function () {
  console.log(temperature.getTemperature());
}, 1000);
