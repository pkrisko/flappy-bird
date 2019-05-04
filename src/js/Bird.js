//Create image
const img = document.createElement('IMG');
img.setAttribute('src', 'https://www.pngkey.com/png/full/50-502247_flappy-bird-no-background.png');
//Other Static variables
const gravity = 0.8;
const toRadians = Math.PI / 360;

class Bird {
    /**
     * Constructor with default values of 50 for x and y.
     * @param {number} x
     * @param {mumber} y
     */
    constructor(x = 50, y = 50) {
        this.x = x;
        this.y = y;
        this.imgHeight = 30;
        this.imgWidth = 40;
        this.yMax = window.innerHeight - this.imgHeight;
        this.lift = -25;
        this.velocity = 0;
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
        this.velocity += gravity;
        this.y += this.velocity;
        if (this.y >= this.yMax) // TODO: Add gameover condition
            this.y = this.yMax;
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
        // context.translate(-centerX, -centerY);
        context.drawImage(img, 0, 0, this.imgWidth, this.imgHeight);
        context.restore();
        // context.rotate(-0.5);

        // context.rotate(-3 * toRadians);
    }
}

// Lets this be used by other files.
export default Bird;