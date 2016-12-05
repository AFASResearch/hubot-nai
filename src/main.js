var temperature = require('./temperature');

module.exports = function(robot) {

  // hubot-auth is a mess in combination with hubot-slack, stubbing all authorization right now
  // see https://github.com/slackapi/hubot-slack/issues/352
  robot.auth = {
    hasRole: function() {
      return true;
    }
  };

  robot.hear(/(temperature)|(temperatuur)|(warm)|(koud)|(heet)/i, function(res) {
    res.send('Het is nu ' + (Math.round(temperature.getTemperature() * 100) / 100) + '°C');
  });
}
