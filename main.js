let resizeReset = function() {
	w = canvasBody.width = window.innerWidth;
	h = canvasBody.height = window.innerHeight;
}
let deBouncer = function () {
	clearTimeout(tid);
	tid = setTimeout(function () {
		resizeReset();
	}, delay);
};
const opts = {
	particleColor: "rgb(200,200,200)",
	lineColor: "rgb(200,200,200)",
	particleAmount: 100,
	defaultSpeed: 1,
	variantSpeed: 0,
	defaultRadius: 1,
	variantRadius: 0,
};
function setup() {
	particles = [];
	resizeReset();
	for (let i = 0; i < opts.particleAmount; i++) {
		particles.push(new Particle());
	}
	window.requestAnimationFrame(loop);
}
function loop() {
	window.requestAnimationFrame(loop);
	drawArea.clearRect(0, 0, w, h);
	for (let i = 0; i < particles.length; i++) {
		particles[i].update();
		particles[i].draw();
	}
}

window.addEventListener("resize", function(){
	deBouncer();
});

Particle = function(xPos, yPos){ 
	this.x = Math.random() * w; 
	this.y = Math.random() * h;
	this.z = Math.random();
	this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed; 
	this.directionAngle = Math.floor(Math.random() * 360); 
	this.color = opts.particleColor;
	this.radius = opts.defaultRadius + Math.random() * opts. variantRadius; 
	this.vector = {
		x: Math.cos(this.directionAngle) * this.speed,
		y: Math.sin(this.directionAngle) * this.speed
	};
	this.update = function(){ 
		this.border(); 
		this.x += this.vector.x; 
		this.y += this.vector.y; 
	};
	this.border = function(){ 
		if (this.x >= w || this.x <= 0) { 
			this.vector.x *= -1;
		}
		if (this.y >= h || this.y <= 0) {
			this.vector.y *= -1;
		}
		if (this.x > w) this.x = w;
		if (this.y > h) this.y = h;
		if (this.x < 0) this.x = 0;
		if (this.y < 0) this.y = 0;	
	};
	this.draw = function(){ 
		drawArea.beginPath();
		drawArea.arc(this.x, this.y, this.radius*this.z, 0, Math.PI*2);
		drawArea.closePath();
		drawArea.fillStyle = this.color;
		drawArea.fill();
	};
};

const canvasBody = document.getElementById("canvas"),
drawArea = canvasBody.getContext("2d");
let delay = 200, tid,
rgb = opts.lineColor.match(/\d+/g);
resizeReset();
setup();