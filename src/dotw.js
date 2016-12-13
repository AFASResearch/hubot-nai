/**
 * Dev of the week
 */

 var cron = require('node-cron');

var devs = ['GSC', 'JGO', 'JVO', 'RHG', 'PWE'];

var lastChosenDev = [];

exports.test = function(robot) {
  // cron.schedule('* * * * * *', function(){
  //
  // });
  robot.messageRoom('U0506R43K', devs[0]);

  return devs[0];
}
