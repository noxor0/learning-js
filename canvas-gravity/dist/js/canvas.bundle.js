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


// Initial Setup;
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables;
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

var gravity = .85;
var friction = .6;
var floor = 0;
var dxValue = 7;
var ballArray = [];

addEventListener('click', function () {
  skyFall();
});

addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

// Utility Functions;
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Objects;
function Ball(x, y, dx, dy, radius, ballArray) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.ballArray = ballArray;
  this.color = "rgba(224, 225, 255, 1)";
  this.glow = "rgba(224, 225, 255, .09)";

  // this.glow = "rgba(40, 41, 56, 0)";

  this.update = function () {
    if (this.y + this.radius + this.dy > canvas.height - floor) {
      this.dy = -this.dy * friction;
      this.radius *= .6;
      if (ballArray) {
        // Parent
        this.spawnChildren();
      }
    } else {
      this.dy += gravity;
    }

    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0) {
      this.dx = -this.dx;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };

  this.draw = function () {
    var gradStar = c.createRadialGradient(this.x, this.y, this.radius * .1, this.x, this.y, this.radius * 2);

    gradStar.addColorStop(0, this.glow);
    gradStar.addColorStop(1, this.glow);
    c.beginPath();
    c.arc(this.x, this.y, this.radius * 1.3, 0, Math.PI * 2, false);
    c.fillStyle = this.glow;
    c.fill();
    c.closePath();

    gradStar.addColorStop(0, this.color);
    gradStar.addColorStop(.5, this.glow);
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = gradStar;
    c.fill();
    c.closePath();
  };

  this.spawnChildren = function () {
    for (var i = 0; i < randomIntFromRange(4, 8); i++) {
      var childRadius = 3;
      var dxChild = randomIntFromRange(-dxValue, dxValue);
      var dyChild = randomIntFromRange(this.dy * .3, this.dy * .9);
      ballArray.push(new Ball(this.x, this.y, dxChild, dyChild, childRadius, 0));
    }
  };
}

function skyFall() {
  var radius = randomIntFromRange(8, 16);
  var x = randomIntFromRange(radius, canvas.width - radius);
  var y = radius + 10;
  var dx = randomIntFromRange(-dxValue, dxValue);
  var dy = randomIntFromRange(10, 20);
  ballArray.push(new Ball(x, y, dx, dy, radius, ballArray));
}

function init() {
  for (var i = 0; i < randomIntFromRange(1, 5); i++) {
    skyFall();
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < ballArray.length; i++) {
    if (ballArray[i].radius < 1) {
      ballArray.splice(i, 1);
    }
    if (ballArray.length > 0) {
      ballArray[i].update();
    }
  }
}

setInterval(skyFall, 2000);
init();
animate();

/***/ })
/******/ ]);
//# sourceMappingURL=canvas.bundle.js.map