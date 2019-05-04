import Bird from './Bird';

// Global variables
window.canvas = document.getElementById('canvas');
window.context = canvas.getContext("2d");

// File scoped variables
const maxFPS = 60; // set to 10 and watch what happens
const backgroundImg = document.createElement('IMG');
backgroundImg.setAttribute('src', 'http://blog.itselectlab.com/wp-content/uploads/background.png');
let bird;
let lastFrameTimeMs = 0;

function setup() {
    bird = new Bird(40, 200);
    window.requestAnimationFrame(mainLoop);
}
setup();

/**
 * Heartbeat of the game. Update and draw the game 60 times a second.
 * @param {*} timestamp
 */
function mainLoop(timestamp) {
    const progress = timestamp - lastFrameTimeMs;
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        window.requestAnimationFrame(mainLoop);
        return;
    }
    lastFrameTimeMs = timestamp;
    tick(progress); // update game state FIRST
    render(); // THEN draw based on that state
    window.requestAnimationFrame(mainLoop);
}

/**
 * Update the current state of the game
 * @param {*} progress
 */
function tick(progress) {
    bird.tick();
}

// Listen for clicks on desktop. touchstart on mobile
window.addEventListener('keyup', (event) => {
    if (event.keyCode === 32)
        bird.flyUp();
});
window.addEventListener('touchstart', () => {
    bird.flyUp();
});

/**
 * Draw the current state of the world.
 */
function render() {
    // context.clearRect(0,0,window.innerWidth, window.innerHeight);
    context.drawImage(backgroundImg, 0, 0, window.innerWidth, window.innerHeight);
    bird.render();
}

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);
function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
}
resizeCanvas();