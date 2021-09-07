const moment = require('moment');

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

function getTimeElapsed(momentObj) {
    const endTime = moment();
    const elapsedTime = endTime.diff(momentObj, 'seconds');
    return elapsedTime;
}

function isMac() {
    return process.platform === 'darwin';
}

// function clearInventory(numSpaces) {
//     const invWidth = invBottomRight.x - invTopLeft.x;
//     const invHeight = invBottomRight.y - invTopLeft.y;

//     const numInvSpaces = 28;
//     const numColumns = 4;
//     const numRows = 7;

//     const invSpaceWidth = invWidth / numColumns;
//     const invSpaceHeight = invHeight / numColumns;

//     // // Coordinate Position (1-indexed) in the inventory
//     // for (let pos = 1; pos <= 28; pos++) {
//     //     const xPosition = pos % (numColumns + 1);
//     //     const yPosition = pos % numRows;
//     //     console.log(xPosition);
//     //     // console.log(yPosition);
//     // }

//     const startPos = {
//         x: invTopLeft.x - (invSpaceWidth/2),
//         y: invTopLeft.y + (invSpaceHeight/2)
//     }

//     robot.moveMouseSmooth(startPos.x, startPos.y);

//     const currentRow = { x: startPos.x, y: startPos.y };

//     for (let rows = 1; rows <= 7; rows++) {
//         for (let cols = 1; cols <= 4; cols++) {
//             let { currX, currY } = robot.getMousePos();

//             // Move to next position
//             robot.moveMouse(currX + invSpaceWidth, currY);

//             currX = robot.getMousePos().x;
//             currY = robot.getMousePos().y;

//             const { x, y } = robot.getMousePos();

//             // Drop item
//             robot.mouseClick('right');
//             robot.moveMouseSmooth(x, y + YDistanceToDrop)
//             robot.mouseClick();

//             // Move mouse out to close dialog box
//             robot.moveMouseSmooth(x - 300,  y + YDistanceToDrop);

//         }

//         // Move to next row

//         const nextRowStart = {
//             x: invTopLeft.x + (invSpaceWidth/2),
//             y: rows * (invTopLeft.y + (invSpaceHeight/2))
//         }
//     }
// }

function parsePoint(point) {
    const points = point.split(',');
    const [x, y] = points;
    return { x: parseInt(x), y: parseInt(y) };
}

module.exports = {
    randInt,
    sleep,
    sleepms,
    getTimeElapsed,
    parsePoint,
    isMac,
};
