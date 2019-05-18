const spaceBetweenPipe = 180;
const distanceOffWall = 120;
const img = document.createElement('IMG');
img.setAttribute('src', 'img/pipe.png');

/** @returns random yTop and yBottom seperated by spaceBetweenPipe */
function generateRandomSpawns() {
    const randY = Math.random() * (height - (2 * distanceOffWall) - spaceBetweenPipe) + distanceOffWall;
    return { yTop: randY, yBottom: randY + spaceBetweenPipe }
}

/** Those little green things you see moving across the screen. Consists of
 * data to support 1 vertical set of pipes, 1 top and 1 bottom.
 */
class Pipe {
    constructor(x) {
        this.x = x;
        const {yTop, yBottom} = generateRandomSpawns();
        this.yTop = yTop;
        this.yBottom = yBottom;
        this.pipeWidth = 80;
    }

    /** Move left by 1. */
    tick() {
        this.x -= 2;
    }

    /** Draw both top and bottom pipe. Top pipe is rotated and flipped */
    render() {
        context.save();
        context.translate(this.x, this.yTop);
        context.scale(-1, 1);
        context.rotate(Math.PI);
        context.drawImage(img, 0, 0, this.pipeWidth, 500);
        context.restore();
        context.drawImage(img, this.x, this.yBottom, this.pipeWidth, 500);
    }
 }

export default Pipe;