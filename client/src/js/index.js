/**
 * Loads all the necessary JavaScript for game state, and handles creating
 * new generations. Each bird has a Neural Network, and new generations (epochs)
 * are created using the Genetic Algorithm. Used Daniel Shiffman's library for
 * NN and GA.
 * @author pkrisko <patrick.krisko@gmail.com>
 * @author jofsky <josh.kofksy@gmail.com>
 */

import Bird from './Bird';
import AllPipes from './AllPipes';
import { addGenerationStats, addKeyVariableStats } from './CloudFunctionCalls';

// Global variables
window.canvas = document.getElementById('canvas');
window.context = canvas.getContext("2d");
window.width = Math.min(window.innerWidth, 420); // 🌴
window.height = width * 1.5; // uses the width directly above.
window.currGeneration = 1;
window.floorHeight = 70;

// Variables that heavily affect how well the birds learn.
window.learningRate = .1;
window.mutationRateMultiplier = 4.2;
window.numHiddenLayers = 11;

// File scoped constants
const maxFPS = 100; // set to 10 and watch what happens
const maxBirdsRendered = 20;
const interaction = (+new Date).toString();

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

/** Create a population and set initial game state. Immideiately invoked IIFE */
(function setup() {
    for (let i = 0; i < totalPopulation; i++) {
        let bird = new Bird();
        activeBirds[i] = bird;
        allBirds[i] = bird;
    }
    allPipes =  new AllPipes();
    window.requestAnimationFrame(mainLoop);
    addKeyVariableStats(interaction);
})();

/**
 * Heartbeat of the game. Update and draw the game 100 times a second.
 * @param {number} timestamp
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

/**
 * @param {Bird} bird
 * @param {Pipe} pipe
 * @returns True if bird is touching any pipe in the queue.
 */
function touchingPipe(bird, pipe) {
    const xIsIntersecting = bird.x -7.5 + bird.imgWidth >= pipe.x && bird.x - 7.5 + bird.imgWidth <= pipe.x + pipe.pipeWidth,
        yIsIntersecting = bird.y+11 < pipe.yTop || bird.y + 23 + bird.imgHeight > pipe.yBottom;
    return xIsIntersecting && yIsIntersecting;
}

/**
 * @param {Bird} bird
 * @returns True if bird touching pipe or fallen past floor of the map.
 */
function isDead(bird) {
    const firstPipe = allPipes.pipes.head.data,
        secondPipe = allPipes.pipes.head.next.data;
    return (bird.y + bird.imgHeight > height - floorHeight || touchingPipe(bird, firstPipe) || touchingPipe(bird, secondPipe));
}

/** Update the current state of the game */
function tick() {
    if (activeBirds.length > 0) {
        const firstBird = activeBirds[0];
        currentTick = firstBird.score;
        if (Math.abs((firstBird.x + firstBird.imgWidth) - (allPipes.pipes.head.data.x + allPipes.pipes.head.data.pipeWidth)) < 2) {
            if (++score >= highScore)
                highScore = score;
            if (score % 5 == 0)
                console.log(`\t• ${score} Birds Alive: ${activeBirds.length} (%${(activeBirds.length / totalPopulation * 100).toFixed(2)})`)
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

/** Render on top information about the current generation / game's state */
function drawGameInfo() {
    context.font = '48px sans-serif';
    context.fillStyle = "#fff";
    context.fillText(score, width - 150, 80);
    context.font = '24px sans-serif';
    context.fillText(`Gen: ${currGeneration}`, width - 150, 30);
    context.fillText(`${activeBirds.length} birds`, width - 150, 110);
    context.fillText(`Top: ${highScore}`, width - 150, 140);
}

/** Draw the current state of the world. */
function render() {
    context.drawImage(backgroundImg, 0, 0, width, height);
    for (let idx = 0; idx < maxBirdsRendered && idx < activeBirds.length; idx++)
        activeBirds[idx].render();
    allPipes.render();
    // % 20, because every 20 pixels the image repeats. Creates seamless animation.
    context.drawImage(floorImg, currentTick % 20, 0, width, floorHeight, 0, height - floorHeight, width, floorHeight);
    drawGameInfo(); // Draw text with current game status.
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

/** Start the game over. */
function resetGame() {
    addGenerationStats(interaction, currGeneration++, score); // Make ajax call.
    score = 0;
    allPipes = new AllPipes();
    window.requestAnimationFrame(mainLoop);
}

/** Create the next generation */
export function nextGeneration() {
    resetGame();
    normalizeFitness(allBirds); // Normalize the fitness values 0-1
    activeBirds = generate(allBirds); // Generate a new set of birds
    allBirds = activeBirds.slice(); // Copy those birds to another array
}

/**
 * Generate a new population of birds based on fitness.
 * @param {Array} oldBirds Array of Birds from previous generation
 * */
function generate(oldBirds) {
    return oldBirds.map(bird => poolSelection(oldBirds))
}

/**
 * The more ticks a bird lasts, it has exponentially (^25) higher score. Divide
 * each birds' score by sum of all combined bird fitness scores.
 * @param {Array} birds
 * @returns Value between 0 and 1.
 */
function normalizeFitness(birds) {
    birds.forEach((bird) => bird.score = Math.pow(bird.score, 25));
    let sum = 0;
    birds.forEach((bird) => sum += bird.score); // Add up all the scores
    birds.forEach((bird) => bird.fitness = bird.score / sum) // Divide by the sum
}

/**
 * Randomly select bird from list of all birds, but higher fitness scores have
 * higher likeliness to be selected.
 * @param {Array} birds
 * @returns New bird which is a copy of selected bird, with mutated hidden layer.
 */
function poolSelection(birds) {
    let index = 0, r = Math.random(1);
    while (r > 0)
        r -= birds[index++].fitness; // And move on to the next
    return birds[index - 1].copy();
}
