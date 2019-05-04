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

/***/ "./src/js/Bird.js":
/*!************************!*\
  !*** ./src/js/Bird.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n//Create image\nvar img = document.createElement('IMG');\nimg.setAttribute('src', 'https://www.pngkey.com/png/full/50-502247_flappy-bird-no-background.png'); //Other Static variables\n\nvar gravity = 0.8,\n    imgHeight = 30,\n    imgWidth = 40,\n    toRadians = Math.PI / 180,\n    yMax = window.innerHeight - imgHeight;\n\nvar Bird =\n/*#__PURE__*/\nfunction () {\n  /**\n   * Constructor with default values of 50 for x and y.\n   * @param {number} x\n   * @param {mumber} y\n   */\n  function Bird() {\n    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;\n    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;\n\n    _classCallCheck(this, Bird);\n\n    this.x = x;\n    this.y = y;\n    this.lift = -25;\n    this.velocity = 0;\n  }\n\n  _createClass(Bird, [{\n    key: \"flyUp\",\n    value: function flyUp() {\n      if (this.velocity < -20) {\n        // If we're already flying up\n        this.velocity += -5;\n      } else {\n        this.velocity += this.lift;\n      }\n    }\n    /**\n     * Add gravity, and then check to see if hitting wall. Don't let the bird\n     * fly out of bounds.\n     */\n\n  }, {\n    key: \"tick\",\n    value: function tick() {\n      this.velocity += gravity;\n      this.y += this.velocity;\n      if (this.y >= yMax) // TODO: Add gameover condition\n        this.y = yMax;\n      if (this.y <= 0) this.y = 0;\n    }\n    /**\n     * Draw a flappy ol' bird at the current position\n     */\n\n  }, {\n    key: \"render\",\n    value: function render() {\n      context.drawImage(img, this.x, this.y, imgWidth, imgHeight);\n    }\n  }]);\n\n  return Bird;\n}(); // Lets this be used by other files.\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Bird);\n\n//# sourceURL=webpack:///./src/js/Bird.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Bird__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bird */ \"./src/js/Bird.js\");\n // Global variables\n\nwindow.canvas = document.getElementById('canvas');\nwindow.context = canvas.getContext(\"2d\"); // File scoped variables\n\nvar maxFPS = 60; // set to 10 and watch what happens\n\nvar backgroundImg = document.createElement('IMG');\nbackgroundImg.setAttribute('src', 'http://blog.itselectlab.com/wp-content/uploads/background.png');\nvar bird;\nvar lastFrameTimeMs = 0;\n\nfunction setup() {\n  bird = new _Bird__WEBPACK_IMPORTED_MODULE_0__[\"default\"](40, 200);\n  window.requestAnimationFrame(mainLoop);\n}\n\nsetup();\n/**\n * Heartbeat of the game. Update and draw the game 60 times a second.\n * @param {*} timestamp\n */\n\nfunction mainLoop(timestamp) {\n  var progress = timestamp - lastFrameTimeMs;\n\n  if (timestamp < lastFrameTimeMs + 1000 / maxFPS) {\n    window.requestAnimationFrame(mainLoop);\n    return;\n  }\n\n  lastFrameTimeMs = timestamp;\n  tick(progress); // update game state FIRST\n\n  render(); // THEN draw based on that state\n\n  window.requestAnimationFrame(mainLoop);\n}\n/**\n * Update the current state of the game\n * @param {*} progress\n */\n\n\nfunction tick(progress) {\n  bird.tick();\n} // Listen for clicks on desktop. touchstart on mobile\n\n\nwindow.addEventListener('keyup', function (event) {\n  if (event.keyCode === 32) bird.flyUp();\n});\nwindow.addEventListener('touchstart', function () {\n  bird.flyUp();\n});\n/**\n * Draw the current state of the world.\n */\n\nfunction render() {\n  // context.clearRect(0,0,window.innerWidth, window.innerHeight);\n  context.drawImage(backgroundImg, 0, 0, window.innerWidth, window.innerHeight);\n  bird.render();\n} // resize the canvas to fill browser window dynamically\n\n\nwindow.addEventListener('resize', resizeCanvas, false);\n\nfunction resizeCanvas() {\n  canvas.width = window.innerWidth;\n  canvas.height = window.innerHeight;\n}\n\nresizeCanvas();\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });