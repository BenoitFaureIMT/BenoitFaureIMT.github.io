//Canvas info
var c = document.getElementById("foreground_canvas");
var ctx = c.getContext("2d");
var w = 0;
var h = 0;
//Elements info
const rec1 = document.getElementById('rec1').getBoundingClientRect();
const rec2 = document.getElementById('rec2').getBoundingClientRect();
//Triangles
numberOfTriRow = 200;
var halfS = 0;
var outCol = '#FFD700';
var inCol = "#000000";
var triVert = 1 / (2**0.5)

//---------------------------Utility functions--------------------------
function resize(){
	w = window.innerWidth;
	h = window.innerHeight;

	ctx.canvas.width  = w;
  	ctx.canvas.height = h;

  	// main();
 }

 function drawTriTop(bx, by, hs, v){
	var lineWidth = 1;
	var o = lineWidth / 2

	ctx.beginPath();
	ctx.moveTo(bx, by + o);
	var byp = by + v;
	ctx.lineTo(bx - hs + o, byp - o);
	ctx.lineTo(bx + hs - o, byp - o);
	ctx.closePath();
	
	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = outCol;
	ctx.stroke();

	ctx.fillStyle = inCol;
	ctx.fill();
 }

 function drawTriBot(bx, by, hs, v){
	var lineWidth = 2;
	var o = lineWidth / 2

	ctx.beginPath();
	ctx.moveTo(bx + o, by + o);
	ctx.lineTo(bx + hs + hs - o, by + o);
	var byp = by + v;
	ctx.lineTo(bx + hs + o, byp - o);
	ctx.closePath();
	
	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = outCol;
	ctx.stroke();

	ctx.fillStyle = inCol;
	ctx.fill();
 }

 function isIn(x, y, t, b, l, r){
	return x > l && x < r && y > t && y < b;
 }

 function checkAllIn(x, y){
	return isIn(x, y, rec1.top, rec1.bottom * 1.2 - rec1.top * 0.2, rec1.left, rec1.right) || isIn(x, y, rec2.top, rec2.bottom * 1.7 - rec2.top * 0.7, rec2.left, rec2.right)
 }

//-------------------------Main functions-------------------------------
function main(){
	var vertHeight = halfS*2*triVert;
	var s = halfS * 2;
	for(let y = 0; y < h; y+=vertHeight){
		for (let x = -1 * halfS * (1 - (y/vertHeight % 2)); x <= w; x+=s){
			if (!checkAllIn(x + s, y)){
				drawTriTop(x, y, halfS, vertHeight);
				drawTriBot(x, y, halfS, vertHeight);
			}
		}
	}

	// a = rec1.top;
	// b = rec1.bottom * 1.2 - rec1.top * 0.2;
	// c = rec1.left;
	// d = rec1.right;
	// ctx.beginPath();
	// ctx.moveTo(c, a);
	// ctx.lineTo(d, a);
	// ctx.lineTo(d, b);
	// ctx.lineTo(c, b);
	// ctx.closePath();

	// ctx.lineWidth = 2;
	// ctx.strokeStyle = outCol;
	// ctx.stroke();

	// a = rec2.top;
	// b = rec2.bottom * 1.7 - rec2.top * 0.7;
	// c = rec2.left;
	// d = rec2.right;
	// ctx.beginPath();
	// ctx.moveTo(c, a);
	// ctx.lineTo(d, a);
	// ctx.lineTo(d, b);
	// ctx.lineTo(c, b);
	// ctx.closePath();

	ctx.lineWidth = 2;
	ctx.strokeStyle = outCol;
	ctx.stroke();
}

resize();
halfS = parseInt(w/numberOfTriRow);
main();