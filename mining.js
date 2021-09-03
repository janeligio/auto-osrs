const robot = require('robotjs');
const moment = require('moment');
const { randInt, sleep, sleepms, getTimeElapsed } = require('./util');
require('dotenv').config();

const {
    MINING_ROCK_1_X,
    MINING_ROCK_1_Y,

    MINING_ROCK_2_X,
    MINING_ROCK_2_Y,

    MINING_ROCK_3_X,
    MINING_ROCK_3_Y,

    INVENTORY_SPACE_1_X,
    INVENTORY_SPACE_1_Y,

    INVENTORY_SPACE_2_X,
    INVENTORY_SPACE_2_Y,

    Y_DISTANCE_TO_DROP,

    INVENTORY_TOP_LEFT_X,
    INVENTORY_TOP_LEFT_Y,

    INVENTORY_BOTTOM_RIGHT_X,
    INVENTORY_BOTTOM_RIGHT_Y,
} = process.env;

const firstRock = {
    x: parseInt(MINING_ROCK_1_X),
    y: parseInt(MINING_ROCK_1_Y),
};
const secondRock = {
    x: parseInt(MINING_ROCK_2_X),
    y: parseInt(MINING_ROCK_2_Y),
};
const thirdRock = {
    x: parseInt(MINING_ROCK_3_X),
    y: parseInt(MINING_ROCK_3_Y),
};

const invOne = {
    x: parseInt(INVENTORY_SPACE_1_X),
    y: parseInt(INVENTORY_SPACE_1_Y),
};

const invTwo = {
    x: parseInt(INVENTORY_SPACE_2_X),
    y: parseInt(INVENTORY_SPACE_2_Y),
};

const invTopLeft = {
    x: parseInt(INVENTORY_TOP_LEFT_X),
    y: parseInt(INVENTORY_TOP_LEFT_Y),
};

const invBottomRight = {
    x: parseInt(INVENTORY_BOTTOM_RIGHT_X),
    y: parseInt(INVENTORY_BOTTOM_RIGHT_Y),
};

const YDistanceToDrop = parseInt(Y_DISTANCE_TO_DROP);

function mineRock(rock) {
    const { x, y } = rock;
    robot.moveMouseSmooth(x, y);
    robot.mouseClick();

    // Get random time interval between 3 and 5 seconds;
    const randomMsMeasurement = Math.abs(randInt(1800, 1900));

    sleepms(randomMsMeasurement);
}

function dropRock(inventorySpace) {
    const { x, y } = inventorySpace;

    robot.moveMouseSmooth(x, y);
    robot.mouseClick('right');
    robot.moveMouseSmooth(x, y + YDistanceToDrop);

    sleepms(Math.abs(randInt(300, 500)));

    robot.mouseClick();

    // Get random time interval between 3 and 5 seconds;
    const randomMsMeasurement = Math.abs(randInt(500, 800));

    sleepms(randomMsMeasurement);
}

function clearInventory() {
    const inv = ['INV_1', 'INV_2', 'INV_3', 'INV_4'];

    inv.forEach((item) => {
        const [x, y] = process.env[item].split(',');
        const parsedX = parseInt(x);
        const parsedY = parseInt(y);

        robot.moveMouse(parsedX, parsedY);
        robot.mouseClick('right');
        sleepms(200);
        robot.moveMouse(parsedX, parsedY + YDistanceToDrop);
        robot.mouseClick();

        robot.moveMouse(parsedX - 50, parsedY - 50);
        sleepms(200);
    });
}

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

    mineRock(firstRock);
    // dropRock(invOne);
    mineRock(secondRock);
    // dropRock(invOne);
    mineRock(thirdRock);
    // dropRock(invOne);
    clearInventory();
}
