/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/AllPipes.js":
/*!****************************!*\
  !*** ./src/js/AllPipes.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pipe */ \"./src/js/Pipe.js\");\n/* harmony import */ var _Queue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Queue */ \"./src/js/Queue.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar distanceBetweenPipes = 200;\n\nvar AllPipes =\n/*#__PURE__*/\nfunction () {\n  function AllPipes() {\n    _classCallCheck(this, AllPipes);\n\n    this.pipes = new _Queue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n\n    for (var idx = 1; idx < 6; idx++) {\n      this.pipes.enqueue(new _Pipe__WEBPACK_IMPORTED_MODULE_0__[\"default\"]((idx + .5) * distanceBetweenPipes));\n    }\n  }\n\n  _createClass(AllPipes, [{\n    key: \"tick\",\n    value: function tick() {\n      var curPipe = this.pipes.head;\n\n      while (curPipe) {\n        curPipe.data.tick();\n        curPipe = curPipe.next;\n      }\n\n      if (this.pipes.head.data.x < -this.pipes.head.data.pipeWidth) {\n        this.pipes.enqueue(new _Pipe__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.pipes.tail.data.x + distanceBetweenPipes));\n        this.pipes.dequeue();\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var curPipe = this.pipes.head;\n\n      while (curPipe) {\n        curPipe.data.render();\n        curPipe = curPipe.next;\n      }\n    }\n  }]);\n\n  return AllPipes;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (AllPipes);\n\n//# sourceURL=webpack:///./src/js/AllPipes.js?");

/***/ }),

