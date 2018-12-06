let resizeReset = function() {
	w = canvasBody.width = window.innerWidth
	h = canvasBody.height = window.innerHeight
}
window.addEventListener("resize", function () {
	deBouncer()
})
let deBouncer = function () {
	clearTimeout(tid)
	tid = setTimeout(function () {
		resizeReset()
	}, delay)
}
const opts = {
	starColor: "rgb(200,200,200)",
	lineColor: "rgb(200,200,200)",
	starAmount: 2000,
	defaultSpeed: 0.0005,
	variantSpeed: 0,
	defaultRadius: 1,
	variantRadius: 0.5,
}
function setup() {
	stars = []
	resizeReset()
	for (let i = 0; i < opts.starAmount; i++) {
		stars.push(new Star());
	}
	window.requestAnimationFrame(loop);
}
function randomizeColor() {
	r = Math.floor(Math.random() * 255)
	g = Math.floor(Math.random() * 255)
	b = Math.floor(Math.random() * 255)
	return "rgb(" + r.toString() + "," + g.toString() + ',' + b.toString() + ')'
}

function loop() {	
	
	window.requestAnimationFrame(loop);
	drawArea.clearRect(0, 0, w, h);
	for (let i = stars.length - 1; i >= 0; i--) {
	  stars[i].draw()
		stars[i].update();
		if (stars[i].outOfBounds === true) {
			stars[i].reset();
		}
	}
	
	// console.log(zhat)
	
	// console.log(randomizeColor())
}
function getRandom (min, max) {
	return Math.random() * (max-min) + min
}
function oneInX () {
	
}
							
Star = function(xPos, yPos){
	this.outOfBounds = false 
	this.size = 0
	this.x = Math.random() * w
	this.y = Math.random() * h
	this.z = getRandom(0, 0.03)
	// this.color = randomizeColor()
	this.color = opts.starColor
	this.radius = opts.defaultRadius + Math.random() * opts.variantRadius		
	this.draw = function () { 
		drawArea.beginPath()
		drawArea.arc(this.x, this.y, this.radius*this.z*20, 0, Math.PI*2)
		drawArea.closePath()
		drawArea.fillStyle = this.color
		drawArea.fill()
	}
	this.update = function () {
		this.z += opts.defaultSpeed
		this.x += (this.x - w/2) * this.z
		this.y += (this.y - h/2) * this.z
		this.radius += opts.defaultRadius * 0.01
		if (this.x < 0 || this.x > w) this.outOfBounds = true;
		if (this.y < 0 || this.y > w) this.outOfBounds = true;
	}
	this.reset = function () {
		this.outOfBounds = false
		this.x = Math.random() * w
		this.y = Math.random() * h
		this.z = 0
		this.radius = opts.defaultRadius + Math.random() * opts.variantRadius
	}
}
const canvasBody = document.getElementById("canvas")
drawArea = canvasBody.getContext("2d")
let delay = 200, tid
rgb = opts.lineColor.match(/\d+/g)
resizeReset()
setup()
// this.colorArray = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
