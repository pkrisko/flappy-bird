import Bird from './Bird';
import AllPipes from './AllPipes';

// Global variables
window.canvas = document.getElementById('canvas');
window.context = canvas.getContext("2d");
window.width = Math.min(window.innerWidth, 420); // 🌴
window.height = width * 1.5; // uses the width directly above.
window.currGeneration = 1;
window.floorHeight = 70;

// File scoped constants
const maxFPS = 100; // set to 10 and watch what happens
const maxBirdsRendered = 20;

// File scoped variables
let allPipes;
let currentTick = 0;
let score = 0;
let highScore = 0;
let lastFrameTimeMs = 0;
let totalPopulation = 4000; // Total birds in each generation
let activeBirds = []; // All active birds (not yet collided with pipe)
let allBirds = []; // All birds for any given population

// File scoped images
const backgroundImg = document.createElement('IMG');
backgroundImg.setAttribute('src', 'img/background.png');
const floorImg = document.createElement('IMG');
floorImg.setAttribute('src', 'img/floor.png');

function setup() {
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
 * Heartbeat of the game. Update and draw the game 100 times a second.
 * @param {*} timestamp
 */
function mainLoop(timestamp) {
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        window.requestAnimationFrame(mainLoop);
        return;
    }
    lastFrameTimeMs = timestamp;
    tick(); // update game state FIRST
    render();
    window.requestAnimationFrame(mainLoop);
}

function touchingPipe(bird, pipe) {
    const xIsIntersecting = bird.x -7.5 + bird.imgWidth >= pipe.x && bird.x - 7.5 + bird.imgWidth <= pipe.x + pipe.pipeWidth,
        yIsIntersecting = bird.y+11 < pipe.yTop || bird.y + 23 + bird.imgHeight > pipe.yBottom;
    return xIsIntersecting && yIsIntersecting;
}

function isDead(bird) {
    const firstPipe = allPipes.pipes.head.data,
        secondPipe = allPipes.pipes.head.next.data;
    // If bird is fallen through map, or touching a pipe.
    return (bird.y + bird.imgHeight > height - floorHeight || touchingPipe(bird, firstPipe) || touchingPipe(bird, secondPipe));
}

/**
 * Update the current state of the game
 * @param {*} progress
 */
function tick() {
    if (activeBirds.length > 0)
        currentTick = activeBirds[0].score;
    if (activeBirds.length > 0) {
        const firstBird = activeBirds[0];
        if (Math.abs((firstBird.x + firstBird.imgWidth) - (allPipes.pipes.head.data.x + allPipes.pipes.head.data.pipeWidth)) < 2) {
            score++;
            if (score >= highScore)
                highScore = score;
            if (score % 5 == 0) {
                const numBirds = activeBirds.length;
                console.log(`\t• ${score} Birds Alive: ${numBirds} (%${(numBirds / 5000 * 100).toFixed(2)})`)
            }
        }
    } else {
        nextGeneration();
    }
    for (let i = activeBirds.length - 1; i >= 0; i--) {
        let bird = activeBirds[i];
        bird.think(allPipes.pipes); // Use bird brain
        bird.tick();
        if (isDead(bird)) { // If dead, get yeeted.
            activeBirds.splice(i, 1);
        }
    }
    allPipes.tick();
}

function drawGameInfo() {
context.font = '48px sans-serif';
    context.fillStyle = "#fff";
    context.fillText(score, width - 150, 80);
    context.font = '24px sans-serif';
    context.fillText(`Gen: ${currGeneration}`, width - 150, 30);
    context.fillText(`${activeBirds.length} birds`, width - 150, 110);
    context.fillText(`Top: ${highScore}`, width - 150, 140);
}

/**
 * Draw the current state of the world.
 */
function render() {
    context.drawImage(backgroundImg, 0, 0, width, height);
    for (let idx = 0; idx < maxBirdsRendered && idx < activeBirds.length; idx++)
        activeBirds[idx].render();
    allPipes.render();
    // Draw the bottom part aka floor.
    // 16, is because every 20 pixels is length of diagonal lines in floor image. creates seamless animation.
    context.drawImage(floorImg, currentTick % 20, 0, width, floorHeight, 0, height - floorHeight, width, floorHeight);
    // Draw text with current game status.
    drawGameInfo();
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

// var audio = new Audio('http://files2.earmilk.com/upload/mp3/2012-04/Theophilus%20London%20Ft%20ASAP%20Rocky-Big%20Spender.mp3?_ga=2.259002762.1018058977.1556944267-758562653.1556944266');

// setTimeout(() => {
//     // audio.play();
// }, 500);

// Code for creating new generations..

// Start the game over
function resetGame() {
    // counter = 0;
    // Resetting best bird score to 0
    // if (bestBird) {
    //     bestBird.score = 0;
    // }
    console.log(`Generation: ${currGeneration} Score: ${score}`);
    currGeneration++;
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
    birds.forEach((bird) => bird.score = Math.pow(bird.score, 25));
    // Add up all the scores
    let sum = 0;
    birds.forEach((bird) => sum += bird.score);
    // Divide by the sum
    birds.forEach((bird) => bird.fitness = bird.score / sum)
}


// An algorithm for picking one bird from an array based on fitness
function poolSelection(birds) {
    let index = 0;
    let r = Math.random(1); // Pick a random number between 0 and 1
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