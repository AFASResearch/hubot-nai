module.exports = function(robot) {

  robot.hear(/temperature/i, (res) => {
    res.send('Not sure yet what the temperature is right now');
  })
}
