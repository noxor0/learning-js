// Initial Setup;
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables;
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const gravity = .85;
const friction = .6;
const floor = 0;
const dxValue = 7;
const ballArray = [];

addEventListener('click', () => {
  skyFall()
});

addEventListener('resize', () => {
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
    const xDist = x2 - x1
    const yDist = y2 - y1

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

  this.update = function() {
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

    if (this.x + this.radius + this.dx > canvas.width ||
        this.x - this.radius + this.dx < 0) {
      this.dx = -this.dx;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }

  this.draw = function() {
    var gradStar = c.createRadialGradient(this.x, this.y, this.radius * .1,
                                          this.x, this.y, this.radius * 2);

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
  }

  this.spawnChildren = function() {
    for (let i = 0; i < randomIntFromRange(4, 8); i++) {
      var childRadius = 3
      var dxChild = randomIntFromRange(-dxValue, dxValue);
      var dyChild = randomIntFromRange(this.dy * .3, this.dy * .9);
      ballArray.push(new Ball(this.x, this.y, dxChild, dyChild, childRadius, 0));
    }
  }
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
  for (let i = 0; i < randomIntFromRange(1, 5); i++) {
    skyFall()
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
