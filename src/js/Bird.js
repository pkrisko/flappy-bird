//Create image
const img = document.createElement('IMG');
img.setAttribute('src', 'https://www.pngkey.com/png/full/50-502247_flappy-bird-no-background.png');
//Other Static variables
const gravity = 0.8,
    imgHeight = 30,
    imgWidth = 40,
    toRadians = Math.PI / 180,
    yMax = window.innerHeight - imgHeight;

class Bird {
    /**
     * Constructor with default values of 50 for x and y.
     * @param {number} x
     * @param {mumber} y
     */
    constructor(x = 50, y = 50) {
        this.x = x;
        this.y = y;
        this.lift = -25;
        this.velocity = 0;
    }

    flyUp() {
        if (this.velocity < -20) { // If we're already flying up
            this.velocity += -5;
        } else {
            this.velocity += this.lift;
        }
    }

    /**
     * Add gravity, and then check to see if hitting wall. Don't let the bird
     * fly out of bounds.
     */
    tick() {
        this.velocity += gravity;
        this.y += this.velocity;
        if (this.y >= yMax) // TODO: Add gameover condition
            this.y = yMax;
        if (this.y <= 0)
            this.y = 0;
    }

    /**
     * Draw a flappy ol' bird at the current position
     */
    render() {
        context.drawImage(img, this.x, this.y, imgWidth, imgHeight);
    }
}

// Lets this be used by other files.
export default Bird;