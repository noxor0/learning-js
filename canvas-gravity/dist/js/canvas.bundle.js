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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Const Variables
var INTERVAL_TIME = 2000,
    GRAVITY = .85,
    FRICTION = .6,
    FLOOR_SIZE = 100,
    STAR_REDUCTION = .6,
    DX_VALUE = 7,
    OBJECTS_ARRAY = [],
    STAR_COLOR = "rgba(224, 225, 255, 1)",
    STAR_GLOW = "rgba(224, 225, 255, .09)",
    FLOOR_COLOR = "rgb(30, 35, 38)",
    LOWER_FLOOR_COLOR = "rgb(20, 20, 20)";

// Init Setup
var CANVAS = document.querySelector('canvas');
var CTX = CANVAS.getContext('2d');
CANVAS.width = innerWidth;
CANVAS.height = innerHeight;

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Ball(x, y, dx, dy, radius, OBJECTS_ARRAY) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.OBJECTS_ARRAY = OBJECTS_ARRAY;

  this.update = function () {
    // Hits the floor
    if (this.y + this.radius + this.dy > CANVAS.height - FLOOR_SIZE) {
      this.dy = -this.dy * FRICTION;
      this.radius *= STAR_REDUCTION;
      // Only parent should spawn children
      if (OBJECTS_ARRAY) {
        this.spawnChildren();
      }
    } else {
      this.dy += GRAVITY;
    }

    if (this.x + this.radius + this.dx > CANVAS.width || this.x - this.radius + this.dx < 0) {
      this.dx = -this.dx;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };

  this.draw = function () {
    var gradStar = CTX.createRadialGradient(this.x, this.y, this.radius * .1, this.x, this.y, this.radius * 2);

    gradStar.addColorStop(0, STAR_GLOW);
    gradStar.addColorStop(1, STAR_GLOW);
    CTX.beginPath();
    CTX.arc(this.x, this.y, this.radius * 1.3, 0, Math.PI * 2, false);
    CTX.fillStyle = STAR_GLOW;
    CTX.fill();
    CTX.closePath();

    gradStar.addColorStop(0, STAR_COLOR);
    gradStar.addColorStop(.5, STAR_GLOW);
    CTX.beginPath();
    CTX.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    CTX.fillStyle = gradStar;
    CTX.fill();
    CTX.closePath();
  };

  this.spawnChildren = function () {
    for (var i = 0; i < randomIntFromRange(4, 8); i++) {
      var childRadius = 3;
      var dxChild = randomIntFromRange(-DX_VALUE, DX_VALUE);
      var dyChild = randomIntFromRange(this.dy * .3, this.dy * .9);
      OBJECTS_ARRAY.push(new Ball(this.x, this.y, dxChild, dyChild, childRadius, 0));
    }
  };
}

function Floor() {
  this.x = 0;
  this.y = CANVAS.height - FLOOR_SIZE;

  this.draw = function () {
    var gradFloor = CTX.createLinearGradient(0, CANVAS.height, 0, this.y);
    gradFloor.addColorStop(0, LOWER_FLOOR_COLOR);
    gradFloor.addColorStop(1, FLOOR_COLOR);
    CTX.fillStyle = gradFloor;
    CTX.fillRect(this.x, this.y, CANVAS.width, FLOOR_SIZE);
  };

  this.update = function () {
    this.draw();
  };
}

function skyFall() {
  var radius = randomIntFromRange(8, 16);
  var x = randomIntFromRange(radius, CANVAS.width - radius);
  var y = radius;
  var dx = randomIntFromRange(-DX_VALUE, DX_VALUE);
  var dy = randomIntFromRange(10, 20);
  OBJECTS_ARRAY.push(new Ball(x, y, dx, dy, radius, OBJECTS_ARRAY));
}

function init() {
  OBJECTS_ARRAY.length = 0;
  OBJECTS_ARRAY.push(new Floor());
  for (var i = 0; i < randomIntFromRange(1, 5); i++) {
    skyFall();
  }
}

function animate() {
  requestAnimationFrame(animate);
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

  for (var i = 0; i < OBJECTS_ARRAY.length; i++) {
    if (OBJECTS_ARRAY[i].radius < 1) {
      OBJECTS_ARRAY.splice(i, 1);
    }
    if (typeof OBJECTS_ARRAY[i] != 'undefined') {
      OBJECTS_ARRAY[i].update();
    }
  }
}

setInterval(skyFall, INTERVAL_TIME);
init();
animate();

addEventListener('click', function () {
  skyFall();
});

addEventListener('resize', function () {
  CANVAS.width = innerWidth;
  CANVAS.height = innerHeight;
  init();
});

/***/ })
/******/ ]);
//# sourceMappingURL=canvas.bundle.js.map