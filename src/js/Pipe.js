const spaceBetweenPipe = 180;
const distanceOffWall = 120;
const img = document.createElement('IMG');
img.setAttribute('src', 'img/pipe.png');


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
        const centerX = this.x + (this.pipeWidth / 2);
        context.save();
        context.translate(this.x, this.yTop);
        context.scale(-1, 1);
        context.rotate(Math.PI);

        context.drawImage(img, 0, 0, this.pipeWidth, 500);
        // context.translate(0,0)
        context.restore();
        context.drawImage(img, this.x, this.yBottom, this.pipeWidth, 500);
        // context.fillRect(this.x, this.yBottom, pipeWidth, window.innerHeight);
        // context.fill();
    }
 }

export default Pipe;