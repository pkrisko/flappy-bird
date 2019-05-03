//Create image
const img = document.createElement('IMG'), imgHeight = 60, imgWidth = 80;
img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/e/e7/DVD-Video_Logo.svg');

class DVDLogo {
    /**
     * Constructor with default values of 50 for x and y.
     * @param {number} x
     * @param {mumber} y
     */
    constructor(x = 50, y = 50) {
        this.x = x;
        this.y = y;
        this.xVel = 2;
        this.yVel = 2;
    }

    /**
     * Check to see if hitting wall first, then update current x and y
     */
    tick() {
        if (this.x >= window.innerWidth - imgWidth || this.x <= 0)
            this.xVel *= -1;
        if (this.y >= window.innerHeight - imgHeight || this.y <= 0)
            this.yVel *= -1;

        this.x += this.xVel;
        this.y += this.yVel;
    }

    /**
     * Draw a circle at the current position
     */
    render() {
        context.beginPath();
        context.drawImage(img, this.x, this.y, imgWidth, imgHeight);
        context.stroke();
    }
}

// Lets this be used by other files.
export default DVDLogo;