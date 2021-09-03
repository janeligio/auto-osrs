const robot = require('robotjs');
const moment = require('moment');

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get() {
        return { x, y };
    }
}

// const alchPointMac = new Point(1874, 794);
const alchPointMac = new Point(3787, 796);
const alchPointWindows = new Point(901, 836);

const { x: alchX, y: alchY } = alchPointMac;

const startTime = moment();
console.log(moment(startTime).format('MMMM Do YYYY, h:mm:ss a'));

// In seconds
function getTimeElapsed(momentObj) {
    const endTime = moment();
    const elapsedTime = endTime.diff(momentObj, 'seconds');
    return elapsedTime;
}

function main() {
    // Move the mouse to the center
    // robot.moveMouse(alchX, alchY);
    const { x, y } = robot.getMousePos();

    if (
        x > alchX - 100 &&
        x < alchX + 100 &&
        y > alchY - 100 &&
        y < alchY + 100
    ) {
        robot.mouseClick();
    }

    // Move to random position
    // robot.moveMouseSmooth(alchX + randInt(0, 5), alchY + randInt(0, 5));

    // Sleep for a random amount of time
    // const minTime = 500; // milliseconds
    const minTime = 750;
    const maxTime = 1000; // milliseconds

    const randomTime = Math.abs(randInt(minTime, maxTime));
    // console.log(`Sleeping for ${randomTime} milliseconds`);
    sleepms(randomTime);
}

// Auto-clicks but moves the mouse to the original position
function busyMain() {
    const mouseOrigin = robot.getMousePos();

    // moveToCenter();

    robot.moveMouse(alchX, alchY);
    robot.mouseClick();

    // moveToCenter();

    // Move to the original position
    robot.moveMouse(mouseOrigin.x, mouseOrigin.y);

    // const minTime = 500; // milliseconds
    const minTime = 750;
    const maxTime = 1000; // milliseconds

    const randomTime = Math.abs(randInt(minTime, maxTime));
    // console.log(`Sleeping for ${randomTime} milliseconds`);
    sleepms(randomTime);
}

function moveToCenter() {
    // Get  the center of the screen
    const screenSize = robot.getScreenSize();
    const centerX = screenSize.width / 2;
    const centerY = screenSize.height / 2;

    robot.moveMouse(centerX, centerY);
}

// Gets random number between min and max
function randInt(min, max) {
    let numb = Math.floor(Math.random() * (max - min + 1)) + min;
    const isNegative = Math.random() < 0.5;

    if (isNegative) numb = -numb;

    return numb;
}

function sleep(seconds) {
    const ms = seconds * 1000;
    // console.log(`Starting sleep for ${ms} milliseconds`);
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
    // console.log(`Slept ${seconds} seconds`);
}

function sleepms(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

sleep(2);

const minutesUntilKill = 160;

const killTime = minutesUntilKill * 60; // Convert minutes to seconds

let isAlive = true;

const endTime = moment(startTime).add(killTime, 'seconds');
const endTimeFormatted = moment(endTime).format('MMMM Do YYYY, h:mm:ss a');

console.log(`Ending program on ${endTimeFormatted}`);

console.log(`Running program for ${minutesUntilKill} minutes`);

while (isAlive) {
    const timeElapsed = getTimeElapsed(startTime);
    // console.log(`Time elapsed: ${timeElapsed} seconds`);

    // main();
    busyMain();
    // getMousePos();

    if (timeElapsed > killTime) isAlive = false;
}

const totalTime = getTimeElapsed(startTime) / 60;
console.log(`Killing process after ${totalTime} minutes`);
