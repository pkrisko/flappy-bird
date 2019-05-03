//Create image
const img = document.createElement('IMG');
img.setAttribute('src', 'https://www.pngkey.com/png/full/50-502247_flappy-bird-no-background.png');
//Other Static variables
const gravity = 5,
    imgHeight = 60,
    imgWidth = 80,
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
        this.xVel = -1;
        this.yVel = 0;
    }

    flyUp() {
        this.y -= 150;
    }

    /**
     * Add gravity, and then check to see if hitting wall. Don't let the bird
     * fly out of bounds.
     */
    tick() {
        this.y += gravity;
        if (this.y >= yMax) // TODO: Add gameover condition
            this.y = yMax;
        if (this.y <= 0)
            this.y = 0;
    }

    /**
     * Draw a flappy ol' bird at the current position
     */
    render() {
        context.beginPath();
        context.drawImage(img, this.x, this.y, imgWidth, imgHeight);
        context.stroke();
    }
}

// Lets this be used by other files.
export default Bird;