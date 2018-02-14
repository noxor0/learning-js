var canvas = document.getElementById('circleCanvas');

// Context
var ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var mouse = {
  x: undefined,
  y: undefined
}

var colorArray = [
  '#062F4F',
  '#126872',
  '#0b877D',
  '#18C29C',
  '#88F9D4',
];

window.addEventListener('mousemove',
  function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize',
  function (){
    init()
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.maxRadius = radius * 12;
  this.minRadius = radius;
  this.radius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill()
  }

  this.update = function() {
    if (this.x + this.radius > window.innerWidth ||this.x - this.radius < 0) {
      this.dx *= -1
    }
    if (this.y + this.radius > window.innerHeight ||this.y - this.radius < 0) {
      this.dy *= -1
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
    // mouse
    var growDist = this.maxRadius;
    if (mouse.x - this.x < growDist && mouse.x - this.x > -growDist
     && mouse.y - this.y < growDist && mouse.y - this.y > -growDist) {
       if (this.radius < this.maxRadius) {
         this.radius += 1;
       }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
  }
}

var circleArray = undefined;

function init() {
  circleArray = [];
  // Generate Circles
  var density = window.innerWidth * window.innerWidth / 1200
  for (var i = 0; i < density; i++) {
    var radius = Math.random() * 3 + 2;
    var x = Math.random() * (window.innerWidth - radius*2) + radius;
    var y = Math.random() * (window.innerHeight - radius*2) + radius;
    var dx = (Math.random() - .5) * 4;
    var dy = (Math.random() - .5) * 4;
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  circleArray.forEach(
    function(element) {
      element.update();
  });
}
init();
animate();

// =============================================================================
// Rect stuf
// ctx.fillStyle = 'rgba(255, 0, 0, .5)';
// ctx.fillRect(100, 100, 100, 100);
// ctx.fillStyle = 'rgba(0, 255, 0, .5)';
// ctx.fillRect(200, 200, 100, 100);
// ctx.fillStyle = 'rgba(0, 0, 255, .5)';
// ctx.fillRect(300, 300, 100, 100);

// Line stuff
// ctx.beginPath();
// ctx.moveTo(200, 200);
// ctx.lineTo(400, 200);
// ctx.strokeStyle = "#fa34a3";
// ctx.stroke();

// Circle stuff
// for (var i = 0; i < 5; i++) {
//   var x_pos = Math.random() * window.innerWidth;
//   var y_pos = Math.random() * window.innerHeight;
//   ctx.beginPath();
//   ctx.arc(x_pos, y_pos, 50, 0, 2*Math.PI, false);
//   ctx.strokeStyle = 'brown';
//   ctx.stroke();
// }
