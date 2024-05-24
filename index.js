var width = 1280,
	_width = width, // useless if not using Lively
	height = 1024,
	_height = height, // useless if not using Lively
	shape1color = `111 210 247`, 
	shape2color = `247 156 214`, 
	fillOpacity = 3;
	isPortrait = false; // useless if not using Lively

class Point {
	constructor (x, y, deltaX, deltaY) {
		this.x=x;
		this.y=y;
		this.deltaX=deltaX;
		this.deltaY=deltaY;
		this.i=0;
	}
	move() {
		let x = this.x;
		let y = this.y;
		let deltaX = this.deltaX;
		let deltaY = this.deltaY;

		if (x + deltaX > width) {
			this.x = 2*width - x - deltaX;

			this.deltaX = -f(4, 2);
		}
		else if (x + deltaX < 0) {
			this.x = -x - deltaX;
			this.deltaX = f(4, 2);
		} else this.x += deltaX;

		if (y + deltaY > height) {
			this.y = 2*height - y - deltaY;
			this.deltaY = -f(4, 2);
		}
		else if (y + deltaY < 0) {
			this.y = -y - deltaY;
			this.deltaY = f(4, 2);
		} else this.y += deltaY;

		this.i++;
		// console.log({'i': this.i, 'x': this.x, 'y': this.y, 'deltaX': this.deltaX, 'deltaY': this.deltaY});
	}
}

document.addEventListener("DOMContentLoaded", () =>{

	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	width = c.width;
	height = c.height;
	ctx.lineWidth = 5;


	ctx.fillStyle = "rgb(15 15 15 / 100%)";
	ctx.fillRect(0, 0, width, height);
	ctx.fillStyle = `rgb(0 0 0 / ${fillOpacity}%)`;
	ctx.lineJoin = "round";

	document.addEventListener("click", () => {
	drawLine(ctx, pointArr);
	});

	let pointCount = 4;
	let pointArrArr = [makeArr(pointCount), makeArr(pointCount)];

	setInterval(() => {
		drawLine(ctx, pointArrArr[0], strokeStyle=`rgb(${shape1color} / 100%)`);
		drawLine(ctx, pointArrArr[1], strokeStyle=`rgb(${shape2color} / 100%)`);
	}, 10);


});

function drawLine (ctx, pointArr=[], strokeStyle="rgb(3 252 219 / 100%)") {

	ctx.fillRect(0, 0, width, height);

	ctx.strokeStyle = strokeStyle;
	ctx.beginPath();
	ctx.moveTo(pointArr[0].x, pointArr[0].y);
	for (let i=1; i<pointArr.length; i++) {
		ctx.lineTo(pointArr[i].x, pointArr[i].y);
		pointArr[i].move();
	}
	ctx.lineTo(pointArr[0].x, pointArr[0].y);
	pointArr[0].move();
	ctx.stroke();
	// console.log("AAAA");
}

function f(max, min=0) {
	return min+Math.floor(Math.random() * max);
}

function makeArr(pointCount = 4) {
	let pointArr = [];
	for (let i=0; i<pointCount; i++) 
		pointArr.push(new Point(f(width), f(height), f(4, 2), f(4, 2)));
	return pointArr;
}

// From this point on, it's just Lively Wallpaper specific

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
		`${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
	: null;
}

function livelyPropertyListener(name, val) {
	switch(name) {
		case "shadow":
			fillOpacity = 100 - val;
			break;
		case "shape1color":
			shape1color = hexToRgb(val);
			break;

		case "shape2color":
			shape2color = hexToRgb(val);
			break;

		case "resolution":
			_width = val;
			_height = val;
			updateResolution();
			break;

		case "isPortrait":
			isPortrait = val;
			updateResolution();
			break;
	}
}

function updateResolution() {
	if (isPortrait === true) {
		height = _widht;
		width = _height;
	}
	else {
		height = _height;
		width = _width;
	}
	c.width = width;
	c.height = height;
}
