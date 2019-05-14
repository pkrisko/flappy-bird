const spaceBetweenPipe = 180;
const distanceOffWall = 120;
const img = document.createElement('IMG');
img.setAttribute('src', 'img/pipe.png');


function generateRandomSpawns() {
    const randY = Math.random() * (height - (2 * distanceOffWall) - spaceBetweenPipe) + distanceOffWall;
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
        this.x -= 2;
    }

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