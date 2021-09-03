const robot = require('robotjs');
const moment = require('moment');

const {
    randInt,
    sleep,
    sleepms,
    getTimeElapsed,
    parsePoint,
} = require('./util');

require('dotenv').config();

const { x, y } = parsePoint(process.env.ALCH_POINT);

sleep(2);

const minutesUntilKill = 120;
const killTime = minutesUntilKill * 60; // Convert minutes to seconds

const startTime = moment();
const endTime = moment(startTime).add(killTime, 'seconds');

const startTimeFormatted = moment(startTime).format('MMMM Do YYYY, h:mm:ss a');
const endTimeFormatted = moment(endTime).format('MMMM Do YYYY, h:mm:ss a');

let isAlive = true;

console.log(`Starting on: ${startTimeFormatted}`);
console.log(`Ending on: ${endTimeFormatted}`);

while (isAlive) {
    const timeElapsed = getTimeElapsed(startTime);
    if (timeElapsed > killTime) isAlive = false;

    const mouseOrigin = robot.getMousePos();

    const minWait = 750;
    const maxWait = 1000;
    const randomWait = Math.abs(randInt(minWait, maxWait));

    robot.moveMouse(x, y);
    robot.mouseClick();
    sleepms(50);
    robot.mouseClick();

    robot.moveMouse(mouseOrigin.x, mouseOrigin.y);

    sleepms(randomWait);
}
