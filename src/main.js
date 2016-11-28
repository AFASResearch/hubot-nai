let temperature = require('./temperature');

module.exports = function(robot) {

  robot.hear(/(temperature)|(temperatuur)|(warm)|(koud)|(heet)/i, (res) => {
    res.send('Het is nu ' + (Math.round(temperature.getTemperature() * 100) / 100) + '°C');
  })
}
