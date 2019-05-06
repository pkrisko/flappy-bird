import Bird from './Bird';
import AllPipes from './AllPipes';

// Global variables
window.canvas = document.getElementById('canvas');
window.context = canvas.getContext("2d");
window.height = window.innerHeight;
window.width = window.innerWidth;

// File scoped variables
const maxFPS = 60; // set to 10 and watch what happens
const backgroundImg = document.createElement('IMG');
backgroundImg.setAttribute('src', 'http://blog.itselectlab.com/wp-content/uploads/background.png');
// let bird;
let allPipes;
let score = 0;
let lastFrameTimeMs = 0;
// How big is the population
let totalPopulation = 1000;
// All active birds (not yet collided with pipe)
let activeBirds = [];
// All birds for any given population
let allBirds = [];

function setup() {
    // bird = new Bird();
    // Create a population
    for (let i = 0; i < totalPopulation; i++) {
        let bird = new Bird();
        activeBirds[i] = bird;
        allBirds[i] = bird;
    }
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

function touchingPipe(bird, pipe) {
    const xIsIntersecting = bird.x -7.5 + bird.imgWidth >= pipe.x && bird.x - 7.5 + bird.imgWidth <= pipe.x + pipe.pipeWidth,
        yIsIntersecting = bird.y+11 < pipe.yTop || bird.y + 23 + bird.imgHeight > pipe.yBottom ;

    return xIsIntersecting && yIsIntersecting;
}

function isDead(bird) {
    const firstPipe = allPipes.pipes.head.data,
        secondPipe = allPipes.pipes.head.next.data;
    // If bird is fallen through map, or touching a poipe.
    return (bird.y + bird.imgHeight > height || touchingPipe(bird, firstPipe) || touchingPipe(bird, secondPipe));
}

/**
 * Update the current state of the game
 * @param {*} progress
 */
function tick() {
    if (activeBirds.length > 0) {
        const firstBird = activeBirds[0];
        if (Math.abs((firstBird.x + firstBird.imgWidth) - (allPipes.pipes.head.data.x + allPipes.pipes.head.data.pipeWidth)) < 2)
            score++;
    } else {
        nextGeneration();
    }
    for (let i = activeBirds.length - 1; i >= 0; i--) {
        let bird = activeBirds[i];
        // Bird uses its brain!
        bird.think(allPipes.pipes);
        bird.tick();

        if (isDead(bird)) {
            activeBirds.splice(i, 1);
        }
    }
    allPipes.tick();
}

/**
 * Draw the current state of the world.
 */
function render() {
    context.drawImage(backgroundImg, 0, 0, width, height);
    activeBirds.forEach(bird => bird.render());
    allPipes.render();
    context.font = '48px sans-serif';
    context.fillStyle = "#fff";
    context.fillText(score, width/ 2 - 50, 80);
}

// Listen for clicks on desktop. touchstart on mobile
window.addEventListener('keyup', (event) => {
    // if (event.keyCode === 32) // Spacebar
    //     bird.flyUp();
});

window.addEventListener('touchstart', () => {
    // bird.flyUp();
});

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);
function resizeCanvas() {
    canvas.width = width;
    canvas.height = height;
}
resizeCanvas();

var audio = new Audio('http://files2.earmilk.com/upload/mp3/2012-04/Theophilus%20London%20Ft%20ASAP%20Rocky-Big%20Spender.mp3?_ga=2.259002762.1018058977.1556944267-758562653.1556944266');

setTimeout(() => {
    // audio.play();
}, 500);

// Code for creating new generations..

// Start the game over
function resetGame() {
    // counter = 0;
    // Resetting best bird score to 0
    // if (bestBird) {
    //     bestBird.score = 0;
    // }
    score = 0;
    allPipes =  new AllPipes();
    window.requestAnimationFrame(mainLoop);
}

// Create the next generation
export function nextGeneration() {
    resetGame();
    // Normalize the fitness values 0-1
    normalizeFitness(allBirds);
    // Generate a new set of birds
    activeBirds = generate(allBirds);
    // Copy those birds to another array
    allBirds = activeBirds.slice();
}

// Generate a new population of birds
function generate(oldBirds) {
    let newBirds = [];
    for (let i = 0; i < oldBirds.length; i++) {
        // Select a bird based on fitness
        let bird = poolSelection(oldBirds);
        newBirds[i] = bird;
    }
    return newBirds;
}

// Normalize the fitness of all birds
function normalizeFitness(birds) {
    // Good for first generations, but might need to limit this above a certain score threshold.
    birds.forEach((bird) => bird.score = Math.pow(bird.score, 2));
    // Add up all the scores
    let sum = 0;
    birds.forEach((bird) => sum += bird.score);
    // Divide by the sum
    birds.forEach((bird) => bird.fitness = bird.score / sum)
}


// An algorithm for picking one bird from an array
// based on fitness
function poolSelection(birds) {
    // Start at 0
    let index = 0;
    // Pick a random number between 0 and 1
    let r = Math.random(1);
    // Keep subtracting probabilities until you get less than zero
    // Higher probabilities will be more likely to be fixed since they will
    // subtract a larger number towards zero
    while (r > 0) {
        r -= birds[index].fitness;
        // And move on to the next
        index += 1;
    }
    // Go back one
    index -= 1;
    // Make sure it's a copy!
    // (this includes mutation)
    return birds[index].copy();
}