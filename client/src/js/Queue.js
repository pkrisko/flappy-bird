/** For storing data, in this case a pipe. */
class Node {
    constructor(data, prev, next) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

/** Doubly linked list which adds to the tail and removes from the head. */
class Queue {
    constructor() {
        this.head;
        this.tail;
        this.size = 0;
    }

    /**
     * Add to the end
     * @param {*} data a Poipe
     */
    enqueue(data) {
        this.size++;
        if (!this.tail) {
            const newNode = new Node(data, null, null);
            this.head = newNode;
            this.tail = newNode;
        } else {
            const newNode = new Node(data, this.tail, null);
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    /** Remove from the front */
    dequeue() {
        if (!this.head) return; // empty
        this.size--;
        if (this.head === this.tail) { // one element
            this.head = undefined; // check with null
            this.tail = undefined; // check with null
            return;
        }
        this.head = this.head.next;
        this.head.prev = undefined;
    }
}

export default Queue;