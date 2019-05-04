const spaceBetweenPipe = 180;
const distanceOffWall = 120;
const img = document.createElement('IMG');
img.setAttribute('src', 'http://pixelartmaker.com/art/113fb366a989650.png');


function generateRandomSpawns() {
    const randY = Math.random() * (window.innerHeight - (2 * distanceOffWall) - spaceBetweenPipe) + distanceOffWall;
    return {
        yTop: randY,
        yBottom: randY + spaceBetweenPipe
    }
}

class Pipe {
    constructor(x) {
        this.x = x;
        const {yTop, yBottom} = generateRandomSpawns();
        this.yTop = yTop;
        this.yBottom = yBottom;
        this.pipeWidth = 80;
    }

    tick() {
        this.x -= 3;
    }

    render() {
        context.beginPath();
        context.drawImage(img, this.x, 0, this.pipeWidth, this.yTop);
        // context.fillRect(this.x, 0, pipeWidth, this.yTop);
        context.drawImage(img, this.x, this.yBottom, this.pipeWidth, window.innerHeight);
        // context.fillRect(this.x, this.yBottom, pipeWidth, window.innerHeight);
        context.fill();
    }
 }

export default Pipe;