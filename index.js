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

		if (x + deltaX > 1000) {
			this.x = 2000 - x - deltaX;
			this.deltaX = -deltaX;
		}
		else if (x + deltaX < 0) {
			this.x = -x - deltaX;
			this.deltaX = -deltaX;
		} else this.x += deltaX;

		if (y + deltaY > 1000) {
			this.y = 2000 - y - deltaY;
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

	cty.rect(0, 0, 1000, 1000);
	cty.fillStyle = "rgb(255, 255, 255, 5%)";

	let pointArr = [];
	let pointCount = 4;
	for (let i=0; i<pointCount; i++) 
		pointArr.push(new Point(f(1000), f(1000), f(10, 5), f(10, 5)));

	document.getElementById("myButton").addEventListener("click", () => {
	for (let i=0; i<100; i++)
		drawLine(ctx, pointArr);
	});

	document.addEventListener("click", () => {
	drawLine(ctx, pointArr);
	});

	setInterval(() => {drawLine(ctx, pointArr)}, 100);

});

function drawLine (ctx, pointArr=[]) {
	
	ctx.strokeStyle = "rgb(0 0 255 / 10%)";
	ctx.beginPath();
	ctx.moveTo(pointArr[0].x, pointArr[0].y);
	pointArr[0].move();
	for (let i=1; i<pointArr.length; i++) {
		ctx.lineTo(pointArr[i].x, pointArr[i].y);
		pointArr[i].move();
	}
	ctx.lineTo(pointArr[0].x, pointArr[0].y);
	ctx.stroke();
	// console.log("AAAA");
}

function f(max, min=0) {
	return min+Math.floor(Math.random() * max);
}
