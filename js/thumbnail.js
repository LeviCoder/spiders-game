

function drawThumbnail() {
  var canvas2 = document.getElementById("thumbnail");
  console.log(canvas2)

  ctx2 = canvas2.getContext("2d");



  var sky = ctx2.createLinearGradient(0, 0, 0, 600)
  sky.addColorStop(0, "rgb(33, 36, 51)");
  sky.addColorStop(0.8, "rgb(97, 40, 49)");
  sky.addColorStop(1, "black");

  ctx2.fillStyle = sky;
  ctx2.fillRect(0, 0, 600, 600);

  ctx2.fillStyle = "rgb(255, 255, 255)";
  ctx2.font = "144px Chango";
  ctx2.textAlign = "center";


  ctx2.font = "90px Chango";

  var t = "ssspiders";
  for (var i = 0; i < t.length; i++) {
    ctx2.save();
    ctx2.translate(300, 523);
    ctx2.rotate((i - 4) * 0.18);

    for (var j = 300; j < 360; j += 10) {
      ctx2.fillStyle = "rgba(255, 255, 255, " + (j * 0.002 - 0.6) + ")";
      ctx2.fillText(t[i], 0, -j);
    }
    ctx2.fillStyle = "rgb(255, 255, 255)";
    ctx2.fillText(t[i], 0, -368);
    ctx2.restore();
  }

  var level = [
    "##               ###",
    "#                  #",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "          ###       ",
    "     ###   #        ",
    "    #####        ",
    "       ##     ",
  ];


  ctx2.fillStyle = "black";

  function shadow(x, y, w, h, lx, ly) {

    ctx2.fillStyle = "rgba(0, 0, 0, " + 50 / 255 + ")";
    ctx2.beginPath();
    ctx2.moveTo(x, y);
    ctx2.lineTo(calcShadow(x, lx), calcShadow(y, ly));
    ctx2.lineTo(calcShadow(x + w, lx), calcShadow(y + h, ly));
    ctx2.lineTo(x + w, y + h);
    ctx2.fill();

    ctx2.beginPath();
    ctx2.moveTo(x + w, y);
    ctx2.lineTo(calcShadow(x + w, lx), calcShadow(y, ly));
    ctx2.lineTo(calcShadow(x, lx), calcShadow(y + h, ly));
    ctx2.lineTo(x, y + h);
    ctx2.fill();

    ctx2.fillStyle = "rgb(0, 0, 0)";
    ctx2.fillRect(x, y, w, h);
  }

  for (var i = 0; i < level.length; i++) {
    for (var j = 0; j < level[i].length; j++) {
      if (level[i][j] !== " ") {
        shadow(j * bs, i * bs, bs, bs, 220, 240);
      }
    }
  }

  ctx2.save();
  ctx2.translate(220 + bs * 0.5, 240 + bs * 0.5);
  ctx2.scale(2, 2);
  ctx2.fillStyle = "rgb(100, 100, 100)";
  ctx2.beginPath();
  ctx2.arc(-3, 8, 8.5, 0, Math.PI * 2);
  ctx2.fill();

  ctx2.fillStyle = "white";
  ctx2.beginPath();
  ctx2.arc(1, -2, 10, 0, Math.PI * 2);
  ctx2.fill();

  ctx2.fillRect(-5, -17, 6, 10);

  ctx2.fillStyle = "black";
  ctx2.beginPath();
  ctx2.arc(4, 0, 4, 0, Math.PI * 2);
  ctx2.fill();

  ctx2.restore();



  function leg(x, y) {

    for (var i = 0; i < 3; i++) {
      ctx2.beginPath();
      ctx2.lineWidth = (3 - i) * 3
      ctx2.moveTo(x, y);
      x += random(-20, 20) + (220 - x) * 0.1;
      y += random(-30, -80);
      ctx2.lineTo(x, y);
      ctx2.stroke();
    }

  }

  for (var i = -50; i < 650; i += 30) {
    leg(i, 600);
  }

}
