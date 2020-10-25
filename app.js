//#region TODO:
// create function ;movePlayer; to move left, right player and /or comptuer
// create  function ;endGame; ;restartParty; ;resetScore;
//#endregion

canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let ballX = 50;
let ballY = 50;
let speedX = 10;
let speedY = 5;
let leftPlayer = 250;
let rightPlayer = 250;
let scoreLeftPlayer = 0;
let scoreRightPlayer = 0;
let winScreen = false;
const RACKET_HEIGHT = 100;
const HALF_RACKET_Y = RACKET_HEIGHT / 2;
const HALF_CANVAS_X = canvas.width / 2;
const HALF_CANVAS_Y = canvas.height / 2;

/**
 * reset ball position and restart the score
 */
let resetBallPosition = () => {
    // endGame
    let winPlayern = scoreLeftPlayer >= 3 ? 'left player win' : 'right player win';
    if (scoreLeftPlayer >= 3 || scoreRightPlayer >= 3) {
        // resetScore
        scoreLeftPlayer = 0;
        scoreRightPlayer = 0;
        // restartPary
        createShapes('red', 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillText('click to restart', canvas.width / 2, 500);
        ctx.fillText(winPlayern, canvas.width / 2, 100);
        winScreen = true;
    }
    ballX = Math.round((Math.random() * canvas.width / 2) / 10) * 10;
    ballY = Math.round((Math.random() * canvas.height / 2) / 10) * 10;;
}

/**
 * get the current mouse position
 * @param {*} event 
 */
let getMousePosition = (event) => {
    let mousePosition = {
        right: event.clientY - canvas.getBoundingClientRect().top - document.documentElement.scrollTop - HALF_RACKET_Y,
        left: event.clientY - canvas.getBoundingClientRect().top - document.documentElement.scrollTop - HALF_RACKET_Y
    }
    return mousePosition;
}

/**
 * event mouse move to animate left and right player
 */
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

/**
 * event mouse douwn to restart game
 */
canvas.addEventListener('mousedown', (event) => {
    if (winScreen) {
        scoreLeftPlayer = 0;
        scoreRightPlayer = 0;
    }
    winScreen = false;
});

/**
 * create shapes on canvas
 * @param {*} color 
 * @param {*} xPosition 
 * @param {*} yPosition 
 * @param {*} width 
 * @param {*} height 
 */
let createShapes = (color, xPosition, yPosition, width, height) => {
    ctx.fillStyle = color;
    ctx.fillRect(xPosition, yPosition, width, height);
}

/**
 * draw net to visually separate the table
 */
let drawNet = () => {
    for (let index = 0; index < canvas.height; index += 40) {
        createShapes('#f0f0f0', canvas.width / 2, index, 2, 20);
    }
}

/**
 * create circle on canvas
 * @param {*} centerX 
 * @param {*} centerY 
 * @param {*} raduis 
 * @param {*} color 
 */
let createCircle = (centerX, centerY, raduis, color) => {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(centerX, centerY, raduis, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

/**
 * check if the ball is in the racket
 * @param {*} ballPositionY 
 * @param {*} player 
 * @param {*} racketHeight 
 */
let ballInRacket = (ballPositionY, player, racketHeight) => {
    if (ballPositionY > player && ballPositionY < player + racketHeight) {
        return true;
    } else {
        return false;
    }
}

/**
 * animte left player
 */
let computerPlay = () => {
    let racketCenter = rightPlayer + RACKET_HEIGHT / 2;
    if (racketCenter < ballY - 35) {
        rightPlayer += 6;
    } else if (racketCenter > ballY + 35) {
        rightPlayer -= 6;
    }
}

/**
 * change the direction of the ball
 * @param {*} ballPositionY 
 * @param {*} player 
 * @param {*} racketHeight 
 */
let ballControl = (ballPositionY, player, racketHeight) => {
    return (ballPositionY - (player + racketHeight / 2)) * 0.50;
}

/**
 * keep the ball moving
 * @param {*} racketHeight 
 */
let moveBall = (racketHeight) => {
    if (winScreen) {
        return;
    }

    // computerPlay();

    ballX += speedX;
    if (ballX < 0) {
        if (ballInRacket(ballY, leftPlayer, racketHeight)) {
            speedX = -speedX;
            speedY = ballControl(ballY, leftPlayer, racketHeight);
        } else {
            scoreRightPlayer++;
            resetBallPosition();
        }
    }

    if (ballX > canvas.width) {
        if (ballInRacket(ballY, rightPlayer, racketHeight)) {
            speedX = -speedX;
            speedY = ballControl(ballY, rightPlayer, racketHeight);
        } else {
            scoreLeftPlayer++;
            resetBallPosition();
        }
    }

    ballY += speedY;
    if (ballY > canvas.height || ballY < 0) {
        speedY = -speedY;
    }
}

/**
 * set up the game
 */
let setUpGame = () => {
    // create table
    createShapes('black', 0, 0, canvas.width, canvas.height);
    drawNet();

    // create right racket
    createShapes('#f0f0f0', canvas.width, rightPlayer, -10, RACKET_HEIGHT);

    // create left racket
    createShapes('#f0f0f0', 0, leftPlayer, 10, RACKET_HEIGHT);

    // create ball
    createCircle(ballX, ballY, 10, '#f0f0f0');

    //scoring
    ctx.fillText(scoreLeftPlayer, 100, 100);
    ctx.fillText(scoreRightPlayer, canvas.width - 100, 100);
}

/**
 * animate the game
 */
let animation = () => {
    setInterval(() => {
        moveBall(RACKET_HEIGHT);
        if (!winScreen) {
            setUpGame();
        }
    }, 33);
}
animation();