import Bird from './Bird';
import AllPipes from './AllPipes';

// Global variables
window.canvas = document.getElementById('canvas');
window.context = canvas.getContext("2d");
window.height = window.innerHeight;
window.width = window.innerWidth;
window.currGeneration = 1;

// File scoped variables
const maxFPS = 120; // set to 10 and watch what happens
const backgroundImg = document.createElement('IMG');
backgroundImg.setAttribute('src', 'http://blog.itselectlab.com/wp-content/uploads/background.png');
// let bird;
let allPipes;
let score = 0;
let highScore = 0;
let lastFrameTimeMs = 0;
// How big is the population
let totalPopulation = 4000;
// All active birds (not yet collided with pipe)
let activeBirds = [];
// All birds for any given population
let allBirds = [];

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
    if (activeBirds.length > 0) {
        const firstBird = activeBirds[0];
        if (firstBird.fitness % 2 == 0)
            render();
    } else {
        render();
    }
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
    return (bird.y + bird.imgHeight > height || touchingPipe(bird, firstPipe) || touchingPipe(bird, secondPipe));
}

/**
 * Update the current state of the game
 * @param {*} progress
 */
function tick() {
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
    for (let idx = 0; idx < 2 && idx < activeBirds.length; idx++)
        activeBirds[idx].render();
    // activeBirds.forEach(bird => bird.render());
    allPipes.render();
    context.font = '48px sans-serif';
    context.fillStyle = "#fff";
    context.fillText(score, width - 150, 80);
    context.font = '24px sans-serif';
    context.fillText(`Gen: ${currGeneration}`, width - 150, 30);
    context.fillText(`${activeBirds.length} birds`, width - 150, 110);
    context.fillText(`Top: ${highScore}`, width - 150, 140);
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

// Generated by CoffeeScript 1.3.3
(function() {
    var BarGraph, Graph,
      __slice = [].slice,
      __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

    Graph = (function() {

      function Graph(options) {
        var _base, _base1, _base2, _ref, _ref1, _ref2;
        this.options = options != null ? options : {};
        if ((_ref = (_base = this.options).height) == null) {
          _base.height = 200;
        }
        if ((_ref1 = (_base1 = this.options).interval) == null) {
          _base1.interval = 100;
        }
        if ((_ref2 = (_base2 = this.options).extraStyles) == null) {
          _base2.extraStyles = '';
        }
        this.points = [];
      }

      Graph.prototype.add = function() {
        var vals;
        vals = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        this.points.push.apply(this.points, vals);
        return this.renderIfWatching();
      };

      Graph.prototype.clear = function() {
        this.points = [];
        return this.renderIfWatching();
      };

      Graph.prototype.watch = function(opts) {
        return this.watching = true;
      };

      Graph.prototype.stop = function() {
        this.watching = false;
        return clearTimeout(this.timeout);
      };

      Graph.prototype.renderIfWatching = function() {
        var timeSinceLast, timeToNext,
          _this = this;
        if (this.watching) {
          if (!(this.lastRender != null)) {
            timeToNext = 0;
          } else {
            timeSinceLast = +(new Date) - this.lastRender;
            timeToNext = this.options.interval - timeSinceLast;
          }
          return this.timeout = setTimeout(function() {
            return _this.render();
          }, Math.max(timeToNext, 0));
        }
      };

      Graph.prototype.render = function() {
        return this.lastRender = +(new Date);
      };

      return Graph;

    })();

    BarGraph = (function(_super) {

      __extends(BarGraph, _super);

      function BarGraph(options) {
        var _base, _ref;
        this.options = options != null ? options : {};
        BarGraph.__super__.constructor.apply(this, arguments);
        if ((_ref = (_base = this.options).barWidth) == null) {
          _base.barWidth = 3;
        }
      }

      BarGraph.prototype._inspectorHeight = function() {
        return window.outerHeight - window.innerHeight - this.options.height;
      };

      BarGraph.prototype.render = function() {
        var height, i, inspectorHeight, inspectorWidth, point, pointMax, spaces, steps, styles, xScaling, yScaling, _base, _i, _ref;
        BarGraph.__super__.render.apply(this, arguments);
        inspectorHeight = this._inspectorHeight();
        inspectorWidth = window.innerWidth;
        console.log("%c ", "font-size: " + inspectorHeight + "px");
        console.log("%c ", "padding-bottom: " + (this.options.height + this.options.barWidth) + "px");
        steps = inspectorWidth / this.options.barWidth;
        xScaling = Math.min(steps / this.points.length, 1);
        pointMax = Math.max.apply(Math, this.points);
        yScaling = pointMax / this.options.height;
        spaces = "";
        styles = [];
        for (i = _i = 0, _ref = Math.min(steps, this.points.length); 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          point = this.points[Math.floor(i / xScaling)];
          spaces += "%c ";
          height = (point / yScaling) + this.options.barWidth;
          styles.push("font-size: " + this.options.barWidth + "px; background-color: #444; padding-bottom: " + height + "px; " + this.options.extraStyles);
        }
        if (typeof (_base = this.options).step === "function") {
          _base.step();
        }
        return console.log.apply(console, [spaces].concat(__slice.call(styles)));
      };

      return BarGraph;

    })(Graph);

    window.console.graph = function(options) {
      var graph;
      graph = new BarGraph(options);
      if (options.points != null) {
        graph.add.apply(graph, options.points);
      }
      graph.render();
      return graph;
    };

    console.graph.Graph = Graph;

    console.graph.BarGraph = BarGraph;

  }).call(this);