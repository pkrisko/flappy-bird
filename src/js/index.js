import DVDLogo from './DVDLogo';

// Global variables
window.canvas = document.getElementById('canvas');
window.context = canvas.getContext("2d");

// File scoped variables
let dvdLogo;
let lastRender = 0;

function setup() {
    dvdLogo = new DVDLogo(Math.floor(window.innerWidth / 2, window.innerHeight / 2));
    window.requestAnimationFrame(loop);
}
setup();

function loop(timestamp) {
    const progress = timestamp - lastRender;
    tick(progress);
    render();
    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

/**
 * Update the current state of the game
 * @param {*} progress
 */
function tick(progress) {
    dvdLogo.tick();
}

/**
 * Draw the current state of the world.
 */
function render() {
    context.clearRect(0,0,window.innerWidth, window.innerHeight);
    dvdLogo.render();
}


// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
}
resizeCanvas();