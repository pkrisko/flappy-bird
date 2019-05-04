import Bird from './Bird';
import AllPipes from './AllPipes';

// Global variables
window.canvas = document.getElementById('canvas');
window.context = canvas.getContext("2d");

// File scoped variables
const maxFPS = 60; // set to 10 and watch what happens
const backgroundImg = document.createElement('IMG');
backgroundImg.setAttribute('src', 'http://blog.itselectlab.com/wp-content/uploads/background.png');
let bird;
let allPipes;
let score = 0;
let lastFrameTimeMs = 0;

function setup() {
    bird = new Bird(20, 200);
    allPipes =  new AllPipes();
    window.requestAnimationFrame(mainLoop);
}
setup();

/**
 * Heartbeat of the game. Update and draw the game 60 times a second.
 * @param {*} timestamp
 */
function mainLoop(timestamp) {
    // const progress = timestamp - lastFrameTimeMs;
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        window.requestAnimationFrame(mainLoop);
        return;
    }
    lastFrameTimeMs = timestamp;
    tick(); // update game state FIRST
    render(); // THEN draw based on that state
    window.requestAnimationFrame(mainLoop);
}

function touchingPipe(pipe) {
    const xIsIntersecting = bird.x - 5 + bird.imgWidth >= pipe.x && bird.x - 5 + bird.imgWidth <= pipe.x + pipe.pipeWidth,
        yIsIntersecting = bird.y < pipe.yTop || bird.y + bird.imgHeight > pipe.yBottom;
    return xIsIntersecting && yIsIntersecting;
}

function isDead() {
    const firstPipe = allPipes.pipes.head.data,
        secondPipe = allPipes.pipes.head.next.data;
    return (touchingPipe(firstPipe) || touchingPipe(secondPipe));
}

/**
 * Update the current state of the game
 * @param {*} progress
 */
function tick() {
    if (isDead()) return;
    if (Math.abs((bird.x + bird.imgWidth) - (allPipes.pipes.head.data.x + allPipes.pipes.head.data.pipeWidth)) < 2)
        score++;

    bird.tick();
    allPipes.tick();
}

/**
 * Draw the current state of the world.
 */
function render() {
    // context.clearRect(0,0,window.innerWidth, window.innerHeight);
    context.drawImage(backgroundImg, 0, 0, window.innerWidth, window.innerHeight);
    bird.render();
    allPipes.render();

    context.font = '48px sans-serif';
    context.fillStyle = "#fff";
    context.fillText(score, window.innerWidth - 50, 80);
}

// Listen for clicks on desktop. touchstart on mobile
window.addEventListener('keyup', (event) => {
    if (event.keyCode === 32) // Spacebar
        bird.flyUp();
});

window.addEventListener('touchstart', () => {
    bird.flyUp();
});

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);
function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
}
resizeCanvas();

var audio = new Audio('http://files2.earmilk.com/upload/mp3/2012-04/Theophilus%20London%20Ft%20ASAP%20Rocky-Big%20Spender.mp3?_ga=2.259002762.1018058977.1556944267-758562653.1556944266');

setTimeout(() => {
    // audio.play();
}, 500);
