"use strict";
module.exports = function (robot) {
    robot.hear(/temperature/i, function (res) {
        res.send('Not sure yet what the temperature is right now');
    });
};
