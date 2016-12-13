var temperature = require('./temperature');
var fetch = require('node-fetch');
var dotw = require('./dotw');

module.exports = function(robot) {

  // hubot-auth is a mess in combination with hubot-slack, stubbing all authorization right now
  // see https://github.com/slackapi/hubot-slack/issues/352
  robot.auth = {
    hasRole: function() {
      return true;
    }
  };

  var reportError = function(err) {
    console.error('An error was reported', err);
  }

  robot.respond(/.*(temperature|temperatuur|warm|koud|heet).*/gi, function(res) {
    res.send('Het is nu ' + (Math.round(temperature.getTemperature() * 100) / 100) + '°C');
  });

  var temperaturePublish = robot.brain.get('temperature-publish') || {};

  var publishTemperature = function() {
    var body = {
      room: temperaturePublish.room,
      temperature: temperature.getTemperature(),
      timestamp: {'.sv': 'timestamp'}
    };
    return fetch('https://anta-8b070.firebaseio.com/temperature.json', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    }).then(function (res) {return res.text();});
  };

  var interval = undefined;
  var updateInterval = function() {
    if (interval) {
      clearInterval(interval);
      interval = undefined;
    }
    if (temperaturePublish.seconds > 0) {
      setInterval(publishTemperature, 1000 * temperaturePublish.seconds);
      return publishTemperature();
    }
    return Promise.resolve(undefined);
  };
  updateInterval();

  robot.respond(/publish temperature for room (\w*) every (\d*) seconds/i, function(res) {
    temperaturePublish = {
      seconds: parseInt(res.match[2]),
      room: res.match[1]
    };
    robot.brain.set('temperature-publish', temperaturePublish);
    updateInterval().then(function(result){
      if (result) {
        res.send('Temperature publish successful, interval started ' + result);
      } else {
        res.send('Interval cleared');
      }
    }).catch(function(err) {
      res.send('Failure, sorry: ' + err);
      reportError(err);
    });
  })
  dotw.test(robot);
};
