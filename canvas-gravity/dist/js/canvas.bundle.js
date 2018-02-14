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

var gravity = 1;
var friction = .6;

addEventListener('click', function () {
  init();
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
function Ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = "rgba(224, 225, 255, 1)";
  this.glow = "rgba(224, 225, 255, .01)";

  this.update = function () {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
      this.radius /= 2;
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
    if (this.radius > 1) {
      var gradStar = c.createRadialGradient(this.x, this.y, this.radius / 2, this.x, this.y, this.radius * 2);

      gradStar.addColorStop(0, this.color);
      gradStar.addColorStop(1, this.glow);
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = gradStar;
      c.fill();
      c.closePath();
    }
  };
}

// Implementation;
var ballArray = void 0;
function init() {
  ballArray = [];
  for (var i = 0; i < 100; i++) {
    var radius = 10;
    var x = randomIntFromRange(radius, canvas.width - radius);
    var y = radius + 10;
    var dx = randomIntFromRange(-3, 3);
    var dy = randomIntFromRange(-2, 10);
    ballArray.push(new Ball(x, y, dx, dy, radius));
  }
}

// Animation Loop;
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  ballArray.forEach(function (ball) {
    ball.update();
  });
}

init();
animate();

/***/ })
/******/ ]);
//# sourceMappingURL=canvas.bundle.js.map