const robot = require('robotjs');
const moment = require('moment');

const {
    randInt,
    sleep,
    sleepms,
    getTimeElapsed,
    parsePoint,
    isMac,
} = require('./util');
require('dotenv').config();

function bankMoltenGlass() {
    openBank();

    sleep(1); // Wait for the bank to open

    depositMolten();

    sleepms(500);
}

function openBank() {
    const bankPoint = isMac()
        ? process.env.MAC_CASTLE_WARS_BANK_POINT
        : process.env.WIN_CASTLE_WARS_BANK_POINT;

    const parsedBankPoint = parsePoint(bankPoint); // An object { x, y}
    const { x, y } = parsedBankPoint;

    robot.moveMouseSmooth(x, y);
    robot.mouseClick();
}

function depositMolten() {
    const INV_2 = isMac() ? process.env.MAC_INV_2 : process.env.WIN_INV_2;
    const WIN_INV_2_WITHDRAW_ALL_POINT = isMac()
        ? process.env.MAC_INV_2_WITHDRAW_ALL_POINT
        : process.env.WIN_INV_2_WITHDRAW_ALL_POINT;

    const parsedInv2Point = parsePoint(INV_2);
    const parsedInv2WithdrawAllPoint = parsePoint(WIN_INV_2_WITHDRAW_ALL_POINT);

    // Move mouse to second inventory space
    robot.moveMouse(parsedInv2Point.x, parsedInv2Point.y);
    sleepms(200);

    // Right click
    robot.mouseClick('right');

    // Move mouse to withdraw all
    robot.moveMouseSmooth(
        parsedInv2WithdrawAllPoint.x,
        parsedInv2WithdrawAllPoint.y
    );
    sleepms(200);

    // Left click
    robot.mouseClick();
    sleepms(250);
}

function withdrawSeaweed(number) {
    const seaweedPoint = isMac()
        ? process.env.MAC_SEAWEED_POINT
        : process.env.WIN_SEAWEED_POINT;
    const parsedSeaweedPoint = parsePoint(seaweedPoint); // An object { x, y}
    const { x, y } = parsedSeaweedPoint;

    robot.moveMouse(x, y);

    // withdraw(number);
    for (let i = 0; i < number; i++) {
        withDrawOne();
        robot.moveMouse(x, y);
    }
}

function withDrawOne() {
    // Right click
    robot.mouseClick('right');

    const currentMousePos = robot.getMousePos();
    const { x, y } = currentMousePos;
    const distanceToWithdrawOne = parseInt(
        isMac()
            ? process.env.MAC_WITHDRAW_ONE_DISTANCE
            : process.env.MAC_WITHDRAW_ONE_DISTANCE
    );

    robot.moveMouseSmooth(x, y + distanceToWithdrawOne);
    robot.mouseClick();

    sleepms(200);
}

function withdraw(number) {
    // Right click
    robot.mouseClick('right');

    const currentMousePos = robot.getMousePos();
    const { x, y } = currentMousePos;
    const distanceToWithdrawX = parseInt(
        isMac()
            ? process.env.MAC_WITHDRAW_Y_DISTANCE
            : process.env.WIN_WITHDRAW_Y_DISTANCE
    );

    robot.moveMouseSmooth(x, y + distanceToWithdrawX);
    robot.mouseClick();

    // Wait for dialog to open
    sleep(1);

    const numberStr = number.toString();

    // Type number
    for (let i = 0; i < numberStr.length; i++) {
        const char = numberStr[i];
        robot.keyTap(char);
    }

    sleep(1);
    robot.keyTap('enter');

    // Wait for withdraw to complete
    sleep(1);
}

function withdrawSand(number) {
    const sandPoint = isMac()
        ? process.env.MAC_SAND_POINT
        : process.env.WIN_SAND_POINT;
    const parsedSandPoint = parsePoint(sandPoint); // An object { x, y}
    const { x, y } = parsedSandPoint;

    robot.moveMouse(x, y);

    // withdraw(number);
    withdrawDefault();

    // Wait for withdraw to complete
    sleepms(500);
}

function withdrawDefault() {
    // Withdraws the amount of the last withdraw command
    robot.mouseClick();
}

function closeBank() {
    robot.keyTap('escape');
    sleepms(250);
}

function switchToTab(tab) {
    switch (tab) {
        case 'magic':
            robot.keyTap('6');
            break;
        default:
            break;
    }
    sleepms(250);
}

function castSuperglassMake() {
    const superglassMakePoint = isMac()
        ? process.env.MAC_SUPERGLASS_POINT
        : process.env.WIN_SUPERGLASS_POINT;
    const parsedSuperglassMakePoint = parsePoint(superglassMakePoint); // An object { x, y}
    const { x, y } = parsedSuperglassMakePoint;

    robot.moveMouse(x, y);
    robot.mouseClick();

    // Sleep for a random time between 3 and 5 seconds
    const randomTime = Math.abs(randInt(3000, 5000));
    // console.log(`Sleeping for ${randomTime}ms`);
    sleepms(randomTime);
}

sleep(2);

const startTime = moment();
let endTime;

const startTimeFormatted = moment(startTime).format('MMMM Do YYYY, h:mm:ss a');

console.log(`Starting program on: ${startTimeFormatted}`);

/**
 * To initialize:
 * Have magic tab open
 * Have astrals in 1st inventory slot
 * Castle wars bank
 * North orientation
 * Zoomed full in
 * Client: RuneLite
 * OS: Windows
 *
 */
const iterations = 600;

console.log(`Running for ${iterations} iterations.`);

for (let i = 0; i < iterations; i++) {
    console.log(`Iteration ${i}`);
    bankMoltenGlass();

    withdrawSeaweed(3);

    withdrawSand(18);

    closeBank();

    // switchToTab('magic');

    castSuperglassMake();
}

endTime = moment();

// Print how long the program ran for
const duration = moment.duration(endTime.diff(startTime));
const durationFormatted = moment
    .utc(duration.asMilliseconds())
    .format('HH:mm:ss');

console.log(
    'Ending program on: ' + moment(endTime).format('MMMM Do YYYY, h:mm:ss a')
);
console.log(`Program ran for ${durationFormatted}`);
