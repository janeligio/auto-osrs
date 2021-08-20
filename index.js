const robot = require('robotjs');

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get() {
        return { x, y };
    }
}

const alchPoint = new Point(901, 836);
const { x: alchX, y: alchY } = alchPoint;

function getMousePos() {
    const mousePos = robot.getMousePos();
    console.log(mousePos);
}

function main() {
    // Move the mouse to the center
    robot.moveMouse(alchX, alchY);
    robot.mouseClick();

    // Move to random position
    robot.moveMouseSmooth(x + randInt(0, 5), y + randInt(0, 5));

    // Sleep for a random amount of time
    const randomSleep = Math.abs(randInt(3, 5));
    console.log(`Sleeping for ${randomSleep} seconds`);
    sleep(randomSleep);
}

// Auto-clicks but moves the mouse to the original position
function busyMain() {
    const mouseOrigin = robot.getMousePos();

    moveToCenter();

    robot.moveMouse(alchX, alchY);
    robot.mouseClick();

    moveToCenter();

    // Move to the original position
    robot.moveMouse(mouseOrigin.x, mouseOrigin.y);

    const randomSleep = Math.abs(randInt(3, 5));
    console.log(`Sleeping for ${randomSleep} seconds`);
    sleep(randomSleep);
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

sleep(2);

while (true) {
    // main();
    busyMain();
}
