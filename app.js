//#region TODO:
// create function movePlayer to move left, right player and /or comptuer
//#endregion

canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let ballX = 50;
let ballY = 50;
let speedX = 10;
let speedY = 5;
let leftPlayer = 250;
let rightPlayer = 250;
const RACKET_HEIGHT = 100;
const HALF_RACKET_Y = RACKET_HEIGHT / 2;
const HALF_CANVAS_X = canvas.width / 2;
const HALF_CANVAS_Y = canvas.height / 2;

let resetBallPosition = () => {
    ballX = Math.round((Math.random() * canvas.width / 2) / 10) * 10;
    ballY = Math.round((Math.random() * canvas.height / 2) / 10) * 10;;
}

let getMousePosition = (event) => {
    let mousePosition = {
        right: event.clientY - canvas.getBoundingClientRect().top - document.documentElement.scrollTop - HALF_RACKET_Y,
        left: event.clientY - canvas.getBoundingClientRect().top - document.documentElement.scrollTop - HALF_RACKET_Y
    }
    return mousePosition;
}

canvas.addEventListener('mousemove', (event) => {
    let mousePosition = getMousePosition(event);
    if (event.clientX < HALF_CANVAS_X) {
        leftPlayer = mousePosition.left;
        rightPlayer = HALF_CANVAS_Y;
    } else {
        leftPlayer = HALF_CANVAS_Y;
        rightPlayer = mousePosition.left;
    }
});

let createShapes = (color, xPosition, yPosition, width, height) => {
    ctx.fillStyle = color;
    ctx.fillRect(xPosition, yPosition, width, height);
}

let createCircle = (centerX, centerY, raduis, color) => {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(centerX, centerY, raduis, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

let ballInRacket = (ballPositionY, player, racketHeight) => {
    if (ballPositionY > player && ballPositionY < player + racketHeight) {
        return true;
    } else {
        return false;
    }
}

let computerPlay = () => {
    let racketCenter = rightPlayer + RACKET_HEIGHT / 2;
    if (racketCenter < ballY - 35) {
        rightPlayer += 6;
    } else if (racketCenter > ballY + 35) {
        rightPlayer -= 6;
    }
}

let moveBall = (racketHeight) => {
    computerPlay();
    ballX += speedX;
    if (ballX < 0) {
        if (ballInRacket(ballY, leftPlayer, racketHeight)) {
            speedX = -speedX;
        } else {
            resetBallPosition();
        }
    }

    if (ballX > canvas.width) {
        if (ballInRacket(ballY, rightPlayer, racketHeight)) {
            speedX = -speedX;
        } else {
            resetBallPosition();
        }
    }

    ballY += speedY;
    if (ballY > canvas.height || ballY < 0) {
        speedY = -speedY;
    }
}

let setUpGame = () => {
    // create table
    createShapes('black', 0, 0, canvas.width, canvas.height);

    // create right racket
    createShapes('#f0f0f0', canvas.width, rightPlayer, -10, RACKET_HEIGHT);

    // create left racket
    createShapes('#f0f0f0', 0, leftPlayer, 10, RACKET_HEIGHT);

    // create ball
    createCircle(ballX, ballY, 10, '#f0f0f0');
}

let animation = () => {
    setInterval(() => {
        setUpGame();
        moveBall(RACKET_HEIGHT);
    }, 33);
}
animation();