var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var mouseX = 0,
  mouseY = 0;
var width = 600,
  height = 600;



function constrain(n, min, max) {
  return n < min ? min : n > max ? max : n;
}
function dist(ax, ay, bx, by) {
  return Math.sqrt((ax - bx)*(ax - bx) + (ay - by)*(ay - by))
}
function lerp(a, b, n) {
  return a + (b - a)*n;
}

function background(r, g, b, a) {
  ctx.save();
  if (a !== undefined) {
    ctx.fillStyle = "rgba(" + [r, g, b, a / 255].join(", ") + ")";
  } else if (b !== undefined) {
    ctx.fillStyle = "rgb(" + [r, g, b].join(", ") + ")";
  } else {
    ctx.fillStyle = r;
  }
  ctx.fillRect(0, 0, width, height)
  ctx.restore();
}

function rect(x, y, w, h, r) {
  if (r) {
    roundedRect(ctx, x, y, w, h, r)
  } else {
    ctx.fillRect(x, y, w, h);
  }
}

function quad(x1, y1, x2, y2, x3, y3, x4, y4) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x4, y4);
  ctx.fill();
}

function ellipse(x, y, w, h, r) {
  ctx.ellipse(x, y, w, h, r || 0, 0, Math.PI)
}

function circle(x, y, w) {
  ctx.beginPath();
  ctx.arc(x, y, w*0.5, 0, Math.PI*2);
  ctx.fill();
}

function line(ax, ay, bx, by) {
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.stroke();
}


function stroke(r, g, b, a) {
  if (a !== undefined) {
    ctx.strokeStyle = "rgba(" + [r, g, b, a / 255].join(", ") + ")";
  } else if (b !== undefined) {
    ctx.strokeStyle = "rgb(" + [r, g, b].join(", ") + ")";
  } else {
    ctx.strokeStyle = r;
  }
}

function noStroke() {
  ctx.strokeStyle = "rgba(0, 0, 0, 0)"
}

function strokeWeight(n) {
  ctx.lineWidth = n;
}

function fill(r, g, b, a) {
  if (a !== undefined) {
    ctx.fillStyle = "rgba(" + [r, g, b, a / 255].join(", ") + ")";
  } else if (b !== undefined) {
    ctx.fillStyle = "rgb(" + [r, g, b].join(", ") + ")";
  } else {
    ctx.fillStyle = r;
  }
}

function noFill() {
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
}


function text(msg, x, y) {
  ctx.fillText(msg, x, y)
}


function translate(x, y) {
  ctx.translate(x, y)
}

function pushMatrix() {
  ctx.save();
}

function popMatrix() {
  ctx.restore();
}

function scale(x, y) {
  ctx.scale(x, y)
}

function rotate(r) {
  ctx.rotate(Math.PI / 180 * r);
}


function get(x, y, w, h) {
  ctx.getImageData(x, y, w, h);
}

function image(img, x, y) {
  ctx.putImageData(img, x, y);
}


canvas.addEventListener("mousemove", function(e) {
  //console.log(e)
  mouseX = e.offsetX;
  mouseY = e.offsetY;
});

/*
function () {

}
*/



/*

3	size
3	P2D
125	line
128	ellipse
253	mouseX
504	mouseY
263	mousePressed
264	mouseButton
264	RIGHT
272	mouseReleased
277	keyPressed
278	key
278	keyCode
280	keyReleased
329	pushStyle
333	background
342	textAlign
342	BOTTOM
343	textSize
346	popStyle
459	color
511	draw

*/
