import NeuralNetwork from './NeuralNetwork';

// Static variables
const img = document.createElement('IMG');
img.setAttribute('src', 'img/blue-bird.png');
const gravity = 0.5;
const toRadians = Math.PI / 360;

/**
 * Helper function for normalizing ranges from 1 range to another.
 * @param {*} value Value in start range to be transformed / scaled to second range
 * @param {*} start1 Start value of first range
 * @param {*} stop1 End value of first range
 * @param {*} start2 Start value of second range
 * @param {*} stop2 End value of second range
 */
function constrainRange(value, start1, stop1, start2, stop2) {
    const range1 = stop1 - start1,
        range2 = stop2 - start2,
        relativePosition = (value - start1) / range1 ; // 10
    return (relativePosition * range2) + start2;
}

function sigmoid(x) {
    return 1 / (1 + Math.pow(Math.E, -x));
}

// Standard Normal variate using Box-Muller transform. Similar values to random
// Gausian standard distribution.
function randomBoxMuller() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = (num / 10.0) + 0.5; // Translate to 0 -> 1
    return (num > 1 || num < 0) ? randomBoxMuller() : num; // resample between 0 and 1
}

// Mutation function to be passed into bird.brain
function mutate(x) {
    if (Math.random(1) < 1 - sigmoid(currGeneration / mutationRateMultiplier)) {
        let offset = randomBoxMuller() * 0.5;
        let newx = x + offset;
        return newx;
    } else {
        return x;
    }
}

class Bird {
    /**
     * Constructor with default values of 50 for x and y.
     * @param {number} x
     * @param {mumber} y
     */
    constructor(brain) {
        this.x = 20;
        this.y = height / 2;
        this.imgHeight = 30;
        this.imgWidth = 40;
        this.yMax = height - this.imgHeight;
        this.lift = -25;
        this.velocity = 0;
        this.hitboxCoords = {
            topLeft: { x: 0, y: 0 },
            topRight: { x: 0, y: 0 },
            bottomRight: { x: 0, y: 0 },
            bottomLeft: { x: 0, y: 0 }
        }
        // Is this a copy of another Bird or a new one?
        // The Neural Network is the bird's "brain"
        if (brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
            this.brain.mutate(mutate);
        } else {
            this.brain = new NeuralNetwork(11, numHiddenLayers, 2);
        }
        // Score is how many frames it's been alive
        this.score = 0;
        // Fitness is normalized version of score
        this.fitness = 0;
    }

    copy() {
        return new Bird(this.brain);
    }

    // This is the key function now that decides
    // if it should jump or not jump!
    think(pipes) {
        let headData = pipes.head.data,
            secondData = pipes.head.next.data,
            beforeLeftFirstPipe = this.x < headData.x;
        // if (x is true) ? then execute this : else this
            // need to calculate topy and bottom y of next 3 vertical lines with pipe
        let closest = (beforeLeftFirstPipe) ? headData : { x: headData.x + 80, yTop: headData.yTop, yBottom: headData.yBottom };
        let secondClosest = (beforeLeftFirstPipe) ? { x: headData.x + 80, yTop: headData.yTop, yBottom: headData.yBottom} : secondData;
        let thirdClosest = (beforeLeftFirstPipe) ? secondData : { x: secondData.x + 80, yTop: secondData.yTop, yBottom: secondData.yBottom };
        // Now create the inputs to the neural network
        let inputs = [];
        // Inputs are the x, yTop, and yBottom of closest 3 pipes, as well
        // As bird's velocity and y position.
        inputs[0] = constrainRange(closest.x, this.x, width, 0, 1);
        inputs[1] = constrainRange(closest.yTop, 0, height, 0, 1);
        inputs[2] = constrainRange(closest.yBottom, 0, height, 0, 1);
        inputs[3] = constrainRange(secondClosest.x, this.x, width, 0, 1);
        inputs[4] = constrainRange(secondClosest.yTop, 0, height, 0, 1);
        inputs[5] = constrainRange(secondClosest.yBottom, 0, height, 0, 1);
        inputs[6] = constrainRange(thirdClosest.x, this.x, width, 0, 1);
        inputs[7] = constrainRange(thirdClosest.yTop, 0, height, 0, 1);
        inputs[8] = constrainRange(thirdClosest.yBottom, 0, height, 0, 1);
        inputs[9] = constrainRange(this.y, 0, height, 0, 1);
        inputs[10] = constrainRange(this.velocity, -10, 10, 0, 1);
        let action = this.brain.predict(inputs);
        if (action[1] > action[0]) this.flyUp();
    }

    flyUp() {
        this.velocity -= 15; // Negative velocity makes y decrease, and bird go up.
    }

    /**
     * Add gravity, and then check to see if hitting wall. Don't let the bird
     * fly out of bounds.
     */
    tick() {
        this.score++;
        this.velocity += gravity;
        this.y += this.velocity;
        if (this.y <= 0)
            this.y = 0;
    }

    getRotationAngle() {
        let number = Math.min(Math.max(parseInt(this.velocity), -12), 6);
        return toRadians * number * 12;
    }

    /** Draw a flappy ol' bird at the current position */
    render() {
        const centerX = this.x + (this.imgWidth / 2),
            centerY = this.y + (this.imgHeight / 2);
        context.save();
        context.translate(centerX, centerY);
        context.rotate(this.getRotationAngle());
        context.drawImage(img, 0, 0, this.imgWidth, this.imgHeight);
        context.restore();
    }
}

export default Bird;
