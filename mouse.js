const robot = require('robotjs');

function getMousePos() {
    const mousePos = robot.getMousePos();
    console.log(mousePos);
}

while (true) {
    getMousePos();
}