/***/ "./src/js/Bird.js":
/*!************************!*\
  !*** ./src/js/Bird.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n//Create image\nvar img = document.createElement('IMG');\nimg.setAttribute('src', 'https://www.pngkey.com/png/full/50-502247_flappy-bird-no-background.png'); //Other Static variables\n\nvar gravity = 0.8;\n\nvar Bird =\n/*#__PURE__*/\nfunction () {\n  /**\n   * Constructor with default values of 50 for x and y.\n   * @param {number} x\n   * @param {mumber} y\n   */\n  function Bird() {\n    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;\n    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;\n\n    _classCallCheck(this, Bird);\n\n    this.x = x;\n    this.y = y;\n    this.imgHeight = 30;\n    this.imgWidth = 40;\n    this.yMax = window.innerHeight - this.imgHeight;\n    this.lift = -25;\n    this.velocity = 0;\n  }\n\n  _createClass(Bird, [{\n    key: \"flyUp\",\n    value: function flyUp() {\n      if (this.velocity > 5) {\n        // Falling down fast\n        this.velocity += -21;\n      } else {\n        // falling down slow or going up\n        this.velocity += -10;\n      }\n    }\n    /**\n     * Add gravity, and then check to see if hitting wall. Don't let the bird\n     * fly out of bounds.\n     */\n\n  }, {\n    key: \"tick\",\n    value: function tick() {\n      this.velocity += gravity;\n      this.y += this.velocity;\n      if (this.y >= this.yMax) // TODO: Add gameover condition\n        this.y = this.yMax;\n      if (this.y <= 0) this.y = 0;\n    }\n    /**\n     * Draw a flappy ol' bird at the current position\n     */\n\n  }, {\n    key: \"render\",\n    value: function render() {\n      context.drawImage(img, this.x, this.y, this.imgWidth, this.imgHeight);\n    }\n  }]);\n\n  return Bird;\n}(); // Lets this be used by other files.\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Bird);\n\n//# sourceURL=webpack:///./src/js/Bird.js?");

/***/ }),

/***/ "./src/js/Pipe.js":
/*!************************!*\
  !*** ./src/js/Pipe.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar spaceBetweenPipe = 180;\nvar distanceOffWall = 120;\nvar img = document.createElement('IMG');\nimg.setAttribute('src', 'http://pixelartmaker.com/art/113fb366a989650.png');\n\nfunction generateRandomSpawns() {\n  var randY = Math.random() * (window.innerHeight - 2 * distanceOffWall - spaceBetweenPipe) + distanceOffWall;\n  return {\n    yTop: randY,\n    yBottom: randY + spaceBetweenPipe\n  };\n}\n\nvar Pipe =\n/*#__PURE__*/\nfunction () {\n  function Pipe(x) {\n    _classCallCheck(this, Pipe);\n\n    this.x = x;\n\n    var _generateRandomSpawns = generateRandomSpawns(),\n        yTop = _generateRandomSpawns.yTop,\n        yBottom = _generateRandomSpawns.yBottom;\n\n    this.yTop = yTop;\n    this.yBottom = yBottom;\n    this.pipeWidth = 80;\n  }\n\n  _createClass(Pipe, [{\n    key: \"tick\",\n    value: function tick() {\n      this.x -= 3;\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      context.beginPath();\n      context.drawImage(img, this.x, 0, this.pipeWidth, this.yTop); // context.fillRect(this.x, 0, pipeWidth, this.yTop);\n\n      context.drawImage(img, this.x, this.yBottom, this.pipeWidth, window.innerHeight); // context.fillRect(this.x, this.yBottom, pipeWidth, window.innerHeight);\n\n      context.fill();\n    }\n  }]);\n\n  return Pipe;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Pipe);\n\n//# sourceURL=webpack:///./src/js/Pipe.js?");

/***/ }),

/***/ "./src/js/Queue.js":
/*!*************************!*\
  !*** ./src/js/Queue.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Node = function Node(data, prev, next) {\n  _classCallCheck(this, Node);\n\n  this.data = data;\n  this.prev = prev;\n  this.next = next;\n};\n\nvar Queue =\n/*#__PURE__*/\nfunction () {\n  function Queue() {\n    _classCallCheck(this, Queue);\n\n    this.head;\n    this.tail;\n    this.size = 0;\n  }\n  /**\n   * Add to the end\n   * @param {*} data a Poipe\n   */\n\n\n  _createClass(Queue, [{\n    key: \"enqueue\",\n    value: function enqueue(data) {\n      this.size++;\n\n      if (!this.tail) {\n        var newNode = new Node(data, null, null);\n        this.head = newNode;\n        this.tail = newNode;\n      } else {\n        var _newNode = new Node(data, this.tail, null);\n\n        this.tail.next = _newNode;\n        this.tail = _newNode;\n      }\n    }\n    /**\n     * Remove from the front\n     */\n\n  }, {\n    key: \"dequeue\",\n    value: function dequeue() {\n      if (!this.head) return; // empty\n\n      this.size--;\n\n      if (this.head === this.tail) {\n        // one element\n        this.head = undefined; // check with null\n\n        this.tail = undefined; // check with null\n\n        return;\n      }\n\n      this.head = this.head.next;\n      this.head.prev = undefined;\n    }\n  }]);\n\n  return Queue;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Queue);\n\n//# sourceURL=webpack:///./src/js/Queue.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Bird__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bird */ \"./src/js/Bird.js\");\n/* harmony import */ var _AllPipes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AllPipes */ \"./src/js/AllPipes.js\");\n\n // Global variables\n\nwindow.canvas = document.getElementById('canvas');\nwindow.context = canvas.getContext(\"2d\"); // File scoped variables\n\nvar maxFPS = 60; // set to 10 and watch what happens\n\nvar backgroundImg = document.createElement('IMG');\nbackgroundImg.setAttribute('src', 'http://blog.itselectlab.com/wp-content/uploads/background.png');\nvar bird;\nvar allPipes;\nvar score = 0;\nvar lastFrameTimeMs = 0;\n\nfunction setup() {\n  bird = new _Bird__WEBPACK_IMPORTED_MODULE_0__[\"default\"](20, 200);\n  allPipes = new _AllPipes__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  window.requestAnimationFrame(mainLoop);\n}\n\nsetup();\n/**\n * Heartbeat of the game. Update and draw the game 60 times a second.\n * @param {*} timestamp\n */\n\nfunction mainLoop(timestamp) {\n  // const progress = timestamp - lastFrameTimeMs;\n  if (timestamp < lastFrameTimeMs + 1000 / maxFPS) {\n    window.requestAnimationFrame(mainLoop);\n    return;\n  }\n\n  lastFrameTimeMs = timestamp;\n  tick(); // update game state FIRST\n\n  render(); // THEN draw based on that state\n\n  window.requestAnimationFrame(mainLoop);\n}\n\nfunction touchingPipe(pipe) {\n  var xIsIntersecting = bird.x - 5 + bird.imgWidth >= pipe.x && bird.x - 5 + bird.imgWidth <= pipe.x + pipe.pipeWidth,\n      yIsIntersecting = bird.y < pipe.yTop || bird.y + bird.imgHeight > pipe.yBottom;\n  return xIsIntersecting && yIsIntersecting;\n}\n\nfunction isDead() {\n  var firstPipe = allPipes.pipes.head.data,\n      secondPipe = allPipes.pipes.head.next.data;\n  return touchingPipe(firstPipe) || touchingPipe(secondPipe);\n}\n/**\n * Update the current state of the game\n * @param {*} progress\n */\n\n\nfunction tick() {\n  if (isDead()) return;\n  if (Math.abs(bird.x + bird.imgWidth - (allPipes.pipes.head.data.x + allPipes.pipes.head.data.pipeWidth)) < 2) score++;\n  bird.tick();\n  allPipes.tick();\n}\n/**\n * Draw the current state of the world.\n */\n\n\nfunction render() {\n  // context.clearRect(0,0,window.innerWidth, window.innerHeight);\n  context.drawImage(backgroundImg, 0, 0, window.innerWidth, window.innerHeight);\n  bird.render();\n  allPipes.render();\n  context.font = '48px sans-serif';\n  context.fillStyle = \"#fff\";\n  context.fillText(score, window.innerWidth - 50, 80);\n} // Listen for clicks on desktop. touchstart on mobile\n\n\nwindow.addEventListener('keyup', function (event) {\n  if (event.keyCode === 32) // Spacebar\n    bird.flyUp();\n});\nwindow.addEventListener('touchstart', function () {\n  bird.flyUp();\n}); // resize the canvas to fill browser window dynamically\n\nwindow.addEventListener('resize', resizeCanvas, false);\n\nfunction resizeCanvas() {\n  canvas.width = window.innerWidth;\n  canvas.height = window.innerHeight;\n}\n\nresizeCanvas();\nvar audio = new Audio('http://files2.earmilk.com/upload/mp3/2012-04/Theophilus%20London%20Ft%20ASAP%20Rocky-Big%20Spender.mp3?_ga=2.259002762.1018058977.1556944267-758562653.1556944266');\nsetTimeout(function () {\n  audio.play();\n}, 500);\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });