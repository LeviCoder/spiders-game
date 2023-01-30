var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d", {
  willReadFrequently: true
});

// {
var sprites = new Image()
sprites.src = "https://www.khanacademy.org/computer-programming/sprite-test/4636465623777280/6383278634614784.png";

var radioshack = new Image()
radioshack.src = "https://www.khanacademy.org/computer-programming/radio-shack/6492809897230336/6517821840605184.png";

var sky = ctx.createLinearGradient(0, 0, 0, 600)
sky.addColorStop(0, "rgb(33, 36, 51)");
sky.addColorStop(1, "rgb(97, 40, 49)");

var clr = "rgb(242, 92, 205)";

var mouseX = 0,
  mouseY = 0;
var width = 600,
  height = 600;

// } predefs etc



function constrain(n, min, max) {
  return n < min ? min : n > max ? max : n;
}

function dist(ax, ay, bx, by) {
  return Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by))
}

function lerp(a, b, n) {
  return a + (b - a) * n;
}

function random(min, max) {
  return min + (Math.random() * (max - min))
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

function rect(x, y, w, h) {
  ctx.fillRect(x, y, w, h);
}

function quad(x1, y1, x2, y2, x3, y3, x4, y4) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x4, y4);
  ctx.fill();
}

function triangle(x1, y1, x2, y2, x3, y3) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.fill();
}

function line(ax, ay, bx, by) {
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.stroke();
}

function circle(x, y, w) {
  ctx.beginPath();
  ctx.arc(x, y, w * 0.5, 0, Math.PI * 2);
  ctx.fill();
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


function scale(x, y) {
  ctx.scale(x, y)
}

function rotate(r) {
  ctx.rotate(Math.PI / 180 * r);
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


function image(img, x, y, w, h) {
  ctx.drawImage(sprites, img[0] * bs, img[1] * bs, img[2] * bs, img[3] * bs, x, y, w, h)
}


canvas.addEventListener("mousemove", function(e) {
  //console.log(e)
  mouseX = e.offsetX;
  mouseY = e.offsetY;
});
