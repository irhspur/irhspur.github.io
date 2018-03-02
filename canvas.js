var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = "rgba(255, 0, 0, 0.5)"
// c.fillRect(100, 100, 100, 100)
// c.fillStyle = "rgba(0, 0, 255, 0.5)"
// c.fillRect(400, 100, 100, 100)

// console.log(canvas)

// // line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa34a3";
// c.stroke();

// // Arc / Circle
// for (var i = 0; i < 100; i++) {

// 	var x = Math.random() * window.innerWidth;
// 	var y = Math.random() * window.innerHeight;
	
// 	var colorR = getRandomInt(255);
// 	var colorG = getRandomInt(255);
// 	var colorB = getRandomInt(255);

// 	c.beginPath();
// 	c.arc(x, y, 30, 0, Math.PI * 2, false);
// 	c.strokeStyle = "rgba(" + colorR + ", "+ colorG +", "+ colorR +", 0.7)";

// 	c.stroke();
// }

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var mouse = {
	x: undefined,
	y: undefined
}
var maxRadius = 40;
var minRadius = 2;

var colorArray = [
	'#2c3e50',
	'#e74c3c',
	'#ecf0f1',
	'#3498db',
	'#298089'
];

window.addEventListener('mousemove', function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener('resize', function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
});

function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[getRandomInt(5)];

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}

	this.update = function() {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx; // Velocity
		this.y += this.dy;

		// interActivity
		if ( mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
			mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			if (this.radius < maxRadius){
				this.radius += 1;
			}
		} else if ( this.radius > this.minRadius ) {
			this.radius -= 1;
		}

		this.draw();
	}
}

var circleArray = [];
init();

// var circle = new Circle(200, 200, 3, 3, 30);

// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// var dx = (Math.random() - 0.5) * 8;
// var dy = (Math.random() - 0.5) * 8;
// var radius = 30;

function init() {
	
	circleArray = [];

	for (var i = 0; i < 800; i++) {
		var radius = Math.random() * 3 + 1; // 1 - 4
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5) * 2;
		var dy = (Math.random() - 0.5) * 2;
		circleArray.push(new Circle(x, y, dx, dy, radius))
	}
}
 
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	// circle.update();

	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
	// c.beginPath();
	// c.arc(x, y, radius, 0, Math.PI * 2, false);
	// c.strokeStyle = 'blue';
	// c.stroke();

	// if (x + radius > innerWidth || x - radius < 0) {
	// 	dx = -dx;
	// }

	// if (y + radius > innerHeight || y - radius < 0) {
	// 	dy = -dy;
	// }

	// x += dx; // Velocity
	// y += dy;
}

animate();











