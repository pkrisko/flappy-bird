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

/***/ "./src/js/DVDLogo.js":
/*!***************************!*\
  !*** ./src/js/DVDLogo.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n//Create image\nvar img = document.createElement('IMG'),\n    imgHeight = 60,\n    imgWidth = 80;\nimg.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/e/e7/DVD-Video_Logo.svg');\n\nvar DVDLogo =\n/*#__PURE__*/\nfunction () {\n  /**\n   * Constructor with default values of 50 for x and y.\n   * @param {number} x\n   * @param {mumber} y\n   */\n  function DVDLogo() {\n    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;\n    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;\n\n    _classCallCheck(this, DVDLogo);\n\n    this.x = x;\n    this.y = y;\n    this.xVel = 2;\n    this.yVel = 2;\n  }\n  /**\n   * Check to see if hitting wall first, then update current x and y\n   */\n\n\n  _createClass(DVDLogo, [{\n    key: \"tick\",\n    value: function tick() {\n      if (this.x >= window.innerWidth - imgWidth || this.x <= 0) this.xVel *= -1;\n      if (this.y >= window.innerHeight - imgHeight || this.y <= 0) this.yVel *= -1;\n      this.x += this.xVel;\n      this.y += this.yVel;\n    }\n    /**\n     * Draw a circle at the current position\n     */\n\n  }, {\n    key: \"render\",\n    value: function render() {\n      context.beginPath();\n      context.drawImage(img, this.x, this.y, imgWidth, imgHeight);\n      context.stroke();\n    }\n  }]);\n\n  return DVDLogo;\n}(); // Lets this be used by other files.\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (DVDLogo);\n\n//# sourceURL=webpack:///./src/js/DVDLogo.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DVDLogo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DVDLogo */ \"./src/js/DVDLogo.js\");\n // Global variables\n\nwindow.canvas = document.getElementById('canvas');\nwindow.context = canvas.getContext(\"2d\"); // File scoped variables\n\nvar dvdLogo;\nvar lastRender = 0;\n\nfunction setup() {\n  dvdLogo = new _DVDLogo__WEBPACK_IMPORTED_MODULE_0__[\"default\"](Math.floor(window.innerWidth / 2, window.innerHeight / 2));\n  window.requestAnimationFrame(loop);\n}\n\nsetup();\n\nfunction loop(timestamp) {\n  var progress = timestamp - lastRender;\n  tick(progress);\n  render();\n  lastRender = timestamp;\n  window.requestAnimationFrame(loop);\n}\n/**\n * Update the current state of the game\n * @param {*} progress\n */\n\n\nfunction tick(progress) {\n  dvdLogo.tick();\n}\n/**\n * Draw the current state of the world.\n */\n\n\nfunction render() {\n  context.clearRect(0, 0, window.innerWidth, window.innerHeight);\n  dvdLogo.render();\n} // resize the canvas to fill browser window dynamically\n\n\nwindow.addEventListener('resize', resizeCanvas, false);\n\nfunction resizeCanvas() {\n  canvas.width = window.innerWidth;\n  canvas.height = window.innerHeight;\n}\n\nresizeCanvas();\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });