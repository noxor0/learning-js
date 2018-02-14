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

const gravity = 1;
const friction = .6;

addEventListener('click', () => {
  init();
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
function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = "rgba(224, 225, 255, 1)";
    this.glow = "rgba(224, 225, 255, .01)";

  this.update = function() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
      this.radius /= 2
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
    if(this.radius > 1){
      var gradStar = c.createRadialGradient(this.x, this.y, this.radius / 2,
                                            this.x, this.y, this.radius * 2);

      gradStar.addColorStop(0, this.color);
      gradStar.addColorStop(1, this.glow);
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = gradStar;
      c.fill();
      c.closePath();
    }
  }
}

// Implementation;
let ballArray;
function init() {
  ballArray = []
  for (let i = 0; i < 100; i++) {
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
    ballArray.forEach(ball => {
      ball.update();
    });
}

init();
animate();
