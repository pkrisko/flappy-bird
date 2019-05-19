/**
 * Checkout Chapter 10 of Nature of Code by Daniel "Coding Train" Shiffman, on
 * Neural Networks. https://natureofcode.com/book/chapter-10-neural-networks/
 * https://github.com/CodingTrain/Toy-Neural-Network-JS/blob/master/lib/nn.js
 */
import Matrix from './Matrix';

class ActivationFunction {
	constructor(func, dfunc) {
		this.func = func;
		this.dfunc = dfunc;
	}
}

let sigmoid = new ActivationFunction(x => 1 / (1 + Math.exp(-x)), y => y * (1 - y));

let tanh = new ActivationFunction(x => Math.tanh(x), y => 1 - y * y);

class NeuralNetwork {
	/**
	 * if first argument is a NeuralNetwork the constructor clones it
	 * USAGE: cloned_nn = new NeuralNetwork(to_clone_nn);
	 * @param {number || NeuralNetwork} in_nodes
	 * @param {number || undefined} hid_nodes
	 * @param {number || undefined} out_nodes
	 */
	constructor(in_nodes, hid_nodes, out_nodes) {
		if (in_nodes instanceof NeuralNetwork) {
			let a = in_nodes;
			this.input_nodes = a.input_nodes;
			this.hidden_nodes = a.hidden_nodes;
			this.output_nodes = a.output_nodes;
			this.weights_ih = a.weights_ih.copy();
			this.weights_ho = a.weights_ho.copy();
			this.bias_h = a.bias_h.copy();
			this.bias_o = a.bias_o.copy();
		} else {
			this.input_nodes = in_nodes;
			this.hidden_nodes = hid_nodes;
			this.output_nodes = out_nodes;
			this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
			this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
			this.weights_ih.randomize();
			this.weights_ho.randomize();
			this.bias_h = new Matrix(this.hidden_nodes, 1);
			this.bias_o = new Matrix(this.output_nodes, 1);
			this.bias_h.randomize();
			this.bias_o.randomize();
		}
		// TODO: copy these as well
		this.setLearningRate();
		this.setActivationFunction();
	}

	/**
	 * Generate the hidden outputs.
	 * @param {Array} input_array
	 */
	predict(input_array) {
		let inputs = Matrix.fromArray(input_array);
		let hidden = Matrix.multiply(this.weights_ih, inputs);
		hidden.add(this.bias_h);
		hidden.map(this.activation_function.func); // activation function!
		// Generating the output's output.
		let output = Matrix.multiply(this.weights_ho, hidden);
		output.add(this.bias_o);
		output.map(this.activation_function.func);
		return output.toArray(); // Sending back to the caller
	}

	/**
	 * Set learning rate. Default value is window.learningRate.
	 * @param {number} learning_rate Between 0 and 1
	 */
	setLearningRate(learning_rate = window.learningRate) {
		this.learning_rate = learning_rate;
	}

	/**
	 * Set activation function. Default value is sigmoid, but tanh is also an option.
	 * @param {function} func
	 */
	setActivationFunction(func = sigmoid) {
		this.activation_function = func;
	}

	/**
	 * 1. Calculate outputs first.
	 * 2. Then, calculate the errors and apply the gradients.
	 * 3. Calculate the deltas and adjust the weights and bias by deltas.
	 * 4. Calculate hidden errors, gradient and how inputs are affected by hidden deltas.
	 * 5. Adjust the bias by the deltas (which is just the gradients)
	 * @param {*} input_array
	 * @param {*} target_array
	 */
	train(input_array, target_array) {
		let inputs = Matrix.fromArray(input_array); // 1. Generating the Hidden Outputs
		let hidden = Matrix.multiply(this.weights_ih, inputs);
		hidden.add(this.bias_h);
		hidden.map(this.activation_function.func);
		// Generating the output's output
		let outputs = Matrix.multiply(this.weights_ho, hidden);
		outputs.add(this.bias_o);
		outputs.map(this.activation_function.func);
		let targets = Matrix.fromArray(target_array); // Convert array to matrix object
		// 2. Calculate the error. ERROR = TARGETS - OUTPUTS
		let output_errors = Matrix.subtract(targets, outputs);
		// let gradient = outputs * (1 - outputs); Calculate gradient
		let gradients = Matrix.map(outputs, this.activation_function.dfunc);
		gradients.multiply(output_errors);
		gradients.multiply(this.learning_rate);
		// 3. Calculate deltas
		let hidden_T = Matrix.transpose(hidden);
		let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);
		// Adjust the weights by deltas
		this.weights_ho.add(weight_ho_deltas);
		// Adjust the bias by its deltas (which is just the gradients)
		this.bias_o.add(gradients);
		// 4. Calculate the hidden layer errors
		let who_t = Matrix.transpose(this.weights_ho);
		let hidden_errors = Matrix.multiply(who_t, output_errors);
		// Calculate hidden gradient
		let hidden_gradient = Matrix.map(hidden, this.activation_function.dfunc);
		hidden_gradient.multiply(hidden_errors);
		hidden_gradient.multiply(this.learning_rate);
		// Calcuate input -> hidden deltas
		let inputs_T = Matrix.transpose(inputs);
		let weight_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);
		this.weights_ih.add(weight_ih_deltas);
		// 5. Adjust the bias by its deltas (which is just the gradients)
		this.bias_h.add(hidden_gradient);
	}

	/** @returns Stringified object representation of NeuralNetwork */
	serialize() {
		return JSON.stringify(this);
	}

	/**
	 * Parse JSON stringify'd object into Neural Network.
	 * @param {*} data
	 */
	static deserialize(data) {
		if (typeof data == "string")
			data = JSON.parse(data);
		let nn = new NeuralNetwork(data.input_nodes, data.hidden_nodes, data.output_nodes);
		nn.weights_ih = Matrix.deserialize(data.weights_ih); // Inner to hidden
		nn.weights_ho = Matrix.deserialize(data.weights_ho); // Hidden to outer
		nn.bias_h = Matrix.deserialize(data.bias_h); // Hidden bias
		nn.bias_o = Matrix.deserialize(data.bias_o); // Outer bias
		nn.learning_rate = data.learning_rate;
		return nn;
	}

	/** @returns New mutated neural network. */
	copy() {
		return new NeuralNetwork(this);
	}

	/**
	 * Apply a mutation function to weights and bias for Neural Network.
	 * @param {function} func
	 */
	mutate(func) {
		this.weights_ih.map(func);
		this.weights_ho.map(func);
		this.bias_h.map(func);
		this.bias_o.map(func);
	}
}

export default NeuralNetwork;