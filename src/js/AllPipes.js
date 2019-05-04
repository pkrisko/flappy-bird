import Pipe from './Pipe';
import Queue from './Queue';

const distanceBetweenPipes = 200;

class AllPipes {
    constructor() {
        this.pipes = new Queue();
        for (let idx = 1.5; idx < 10; idx++) {
            this.pipes.enqueue(new Pipe((idx + .5) * distanceBetweenPipes));
        }
    }

    tick() {
        let curPipe = this.pipes.head;
        while(curPipe) {
            curPipe.data.tick();
            curPipe = curPipe.next;
        }
        if (this.pipes.head.data.x < -this.pipes.head.data.pipeWidth) {
            this.pipes.enqueue(new Pipe(this.pipes.tail.data.x + distanceBetweenPipes));
            this.pipes.dequeue();
        }
    }

    render() {
        let curPipe = this.pipes.head;
        while(curPipe) {
            curPipe.data.render();
            curPipe = curPipe.next;
        }
    }
}

export default AllPipes;
