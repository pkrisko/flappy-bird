import NeuralNetwork from './NeuralNetwork';

//Create image
const img = document.createElement('IMG');
// img.setAttribute('src', 'https://www.pngkey.com/png/full/50-502247_flappy-bird-no-background.png');
img.setAttribute('src', 'img/blue-bird.png');
//Other Static variables
const gravity = 0.8;
const toRadians = Math.PI / 360;

function constrainRange(value, start1, stop1, start2, stop2) {
    const range1 = stop1 - start1;
    const range2 = stop2 - start2;
    const relativePosition = (value - start1) / range1 ; // 10
    return (relativePosition * range2) + start2;
}

// Standard Normal variate using Box-Muller transform.
function randomBoxMuller() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

// Mutation function to be passed into bird.brain
function mutate(x) {
    if (Math.random(1) < 0.1) {
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
            this.brain = new NeuralNetwork(5, 8, 2);
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
        let closest = (this.x < pipes.head.data.x) ? pipes.head.data : pipes.head.next.data;
        // Now create the inputs to the neural network
        let inputs = [];
        // x position of closest pipe
        inputs[0] = constrainRange(closest.x, this.x, width, 0, 1);
        // top of closest pipe opening
        inputs[1] = constrainRange(closest.yTop, 0, height, 0, 1);
        // bottom of closest pipe opening
        inputs[2] = constrainRange(closest.yBottom, 0, height, 0, 1);
        // bird's y position
        inputs[3] = constrainRange(this.y, 0, height, 0, 1);
        // bird's y velocity
        inputs[4] = constrainRange(this.velocity, -5, 5, 0, 1);
        // Get the outputs from the network
        let action = this.brain.predict(inputs);
        // Decide to jump or not!
        if (action[1] > action[0]) {
            this.flyUp();
        }

    }

    flyUp() {
        if (this.velocity > 5) { // Falling down fast
            this.velocity += (-21);
        } else { // falling down slow or going up
            this.velocity += (-10);
        }
    }

    /**
     * Add gravity, and then check to see if hitting wall. Don't let the bird
     * fly out of bounds.
     */
    tick() {
        this.score++;
        this.velocity += gravity;
        this.y += this.velocity;
        // if (this.y >= this.yMax) // TODO: Add gameover condition
        //     this.y = this.yMax;
        if (this.y <= 0)
            this.y = 0;
    }

    getRotationAngle() {
        let number = Math.min(Math.max(parseInt(this.velocity), -12), 6);
        return toRadians * number * 12;
    }

    /**
     * Draw a flappy ol' bird at the current position
     */
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

// Lets this be used by other files.
export default Bird;