var width, height;

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
			this.deltaX = -deltaX;
		}
		else if (x + deltaX < 0) {
			this.x = -x - deltaX;
			this.deltaX = -deltaX;
		} else this.x += deltaX;

		if (y + deltaY > height) {
			this.y = 2*height - y - deltaY;
			this.deltaY = -deltaY;
		}
		else if (y + deltaY < 0) {
			this.y = -y - deltaY;
			this.deltaY = -deltaY;
		} else this.y += deltaY;

		this.i++;
		// console.log({'i': this.i, 'x': this.x, 'y': this.y, 'deltaX': this.deltaX, 'deltaY': this.deltaY});
	}
}

document.addEventListener("DOMContentLoaded", () =>{

	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	var cty = c.getContext("2d");

	width = c.width;
	height = c.height;

	cty.rect(0, 0, 1000, 1000);
	cty.fillStyle = "rgb(255, 255, 255, 5%)";
	ctx.lineWidth = 5;


	document.addEventListener("click", () => {
	drawLine(ctx, pointArr);
	});

	let pointCount = 4;
	let pointArrArr = [makeArr(pointCount), makeArr(pointCount)];

	setInterval(() => {
		drawLine(ctx, pointArrArr[0], strokeStyle="rgb(3 252 219 / 100%)");
		drawLine(ctx, pointArrArr[1], strokeStyle="rgb(252 102 255 / 100%)");
	}, 5);


});

function drawLine (ctx, pointArr=[], strokeStyle="rgb(3 252 219 / 100%)") {
	
	ctx.fillStyle = "rgb(0 0 0 / 5%)";
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
		pointArr.push(new Point(f(width), f(height), f(5, 3), f(5, 3)));
	return pointArr;
}
