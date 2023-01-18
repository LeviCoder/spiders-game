
/*
    var img = ctx.getImageData(20, 40, 20, 20);
    ctx.putImageData(img, 0, 0);*/

try {

var Block, Pipe, p;
var grav = 0.4;

// {

var lvl = "one",
  blocksArr = [];
var maps = {
  "one": [
    [
      "###############",
      "#..S..........#",
      "#............##",
      "#...........#.#",
      "#..........#..#",
      "#.........#...#",
      "#........#....#",
      "#.......#....##",
      "#............A#",
      "###############",
    ],
    {"A": ["two", "B"], "S": ["two", "B"]},
  ],
  "two": [
    [
      "###########....",
      "#.....#...#....",
      "#....#.#..#....",
      "###...#...#####",
      "#B............#",
      "###############",
    ],
    {"B": ["one", "A"]}
  ],
};

var blockKeys = {
  "#": 0,
};

function fillLevel(l) {
  lvl = l;
  l = maps[l][0];

  var arr = [];
  for (var y = 0; y < l.length; y++) {
    arr.push([]);
    for (var x = 0; x < l[y].length; x++) {
      if(l[y][x] === p.spawn) {

        p.x = (x + 0.5)*bs;
        p.y = (y + 0.5)*bs;

        p.vx = 0;
        p.vy = 0;
        p.jump = false;
        p.onSpawn = 2;
      }
      if(maps[lvl][1][l[y][x]] !== undefined) {
        arr[y].push(new Pipe(x, y, l[y][x], maps[lvl][1][l[y][x]]))

      } else if (l[y][x] !== ".") {
        arr[y].push(new Block(x, y, l[y][x]));
      } else {
        arr[y].push(undefined);
      }
    }
  }

  return arr;
}



// } levels

// {

var bs = 30;

function coll(a, b) {
  return a.x < b.x + b.w &&
    a.y < b.y + b.h &&
    b.x < a.x + a.w &&
    b.y < a.y + a.h;
}

function init(ax, ay, bx, by, bw, bh) {
  return ax < bx + bw &&
    ay < by + bh &&
    bx < ax &&
    by < ay;
}


function checkBlocks(px, py, level, s) {
  var n = [],
    opx = px,
    opy = py;
  s = s || 2;

  px = ~~(px / bs);
  py = ~~(py / bs);

  for (var y = -s + py; y < s + py; y++) {
    if (y >= 0 && y < level.length) {

      for (var x = -s + px; x < s + px; x++) {
        if (x >= 0 && x < level[y].length && level[y][x] !== undefined) {
          var b = level[y][x];
          //println(b.x);
          n.push(b);
        }
      }

    }
  }


  return n;
}

function cc(that, px, py) {

  if (dist(that.x, that.y, px, py) < that.r) {
    var a = Math.atan2(that.x - px, that.y - py);

    that.x = px + Math.sin(a) * that.r;
    that.y = py + Math.cos(a) * that.r;

    if (a === Math.PI || a === 0) {
      that.vy = 0;
    }
    if (a > Math.PI*0.5 || a < -Math.PI*0.5) {
      that.vy *= 0.6;
      that.jump = true;

    }
    if (a === Math.PI*0.5 || a === -Math.PI*0.5) {
      that.vx = 0;
    }

    that.coll = true;
  }

}

function circCollide(that, blocks) {
  var skip = false;
  for (var i = 0; i < blocks.length; i++) {
    var px = constrain(that.x, blocks[i].x, blocks[i].x + blocks[i].w),
      py = constrain(that.y, blocks[i].y, blocks[i].y + blocks[i].h);

    if (blocks.solid && (px === that.x || py === that.y)) {
      cc(that, px, py);
      blocks.splice(i, 1);
    }
  }


  for (var i = 0; i < blocks.length; i++) {
    var px = constrain(that.x, blocks[i].x, blocks[i].x + blocks[i].w),
      py = constrain(that.y, blocks[i].y, blocks[i].y + blocks[i].h);

      if(!blocks[i].solid) {

        if(init(that.x, that.y, blocks[i].x, blocks[i].y, blocks[i].w, blocks[i].h)) {

  //console.log(blocks[i].pipe)
          blocks[i].onCollide(that);
        }

        //console.log(i)
      } else if(blocks[i].solid) {
      cc(that, px, py);
    }
  }
  //console.log(skip)
}

// } collision functions


// {
var Cam, Keys, Mouse, Scenes, Scene = "game",
  Trans, Images, ImageLoader;

Cam = {
  x: 0,
  y: 0,

  mx: 0,
  my: 0,

  drag: 0.1,

  update: function(x, y) {
    this.x = Math.lerp(x, this.x, this.drag);
    this.y = Math.lerp(y, this.y, this.drag);

    this.mx = mouseX + this.x;
    this.my = mouseY + this.y;
  },
};

Mouse = {
  click: false,
  rightClick: false,
  press: false,
};

function mousePressed(e) {
  console.log(e)
  //e.preventDefault();
  if (e.button === 2) {
    Mouse.rightClick = false;
  } else {
    Mouse.click = true;
    Mouse.press = true;
  }

};
function mouseReleased() {
  Mouse.press = false;
};
canvas.addEventListener("mousedown", mousePressed);
canvas.addEventListener("mouseup", mouseReleased);

Keys = {};
function keyPressed(e) {
  Keys[e.key] = true;
};
function keyReleased(e) {
  delete Keys[e.key];
};

canvas.addEventListener("keydown", keyPressed, false);
canvas.addEventListener("keyup", keyReleased, false);

Trans = {

  n: 0,
  to: "",

  set: function(scene, trans) {
    if (Scenes[scene] !== undefined) {
      if (trans === false) {
        Scene = this.to;
      } else if (this.n < 0.8) {
        this.to = scene;
      }
    } else {
      consol.log("Scenes[" + scene + "] is undefined");
    }
  },


  update: function() {

    if (this.to !== "") {
      this.n += 0.01;
      this.n *= 1.03;
    } else {
      this.n -= 0.01;
      this.n *= 0.97;
      this.n = constrain(this.n, 0, 1);
    }
    if (this.n >= 1) {
      Scene = this.to;
      this.to = "";
    }

    noStroke();
    fill(0, 0, 0, Trans.n * 255);
    rect(0, 0, width, height);
  },
};
ImageLoader = {
  keys: [],
  index: 0,

  once: true,
  pretty: function() {
    //pushStyle();

    noStroke();

    background(30);
    image(Images.example, 0, 0);

    fill(0, 50);
    rect(width * 0.25 - 2, height * 0.5 + 10, width * 0.5 + 4, 9, 5);

    fill(240);
    rect(width * 0.25, height * 0.5 + 12, width * 0.5 * (this.index / this.keys.length), 5, 5);

    textAlign(3, BOTTOM);
    textSize(20);
    Math.text("loading " + this.keys[this.index - 1] + "...", width * 0.5, height * 0.5 - 10);

    //popStyle();
  },
  load: function() {

    if (this.once) {
      this.once = false;
      this.keys = Object.keys(Images || {});
    }

    if (this.index < this.keys.length) {
      background(0, 0);

      var img = Images[this.keys[this.index]]();

      if (img === undefined) {
        img = get();
      } else if (!img instanceof PImage && typeof img === "object") {
        if (img.img === undefined) {
          img = get(img.x || 0, img.y || 0, img.w || width, img.h || height);
        } else {
          img = img.img;
        }
      }

      Images[this.keys[this.index]] = img;

      this.index++;
      this.pretty();
    } else {
      Trans.set("menu");
      Trans.n = 1;
      //println("set scene to menu or smth");
    }
  },
};

// } interaction and misc functions


// {
var p = {
  x: 200,
  y: 100,

  r: bs * 0.5,

  vx: 0,
  vy: 0,

  jump: false,
  coll: false,

  spawn: "S",
  isPlayer: true,
  onSpawn: 2,
};
p.draw = function() {
  fill(255, 0, 0);
  if(this.jump) {
    fill(50, 200, 50);
  }
  circle(this.x, this.y, this.r * 2);
  //rect(this.x - this.r, this.y - this.r, this.r*2, this.r*2)
};
p.move = function() {
  if (Keys.a || Keys.ArrowLeft) {
    this.vx = -2;
  }
  if (Keys.d || Keys.ArrowRight) {
    this.vx = 2;
  }

  if ((Keys.w || Keys.ArrowUp) && this.jump) {
    this.vy = -8;
    this.jump = false;
  }
};
p.update = function() {


  this.move();
  this.vy += grav;
  this.vy = constrain(this.vy, -100, 10);

  this.x += this.vx;
  this.y += this.vy;


  this.vx *= 0.5;
  this.jump = false;


  this.onSpawn = constrain(this.onSpawn - 1, -1, 5);

  circCollide(this, checkBlocks(this.x, this.y, blocksArr));


  this.draw();
  //console.log(this.onSpawn);

};

// } player object

// {

Block = function(x, y, type) {
  this.x = x * bs;
  this.y = y * bs;

  this.w = bs;
  this.h = bs;

  this.solid = true;
};
Block.prototype.draw = function() {
  fill(50, 53, 64);
  rect(this.x, this.y, this.w, this.h);
};

Pipe = function(x, y, pipe, data) {
  this.x = x * bs;
  this.y = y * bs;

  this.w = bs;
  this.h = bs;

  this.solid = false;
  this.toLevel = data[0];
  this.toPipe = data[1];
  this.pipe = pipe;
};
Pipe.prototype.onCollide = function(that) {
  console.log(this.pipe + " " + that.spawn + " " + that.onSpawn);
  if(that.spawn === this.pipe && that.onSpawn > 0) {
    that.onSpawn = 2;
  }
  if(that.onSpawn < 0) {
    console.log(this.pipe + ". " + this.toLevel + ": " + this.toPipe);
    that.spawn = this.toPipe;
    if(that.isPlayer) {
      blocksArr = fillLevel(this.toLevel);
    }
  }

  return that.spawn !== this.pipe;

};
Pipe.prototype.draw = function() {
  fill("lightgreen");
  rect(this.x, this.y, this.w, this.h);
};


// } block constructor

Images = {
  example: function() {

    /*var c1 = color(57, 106, 115);
    var c2 = color(0, 31, 97);
    noStroke();
    for (var i = 1; i > 0.1; i -= 0.01) {
      fill(60 - i * 40);
      ellipse(width * 0.5, height * 0.5, i * width * 1.43, i * width * 1.43);
    }*/

    return get();
  },
};
Scenes = {
  load: function() {
    ImageLoader.load();
  },
  menu: function() {
    background(240);
  },
  game: function() {
    background(250, 250, 250);

    pushMatrix();
    translate(-Cam.x, -Cam.y);


    fill(50, 53, 64);
    rect(-600, -300, 600, 900);
    rect(blocksArr[0].length * bs, -300, 600, 900);
    rect(0, blocksArr.length * bs, blocksArr[0].length * bs, 600);
    rect(0, -600, blocksArr[0].length * bs, 600);


    for (var y = 0; y < blocksArr.length; y++) {
      for (var x = 0; x < blocksArr[y].length; x++) {
        if (blocksArr[y][x]) {
          blocksArr[y][x].draw();

        }
      }
    }


    p.update();
    popMatrix();


    //line(300, 300, mouseX, mouseY);
    //println(atan2(mouseX - 300, mouseY - 300));
  },
};

blocksArr = fillLevel(lvl);

var frameCount = 0;
var intervalID = setInterval(function() {

  ctx.setTransform(1/3, 0, 0, 1/3, 0, 0);

  //println(Scene);
  Scenes[Scene]();

  Mouse.click = false;
  Mouse.rightClick = false;
  Trans.update();

  ctx.resetTransform();

  //console.log(frameCount);

  frameCount++;

  //println(Trans.n);

}, 1000 / 60);

} catch (e) {
  console.error(e);
}
