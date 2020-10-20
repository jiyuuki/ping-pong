let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let ballX = 50;
let ballY = 50;
let speedX = 10;
let speedY = 5;
let leftPlayer = 250;
let rightPlayer = 250;
const RACKET_HEIGHT = 100;

let getMousePosition = (event) => {
    let mousePosition = {
        right: (event.clientX - canvas.getBoundingClientRect().left - document.documentElement.scrollLeft) - (RACKET_HEIGHT / 2),
        left: (event.clientY - canvas.getBoundingClientRect().top - document.documentElement.scrollTop) - (RACKET_HEIGHT / 2)
    }
    return mousePosition;
}

// Playe mouvement
canvas.addEventListener('mousemove', (event) => {
    let mousePosition = getMousePosition(event);
    leftPlayer = mousePosition.left;
    rightPlayer = mousePosition.right;
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

let moveBall = () => {
    ballX += speedX;
    if (ballX > canvas.width || ballX < 0) {
        speedX = -speedX;
    }
    ballY += speedY;
    if (ballY > canvas.height || ballY < 0) {
        speedY = -speedY;
    }
}

let setUpGame = () => {
    // create table
    createShapes('black', 0, 10, canvas.width, canvas.height);
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
        moveBall();
    }, 33);
}
animation();