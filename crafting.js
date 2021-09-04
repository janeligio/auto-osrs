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

function bankSapphires() {
    openBank();

    sleepms(750);

    depositSapphires();

    withdrawSapphires();

    sleepms(500);

    closeBank();

    sleepms(500);
}

function openBank() {
    const temp = process.env.CRAFT_BANK_POSITION;
    const point = parsePoint(temp);
    const { x, y } = point;

    robot.moveMouseSmooth(x, y);
    robot.mouseClick();
}

function depositSapphires() {
    const sapphirePos = parsePoint(process.env.INV_2);
    const { x, y } = sapphirePos;
    robot.moveMouseSmooth(x, y);
    robot.mouseClick();
}

function withdrawSapphires() {
    const sapphirePos = parsePoint(process.env.CRAFT_SAPPHIRE_POSITION);
    const { x, y } = sapphirePos;

    robot.moveMouseSmooth(x, y);
    robot.mouseClick();
}

function closeBank() {
    robot.keyTap('escape');
}

function craftSapphires() {
    const INV_1_POS = parsePoint(process.env.INV_1);
    const INV_2_POS = parsePoint(process.env.INV_2);

    robot.moveMouseSmooth(INV_2_POS.x, INV_2_POS.y);
    robot.mouseClick();
    robot.moveMouseSmooth(INV_1_POS.x, INV_1_POS.y);
    robot.mouseClick();

    sleepms(1000);

    robot.keyTap('space');
    console.log('Pressed Space');
}

function waitForCrafting() {
    // Absolute minimum time it takes to craft an inventory is ~31-32 seconds
    // So wait for around 33-36 seconds
    const minTime = 33000;
    const maxTime = 36000;
    const time = Math.abs(randInt(minTime, maxTime));
    console.log(`Waiting for ${time}ms`);
    sleepms(time);
    console.log('Done sleeping');
}

for (let i = 0; i < 21; i++) {
    console.log(`Starting iteration ${i}`);
    bankSapphires();
    craftSapphires();
    waitForCrafting();
}
