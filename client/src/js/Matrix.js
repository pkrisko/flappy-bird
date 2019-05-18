 /**
 * Checkout Chapter 10 of Nature of Code by Daniel "Coding Train" Shiffman, on
 * Neural Networks. https://natureofcode.com/book/chapter-10-neural-networks/
 * https://github.com/CodingTrain/Toy-Neural-Network-JS/blob/master/lib/matrix.js
 */
class Matrix {
    /**
     * @param {number} rows
     * @param {number} cols
     */
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
    }

    /** @returns a copy of this matrix. */
    copy() {
        let m = new Matrix(this.rows, this.cols);
        m.data = m.data.map(row => row.map(cell => cell));
        return m;
    }

    /**
     * @param {Array} arr
     * @returns Matrix which is a vector from @param arr
     */
    static fromArray(arr) {
        return new Matrix(arr.length, 1).map((e, i) => arr[i]);
    }

    /**
     * @param {Matrix} a
     * @param {Matrix} b
     * @returns new Matrix, element wise, a - b.
     */
    static subtract(a, b) {
        if (a.rows !== b.rows || a.cols !== b.cols) {
            console.log('Columns and Rows of A must match Columns and Rows of B.');
            return;
        }
        return new Matrix(a.rows, a.cols).map((_, i, j) => a.data[i][j] - b.data[i][j]);
    }

    /**
     * @returns Flattened 2D array into linear 1D vector.
     */
    toArray() {
        let arr = [];
        this.data.forEach(row => row.forEach(cell => arr.push(cell)));
        return arr;
    }

    randomize() {
        return this.map(e => Math.random() * 2 - 1);
    }

    /**
     * @param {Matrix} n
     * @returns New matrix with @param n matrix added to instance matrix.
     */
    add(n) {
        if (n instanceof Matrix) {
            if (this.rows !== n.rows || this.cols !== n.cols) {
                console.log('Columns and Rows of A must match Columns and Rows of B.');
                return;
            }
            return this.map((e, i, j) => e + n.data[i][j]);
        } else {
            return this.map(e => e + n);
        }
    }

    /**
     * @param {Matrix} matrix
     * @returns The transposition of the current Matrix
     */
    static transpose(matrix) {
        return new Matrix(matrix.cols, matrix.rows).map((_, i, j) => matrix.data[j][i]);
    }

    /**
     * Matrix product.
     * @param {Matrix} a
     * @param {Matrix} b
     */
    static multiply(a, b) {
        // Matrix product
        if (a.cols !== b.rows) {
            console.log('Columns of A must match rows of B.');
            return;
        }
        return new Matrix(a.rows, b.cols).map((e, i, j) => {
            // Dot product of values in col
            let sum = 0;
            for (let k = 0; k < a.cols; k++) {
                sum += a.data[i][k] * b.data[k][j];
            }
            return sum;
        });
    }

    /**
     * If n instanceof Matrix, and rows/cols are equal return hadamard
     * product (multiply each element). Else, n is a number (scalar) and multiply
     * each element by n.
     * @param {number || Matrix} n
     * @returns Hadamard or scalar product.
     */
    multiply(n) {
        if (n instanceof Matrix) {
            if (this.rows !== n.rows || this.cols !== n.cols) {
                console.log('Columns and Rows of A must match Columns and Rows of B.');
                return;
            }
            return this.map((e, i, j) => e * n.data[i][j]); // hadamard product
        } else {
            return this.map(e => e * n); // Scalar product
        }
    }

    /**
     * Apply a function to every element of matrix. Instance method.
     * @param {function} func
     */
    map(func) {
        this.data = this.data.map((row, i) => row.map((cell, j) => func(cell, i, j)))
        return this;
    }

    /**
     * // Apply a function to every element of matrix. Static method.
     * @param {Matrix} matrix
     * @param {function} func
     */
    static map(matrix, func) {
        return new Matrix(matrix.rows, matrix.cols)
        .map((e, i, j) => func(matrix.data[i][j], i, j));
    }

    /** Get some pretty printed output of n x m matrix as table */
    print() {
        console.table(this.data);
        return this;
    }

    /** Serialize object into JSON string representation */
    serialize() {
        return JSON.stringify(this);
    }

    /**
     * Parse JSON object into Matrix object.
     * @param {String} data
     */
    static deserialize(data) {
        if (typeof data == 'string')
            data = JSON.parse(data);
        let matrix = new Matrix(data.rows, data.cols);
        matrix.data = data.data;
        return matrix;
    }
}

export default Matrix;