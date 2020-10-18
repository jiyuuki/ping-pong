let canvas  = document.getElementById('canvas');
let ctx     = canvas.getContext('2d');
let ballX   = 5;
let ballY   = 5;
let speedX  = 5;
let speedY  = 5;

const createShapes = (color, xPosition, yPosition, width, height) => {
    ctx.fillStyle = color;
    ctx.fillRect(xPosition, yPosition, width, height);
}   

let setUpGame = () => {
    // create table
    createShapes('black', 0, 10, canvas.width, canvas.height);
    // create right racket
    createShapes('#00f3ff', canvas.width, 100, -10, 150);
    // create left racket
    createShapes('#00f3ff', 0, 20, 10, 150 );
}

let moveBall = () => {
    ballX = ballX + speedX;
    if(ballX > canvas.width || ballX < 0){
        speedX = -speedX;
    }
}

let createBall = () => {
    ctx.fillStyle = '#f0f0f0';
    ctx.strokeStyle = '#f0f0f0';
    ctx.beginPath();
    ctx.arc(ballX + 5,  100, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

let animateBall = () => {
    setInterval(() => {
        setUpGame();
        createBall();
        moveBall();
    },20);
}
animateBall();