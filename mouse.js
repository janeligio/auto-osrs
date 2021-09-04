const robot = require('robotjs');
const { sleepms } = require('./util');

function getMousePos() {
    const mousePos = robot.getMousePos();
    console.log(mousePos);
}

while (true) {
    sleepms(250);
    getMousePos();
}
