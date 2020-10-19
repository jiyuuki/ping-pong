let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let ballX = 33;
let ballY = 98;
let speedX = 5;
let speedY = 5;

const createShapes = (color, xPosition, yPosition, width, height) => {
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

let moveBall = () => {
    ballX = ballX + speedX;
    if (ballX > canvas.width || ballX < 0) {
        speedX = -speedX;
    }
    ballY = ballY + speedY;
    if (ballY > canvas.height || ballY < 0) {
        speedY = -speedY;
    }
}

let setUpGame = () => {
    // create table
    createShapes('black', 0, 10, canvas.width, canvas.height);
    // create right racket
    createShapes('#00f3ff', canvas.width, 100, -10, 150);
    // create left racket
    createShapes('#00f3ff', 0, 20, 10, 150);
    // create ball
    createCircle(ballX, ballY, 5, '#f0f0f0');
}

let animation = () => {
    setInterval(() => {
        setUpGame();
        moveBall();
    }, 20);
}
animation();