
/*
    var img = ctx.getImageData(20, 40, 20, 20);
    ctx.putImageData(img, 0, 0);



    */

try {

var Block, Decor, Stick, Pipe, Rock, Spear, p;
var grav = 0.4;
var pings = [];

var collectableCount = 0;

var holders = [
  [6, 12, false],
  [7, 12, false],
  [8, 12, false],

  [11, 12, false],
  [12, 12, false],
  [13, 12, false],
];

// {

Ping = function(x, y) {
  this.x = x;
  this.y = y;
  this.r = 0;
}
Ping.prototype.update = function () {
  if(this.r < 150) {
    this.r += 5;

    stroke(255, 255, 255, 50);
    strokeWeight((1 - this.r/150)*7)
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
    ctx.stroke();
  } else {
    this.dead = true;
  }
};
function ping(x, y) {
  pings.push(new Ping(x, y));

  for(var i = 0; i < maps[lvl].spiders.length; i++) {
    //if(dist(x, y, maps[lvl].spiders[i].x, maps[lvl].spiders[i].y) < 300) {
      maps[lvl].spiders[i].seekX = x;
      maps[lvl].spiders[i].seekY = y;
    //}
  }
}

// } 'Ping' constructor


// {

var lvl = "a",
  blocksArr = [];
var maps = {
  "a": [
    [
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "     ##########     ",
      "    ############    ",
      "    ############    ",
      " gggggA######B      ",
      " ################## ",
      "####################",
    ],
    {
      "A": ["3a", "A", "right"],
      "B": ["4a", "A", "left"],
    }
  ],
  "0a": [
    [
      "####################",
      "####################",
      "####      #####  ###",
      "###        ###     A",
      "###        ###   ###",
      "###    ##   ##  ####",
      "####            ####",
      "####  ^^^^#     ####",
      "####  ######   #####",
      "#####   #####  #####",
      "#  ####   ####    ##",
      "#   ####   ###^^^E##",
      "#          ###### ##",
      "# ##   ########    B",
      "####  ###  ####   ##",
      "##### ###         ##",
      "#####  ###E ###  ###",
      "#####   ######   ###",
      "######         #####",
      "####################",
    ],
    {
      "A": ["1a", "B", "right"],
      "B": ["1b", "A", "right"],
    },
  ],

  "1a": [
    [
      "####################",
      "#############|l|ll##",
      "#########ll|l|E|  ##",
      "########lE | |     #",
      "########     |    ##",
      "########^     g    A",
      "#########^    #  ###",
      "##########gg     l##",
      "###ll#######      ##",
      "##gc |###ll       ##",
      "#####|lll     ##  |#",
      "#### |     ggg    |#",
      "###l       ###     #",
      "##l    gg   #      #",
      "## gg  ## |      ^^#",
      "Bgg##^  # |    ^^###",
      "######    |   ^#####",
      "######      ^^######",
      "######^^^^^^########",
      "####################",
    ],
    {
      "A": ["2a", "B", "right"],
      "B": ["0a", "A", "left"],
    },
  ],
  "1b": [
    [
      "####################",
      "#################  #",
      "#######   ###### E #",
      "##### | E  | ###   #",
      "####  |    |      ##",
      "###   |    |   #####",
      "###   | ## |   #####",
      "A     |    |   |####",
      "####  |    | | |####",
      "####  |      | | ###",
      "##### #      | |  ##",
      "##### |   |  |    ##",
      "##### |   |S |     B",
      "#### E|   |  |   ###",
      "####  |   |##|   ###",
      "###   |     | |   ##",
      "###^^^^^^^  | |   ##",
      "##########^^|^|^^^##",
      "####################",
      "####################",
    ],
    {
      "A": ["0a", "B", "left"],
      "B": ["2c", "A", "right"],
    },
  ],
  "1c": [
    [
      "####################",
      "### ||| ############",
      "##|E|||E#######  ###",
      "# | | |  ####      A",
      "# |  E| ##### #   ##",
      "#E|   |########## ##",
      "#   #  #########| ##",
      "#  E# | | | ####|###",
      "##  ##| |    ###|###",
      "#######       ##|###",
      "#####         ##| ##",
      "####|     c  ###| ##",
      "####|   ^^#^####| ##",
      "####  ######### | ##",
      "####  #########   ##",
      "#####   ######  ####",
      "#####     ##    ####",
      "######^        #####",
      "####################",
      "####################",
    ],
    {
      "A": ["2c", "B", "right"],
    },
  ],

  "2a": [
    [
      "###  | |        ####",
      "###  | |        ####",
      "### E| |         ###",
      "###  | |         ###",
      "####   |          A#",
      "####   |      ######",
      "###|   |       #####",
      "###|           |####",
      "##       ####  |E###",
      "##^^    ####|  | ###",
      "#####     # |    ###",
      "#####       |E|  ###",
      "### |         | ####",
      "##  ###       ######",
      "##  # |   ##########",
      "B     |  ###########",
      "###   |   ##########",
      "###   |    C########",
      "#####^^^^###########",
      "####################",
    ],
    {
      "A": ["3b", "A", "right"],
      "B": ["1a", "A", "left"],
      "C": ["2b", "A", "right"],
    },
  ],
  "2b": [
    [
      "##        ##########",
      "##        ####    ##",
      "##        ##A      #",
      "## E       ####    #",
      "##    ##  E ####   #",
      "##   ####    ###  ##",
      "##     #      ##   B",
      "###   ^       |  ###",
      "###   #    ## |  ###",
      "###S      ### |  ###",
      "####       |  | ####",
      "####       |    ####",
      "###   ###  |     ###",
      "###  ##### |     ###",
      "###   ##   |      ##",
      "###    #           C",
      "####       ^     ###",
      "####    E ^#^^^#####",
      "####^^^^^^##########",
      "####################",
    ],
    {
      "A": ["2a", "C", "left"],
      "B": ["3c", "B", "right"],
      "C": ["3d", "A", "right"],
    },
  ],
  "2c": [
    [
      "####################",
      "############   #####",
      "#####          | |##",
      "###|   S       | | #",
      "## |    ###    |   #",
      "## |  ########  E ##",
      "## | ##########    #",
      "##   ###########   #",
      "A   ##### | #####  #",
      "### ### |E| |#### ##",
      "##| ###   | |#### ##",
      "##| ###E  | |#### ##",
      "###  ##   #E|###  ##",
      "###  ######|| |    C",
      "###  ##### |  |  ###",
      "####  ###  |     ###",
      "###        |     ###",
      "##     ####|   #####",
      "B   ################",
      "####################",
    ],
    {
      "A": ["1b", "B", "left"],
      "B": ["1c", "A", "left"],
      "C": ["3d", "B", "right"],
    },
  ],

  "3a": [
    [
      "####################",
      "######A       ######",
      "########        ####",
      "##########        ##",
      "########### S     ##",
      "#############     ##",
      "####  | E#####   ###",
      "###|E |  #####   ###",
      "###   |  ####    ###",
      "### | |  |      ####",
      "####| E  |      ####",
      "#####    |     #####",
      "#####|   |     #####",
      "######   |   #######",
      "######   |  ########",
      "######   |  #### ###",
      "####              ##",
      "#### E        #   ##",
      "#####     ######B###",
      "####################",
    ],
    {
      "A": ["a", "A", "left"],
      "B": ["3b", "B", "down"],
    },
  ],
  "3b": [
    [
      "################B###",
      "###### #####      ##",
      "####    ###       ##",
      "## E    ###    #####",
      "##      ##      ####",
      "#           #   ####",
      "#      ######   ####",
      "#  ##   ###### E ###",
      "#^       ######  ###",
      "##^^^^#    ####  ###",
      "########    ###  ###",
      "##########   ##  ###",
      "###########      ###",
      "#########        ###",
      "########        ####",
      "####       #  ######",
      "##        ##^^######",
      "A         ##########",
      "###     ############",
      "####################",
    ],
    {
      "A": ["2a", "A", "left"],
      "B": ["3a", "B", "up"],
    }
  ],
  "3c": [
    [
      "####################",
      "####################",
      "##### |  ###########",
      "### | | E|  ########",
      "##  | #  |  ########",
      "#E  |    |   #| ####",
      "#   #    |    |  ###",
      "#             |  ###",
      "#     c       |   ##",
      "###  ###      | | ##",
      "#########     | | ##",
      "#############   | ##",
      "####  |#####    | ##",
      "###| E|| ##     | ##",
      "B  || |  ###    |  A",
      "#   | | | ##########",
      "#   |   |###########",
      "#S || ##############",
      "####################",
      "####################",
    ],
    {
      "A": ["4c", "A", "right"],
      "B": ["2b", "B", "left"],
    },
  ],
  "3d": [
    [
      "####################",
      "####################",
      "######    E ########",
      "###            #####",
      "##              ####",
      "A     |         ####",
      "###  ||  ||      ###",
      "### ###  ##  ||   ##",
      "##  ###  ##  ##   ##",
      "##  ##   ##  ##    C",
      "##^ ##   ##      ###",
      "### ##           ###",
      "### #        ##   ##",
      "###      ##  ##   ##",
      "##       ##  ##    #",
      "##   ##  ##  ## E  #",
      "B    ##  ##^ ##   ^#",
      "###^^## E###^##^^^##",
      "#######^^###########",
      "####################",
    ],
    {
      "A": ["2b", "C", "left"],
      "B": ["2c", "C", "left"],
      "C": ["4c", "D", "right"],
    },
  ],

  "4a": [
    [
      "####################",
      "###   A#############",
      "##   ###############",
      "#   ###| ###########",
      "#         ###|  ####",
      "##         | |E |###",
      "####       | |  |###",
      "####         |   ###",
      "###|  S ##    E  ###",
      "###|#######     ####",
      "###|######|  #######",
      "###|####  | ########",
      "## | |  E |#########",
      "## |      |#########",
      "#  |      |      ###",
      "#  |              B#",
      "#  |            ####",
      "## |           #####",
      "#####   ###^^^######",
      "####################",
    ],
    {
      "A": ["a", "B", "right"],
      "B": ["5a", "A", "right"],
    },
  ],
  "4b": [
    [
      "####################",
      "####### | E  |   ###",
      "######  |    |    ##",
      "######  |    |    ##",
      "##   #  |    |     A",
      "#       #### |   ###",
      "#      ######|   |##",
      "#      #######   |E#",
      "##    ########   | #",
      "###        ##|    ##",
      "###   ###    |##  ##",
      "###  #####   | |  ##",
      "###  ########  |  ##",
      "## S##| ##|#   | ###",
      "##### |   |    | ###",
      "####  |E  |    | ###",
      "####  |   |    |  ##",
      "##### |  E|    |   B",
      "########  |   ######",
      "####################",
    ],
    {
      "A": ["5a", "B", "right"],
      "B": ["5b", "A", "right"],
    },
  ],
  "4c": [
    [
      "####################",
      "#########   ########",
      "###  #### E  ##   ##",
      "##    ####   #     B",
      "A        ##     ####",
      "##             #####",
      "####         #######",
      "#####      #########",
      "####################",
      "#######| ###########",
      "###### |  ##### ####",
      "#####  |S###### # ##",
      "####   |#####      C",
      "## #   |   #      ##",
      "##     |         ###",
      "##            ^#####",
      "D           ########",
      "###       #^########",
      "#####^^^############",
      "####################",
    ],
    {
      "A": ["3c", "A", "left"],
      "B": ["5c", "A", "right"],
      "C": ["5d", "A", "right"],
      "D": ["3d", "C", "left"],
    },
  ],

  "5a": [
    [
      "####################",
      "##    ##############",
      "#          #########",
      "##          |#######",
      "A           | ######",
      "###         |E #####",
      "##  ##|        |####",
      "##  ^#|#       |####",
      "##^^##|#^^#    | ###",
      "#####E|#####   | ###",
      "######|#####     ###",
      "######| #####    ###",
      "##### | ######   ###",
      "##### |   ###|   ###",
      "##           |   ###",
      "B               ####",
      "###             ####",
      "###S    ##     #####",
      "#####^^###^^^#######",
      "####################",
    ],
    {
      "A": ["4a", "B", "left"],
      "B": ["4b", "A", "left"],
    },
  ],
  "5b": [
    [
      "####################",
      "####################",
      "####################",
      "#####E|#############",
      "####  || ###########",
      "A      | |##########",
      "##       | | | #####",
      "####     | | |  ####",
      "#####    |   |  ####",
      "######## |   #   ###",
      "########         ###",
      "####               B",
      "###             ####",
      "###S c    #^^^######",
      "#### #  ############",
      "####################",
      "####################",
      "####################",
      "####################",
      "####################",
    ],
    {
      "A": ["4b", "B", "left"],
      "B": ["6a", "A", "right"],
    },
  ],
  "5c": [
    [
      "####################",
      "##############   |##",
      "#############    |##",
      "#############  ##|##",
      "############# ###|##",
      "############# ###|##",
      "#######| | ## ###|##",
      "#####| | | |# ###|##",
      "#### | |    | #    B",
      "#### | |    | |  ###",
      "####        ||| ####",
      "####       | | E####",
      "####       | |  ####",
      "###        | |  ####",
      "A   S S    | |E#####",
      "########   |########",
      "####################",
      "####################",
      "####################",
      "####################",
    ],
    {
      "A": ["4c", "B", "left"],
      "B": ["6b", "B", "right"],
    },
  ],
  "5d": [
    [
      "#####################",
      "#####################",
      "###         #########",
      "##            #######",
      "##             ######",
      "A              #####",
      "###             ####",
      "###  ###         ###",
      "###   |   ###    ###",
      "##    |   ||      ##",
      "##    |   ||  ##  ##",
      "##  | ||   |  |    B",
      "##   E||      |  ###",
      "##^    | |    |  ###",
      "###    |     E   ###",
      "###          ^^^^###",
      "###        ^^#######",
      "###^^^^^^^^#########",
      "####################",
      "####################",
    ],
    {
      "A": ["4c", "C", "left"],
      "B": ["6c", "B", "right"],
    },
  ],

  "6a": [
    [
      "####################",
      "########  ##########",
      "###| #    ##########",
      "A  |       #########",
      "## |     E #####  ##",
      "###|      #### |  ##",
      "###|   ####### |   B",
      "###|   ######  | ###",
      "###   #######     ##",
      "###   #######     ##",
      "###   ###|####    ##",
      "####  ## | ####   ##",
      "##### ## | ||     ##",
      "##### ###|  |     ##",
      "#####  ##|       ###",
      "######        ######",
      "#######     ########",
      "#########    C######",
      "####################",
      "####################",
    ],
    {
      "A": ["5b", "B", "left"],
      "B": ["7a", "A", "right"],
      "C": ["6b", "A", "right"],
    },
  ],
  "6b": [
    [
      "####################",
      "############    ####",
      "##########A      ###",
      "############# ^   ##",
      "####      ##  ##  ##",
      "###               ##",
      "###  #^^#        ###",
      "##   #######^^     C",
      "##  ################",
      "##  ### ############",
      "B    ##         | ##",
      "###             | ##",
      "###^          # | ##",
      "####       ^^## | ##",
      "######^^^###### | ##",
      "############### |  #",
      "###############    #",
      "#############D     #",
      "################^^##",
      "####################",
    ],
    {
      "A": ["6a", "C", "left"],
      "B": ["5c", "B", "left"],
      "C": ["7a", "B", "right"],
      "D": ["6c", "A", "left"],
    },
  ],
  "6c": [
    [
      "####################",
      "####################",
      "####|  |||     A####",
      "###||  | |   #######",
      "###||| |     #######",
      "###| | |   #########",
      "###| | |  ##########",
      "## | | |  | ########",
      "##   |    |  |  ####",
      "##      # |  |  ####",
      "##        |  |  ####",
      "B  #^^^^  |  || ####",
      "########^^|| || |###",
      "########## |  | |###",
      "#########  |    || C",
      "#########       | ##",
      "########          ##",
      "#######^  E      ###",
      "########^^^^^^^^^###",
      "####################",
    ],
    {
      "A": ["6b", "D", "right"],
      "B": ["5d", "B", "left"],
      "C": ["7b", "A", "right"],
    },
  ],
  "6d": [
    [
      "####################",
      "####################",
      "####################",
      "####################",
      "##########||  ######",
      "########| |   |#####",
      "####### | |   | ####",
      "###     |     | ####",
      "##      |       ####",
      "## c       ^^   ####",
      "## #       ##    ###",
      "#######          ###",
      "########           A",
      "########   ##   ####",
      "###   ## | ##   ####",
      "### E    | ##   ####",
      "####      ^##    ###",
      "#####^^^^^###    ###",
      "#############^^^^###",
      "####################",
    ],
    {
      "A": ["7b", "B", "right"],
    },
  ],

  "7a": [
    [
      "####################",
      "###   #### || |#####",
      "##     ##|  | E|####",
      "##     ##||###||####",
      "A      ##|#####|####",
      "###   ###  ####|####",
      "##   ###   ####|####",
      "##    #     ###||###",
      "##          ### |###",
      "###     ##  ### |###",
      "###  #####  ### |###",
      "###  #####  ##  |###",
      "##   #####  |#  |###",
      "##  #####   |   | ##",
      "##  #####   |     ##",
      "B  ######    c    ##",
      "#########         ##",
      "#########        ###",
      "###########    #####",
      "####################",
    ],
    {
      "A": ["6a", "B", "left"],
      "B": ["6b", "C", "left"],
    },
  ],
  "7b": [
    [
      "####################",
      "##   #####  ####|  #",
      "##    ###    ## |  #",
      "A            ##    #",
      "###^  ####  ####  ##",
      "########## ##| # ###",
      "########## # |   ###",
      "########   # |  ####",
      "#   ###   ###|######",
      "#          ##|######",
      "#^  ###    # |######",
      "##^^######   |   ###",
      "#############     ##",
      "#############     ##",
      "##    #########   ##",
      "##       ##  ### ###",
      "B    ###      ## ###",
      "##########       ###",
      "##########     #####",
      "####################",
    ],
    {
      "A": ["6c", "C", "left"],
      "B": ["6d", "A", "left"],
    },
  ],

  "start": [
    [
      "#####",
      "A   #",
      "#####",
    ],
    {"A": ["7a", "A", "left"]}
  ]
};

var blockKeys = {
  "#": 0,
};

var decorKeys = {
  "g": "grass",
  "l": "vine",
  "c": "collectable",
  "^": "spike",
  "-": "holder"
}

function fillLevel(l) {
  lvl = l;
  var lName = l;
  l = maps[l][0];

  //console.log(lName);
  var arr = [];
  for (var y = 0; y < l.length; y++) {
    arr.push([]);
    for (var x = 0; x < l[y].length; x++) {
      if(l[y][x] === p.spawn) {

        p.x = (x + 0.5)*bs;
        p.y = (y + 0.5)*bs;

        lvl = lName;

        p.vx = 0;
        p.vy = 0;
        p.jump = false;
        p.onSpawn = 2;
      }
      if(maps[lvl][1][l[y][x]] !== undefined) {
        arr[y].push(new Pipe(x, y, l[y][x], maps[lvl][1][l[y][x]]))
        maps[lName][1][l[y][x]].push((x + 0.5)*bs);
        maps[lName][1][l[y][x]].push((y + 0.5)*bs);

      } else if(decorKeys[l[y][x]] !== undefined) {
        arr[y].push(new Decor(x, y, decorKeys[l[y][x]]))

      } else {

        switch (l[y][x]) {
          case "|":
            arr[y].push(new Stick(x, y, l[y][x]));
            break;
          case "E":
            maps[lName].spiders.push(new Spider(x*bs, y*bs));
            arr[y].push(undefined);
            break;
          case "R":
            maps[lName].rocks.push(new Rock((x + 0.5)*bs, y*bs, 0, 0.2))
            arr[y].push(undefined);
            break;
          case "S":
            maps[lName].rocks.push(new Spear((x + 0.5)*bs, y*bs, 0, 0.2))
            arr[y].push(undefined);
            break;
          case "#":
            if(lName !== "a" && y > 0 && (arr[y - 1][x] === undefined || arr[y - 1][x].type === "vine")) {

              arr[y - 1][x] = new Decor(x, y - 1, "grass");
            }
            arr[y].push(new Block(x, y, l[y][x]));
            break;
          default:
            if(lName !== "a" && y > 0 && arr[y - 1][x] && arr[y - 1][x].solid) {

              arr[y].push(new Decor(x, y, "vine"));
            } else {
              arr[y].push(undefined);
            }
        }

      }
    }
  }

  return arr;
}

function resetSpiders(l) {
  for(var i = 0; i < maps[l].spiders.length; i++) {
    if(maps[l].spiders[i].health >= 0) {
      var s = new Spider(maps[l].spiders[i].ox, maps[l].spiders[i].oy);
      s.health = maps[l].spiders[i].health;
      maps[l].spiders[i] = s;
    }
  }
}
function saveLevels() {
  p.saveX = p.x;
  p.saveY = p.y;

  p.saveLvl = lvl;

  p.saveHolding = false;
  if(p.holding) {
    p.saveHolding = [p.holding.x, p.holding.y, p.holding.harming === undefined];
  }


  for(var j in maps) {
    maps[j].saveRocks = [];
    for(var i = 0; i < maps[j].rocks.length; i++) {
      maps[j].saveRocks.push([maps[j].rocks[i].x, maps[j].rocks[i].y, maps[j].rocks[i].harming === undefined])
    }

    maps[j].saveSpiders = [];
    for(var i = 0; i < maps[j].spiders.length; i++) {
      if(maps[j].spiders[i].health > 0) {
        maps[j].saveSpiders.push([maps[j].spiders[i].ox, maps[j].spiders[i].oy, maps[j].spiders[i].health])
      }
    }
  }


  for (var i = 0; i < holders.length; i++) {
    if(holders[i][2] === undefined) {
      holders[i][2] = true;
    }
  }
}
function resetLevels() {
  p.x = p.saveX;
  p.y = p.saveY;

  lvl = p.saveLvl;

  p.vx = 0;
  p.vy = 0;
  p.dead = false;
  p.onSpawn = 2;

  p.holding = false;
  if(p.saveHolding) {
    p.holding = p.saveHolding[2] ? new Rock(p.saveHolding[0], p.saveHolding[1]) : new Spear(p.saveHolding[0], p.saveHolding[1]);
  }

  resetSpiders(lvl);


  for(var j in maps) {

    maps[j].rocks = [];
    for(var i = 0; i < maps[j].saveRocks.length; i++) {

      var r = maps[j].saveRocks[i];
      r = r[2] ? new Rock(r[0], r[1]) : new Spear(r[0], r[1]);
      maps[j].rocks.push(r)
      //console.log(maps[j].rocks[4])
    }
    //console.log(maps[j].rocks)


    maps[j].spiders = [];
    for(var i = 0; i < maps[j].saveSpiders.length; i++) {

      var r = maps[j].saveSpiders[i];
      var s = new Spider(r[0], r[1]);
      s.health = r[2];
      maps[j].spiders.push(s);
    }

  }

  for (var i = 0; i < holders.length; i++) {
    if(holders[i][2] === undefined) {
      holders[i][2] = false;
    }
  }
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

// a for anchor, b for bob, l for length, s for springyness
function spring(ax, ay, bx, by, l, s) {

  var force = (-s)*(dist(ax, ay, bx, by) - l);
  var a = Math.atan2(bx - ax, by - ay);

  return {x: Math.sin(a)*force, y: Math.cos(a)*force};
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
function cc(that, px, py, pr) {

  pr = pr || 0;

  if (dist(that.x, that.y, px, py) < that.r + pr) {
    var a = Math.atan2(that.x - px, that.y - py);

    that.x = px + Math.sin(a) * (that.r + pr);
    that.y = py + Math.cos(a) * (that.r + pr);


    if (a > Math.PI*0.5 || a < -Math.PI*0.5) {
      if(that.isPlayer && that.vy > 8 || that.harming !== undefined && (that.vy > 5 || that.vy < 0)) {
        ping(that.x, that.y)
      }
      that.vy *= 0.6;
      that.jump = true;

    }
    if (a === Math.PI || a === 0) {
      that.vy = 0;
    }
    if (a === Math.PI*0.5 || a === -Math.PI*0.5) {
      that.vx *= -0.3;
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

      var stickExtra = blocks[i].isStick ? 10 : 0;
      if(init(that.x, that.y, blocks[i].x - stickExtra, blocks[i].y, blocks[i].w + stickExtra*2, blocks[i].h)) {

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

  drag: 0.9,

  update: function(x, y) {
    this.x = lerp(x, this.x, this.drag);
    this.y = lerp(y, this.y, this.drag);

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
  //console.log(e)
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
  //console.log(e.key);
  e.preventDefault();
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
/*
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

    //popStyle();*/
  },
  load: function() {

    if (this.once) {
      this.once = false;
      this.keys = Object.keys(Images || {});
    }

    if (this.index < this.keys.length) {

      var img = Images[this.keys[this.index]]();

      if (img === undefined) {
        img = get();
      }/* else if (!img instanceof PImage && typeof img === "object") {
        if (img.img === undefined) {
          img = get(img.x || 0, img.y || 0, img.w || width, img.h || height);
        }*else {
          img = img.img;
        }
      }*/

      Images[this.keys[this.index]] = img;

      this.index++;
      this.pretty();
    } else {
      Trans.set("game");
      Trans.n = 1;
      //println("set scene to menu or smth");
    }
  },
};

// } interaction and misc functions



// {

Rock = function(x, y, a) {
  this.x = x;
  this.y = y;

  this.v = 8;

  a = a || 0;

  this.vx = Math.sin(a)*2;
  this.vy = Math.cos(a)*2;

  this.r = 10;
  this.grav = 0.3;

  this.dead = false;
  this.timer = 0;
  this.isThrowable = true;
};
Rock.prototype.reset = function(x, y, a) {
  this.x = x;
  this.y = y;

  this.vx = Math.sin(a)*this.v;
  this.vy = Math.cos(a)*this.v;

  this.timer = 0;
  this.dead = false;
};
Rock.prototype.update = function () {


  this.vy += this.grav;

  this.x += this.vx;
  this.y += this.vy;

  this.coll = false;
  circCollide(this, checkBlocks(this.x, this.y, blocksArr));

  if(this.coll) {
    this.vx *= 0.8;
    this.vy *= 0.8;
    if(!this.colliding) {
      ping(this.x, this.y);
      this.colliding = true;
    }
  } else {
    this.colliding = false;
  }

  if(!init(this.vx, this.vy, -0.05, -0.05, 0.1, 0.1)) {
    for(var i = 0; i < maps[lvl].spiders.length; i++) {
      if(maps[lvl].spiders[i].health > 0) {
        this.coll = false;
        cc(this, maps[lvl].spiders[i].x, maps[lvl].spiders[i].y, maps[lvl].spiders[i].r);

        if(this.coll) {
          if(this.hitSpider !== i) {
            console.log(frameCount, "rock hit spider[" + i + "]");
            this.hitSpider = i;
            this.vx = 0;
            this.vy = 0;

            maps[lvl].spiders[i].health -= 0.35;
          }
        } else if(this.hitSpider === i) {
          this.hitSpider = -1;
        }
      }
    }
  }

  if(Keys[" "] && !p.holding && this.timer > 10 && dist(this.x, this.y, p.x, p.y) < this.r + p.r) {
    p.holding = this;
    this.dead = true;
  }

  fill(255, 255, 255)
  circle(this.x, this.y, this.r*2);
  this.timer++;
};

Spear = function(x, y, a) {
  this.x = x;
  this.y = y;

  this.v = 8;

  a = a || 0;

  this.vx = Math.sin(a)*2;
  this.vy = Math.cos(a)*2;

  this.r = 8;
  this.grav = 0.1;

  this.dead = false;
  this.timer = 0;
  this.stillTimer = 0;
  this.still  = false;

  this.harming = false;
  this.isThrowable = true;

  this.a = a;
};
Spear.prototype.reset = function(x, y, a) {
  this.x = x;
  this.y = y;

  this.vx = Math.sin(a)*this.v;
  this.vy = Math.cos(a)*this.v;

  this.timer = 0;

  this.stillTimer = 0;
  this.dead = false;
  this.still = false;

  this.a = a;
};
Spear.prototype.run = function () {

  if(!this.still) {
    this.vy = constrain(this.vy + this.grav, -this.v, this.v);
    this.vx = constrain(this.vx, -this.v, this.v);

    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    this.a = Math.atan2(this.vx, this.vy);

    this.coll = false;
    circCollide(this, checkBlocks(this.x, this.y, blocksArr));

    if(this.coll) {
      if(dist(this.vx, this.vy, 0, 0) > this.grav) {
        ping(this.x, this.y);
      }
      this.vx *= 0;
      this.vy *= 0;
      this.still = true;
      this.harming = false;
    }

    if(this.harming) {
      for(var i = 0; i < maps[lvl].spiders.length; i++) {

        if(maps[lvl].spiders[i].health > 0) {
          this.coll = false;
          cc(this, maps[lvl].spiders[i].x, maps[lvl].spiders[i].y, maps[lvl].spiders[i].r);

          if(this.coll) {
            if(this.hitSpider !== i) {
              console.log(frameCount, "spear hit spider[" + i + "]");
              this.hitSpider = i;
              this.vx = 0;
              this.vy = 0;
              this.still = false;
              this.harming = false;

              maps[lvl].spiders[i].health -= 0.5;
            }
          } else if(this.hitSpider === i) {
            this.hitSpider = -1;
          }
        }
      }
    }
  }
  if(this.still) {
    this.stillTimer ++;
  }
  if(this.stillTimer >= 240) {
    this.stillTimer = 0;
    this.still = false;
  }

  //circle(this.x, this.y, this.r*2);

};
Spear.prototype.update = function () {
  for(var i = 0; i < 2; i++) {
    this.run();
  }

  if(Keys[" "] && !p.holding && this.timer > 10 && dist(this.x, this.y, p.x, p.y) < this.r + p.r) {
    p.holding = this;
    this.dead = true;
  }
  stroke(255, 255, 255);
  strokeWeight(3);
  var vx = Math.sin(this.a)*this.r*2, vy = Math.cos(this.a)*this.r*2;
  line(this.x - vx, this.y - vy, this.x + vx, this.y + vy)
  this.timer++;
};

// } thrown rocks and spears

// {
var p = {
  x: 200,
  y: 100,

  r: bs * 0.4,

  vx: 0,
  vy: 0,

  jump: false,
  coll: false,

  spawn: "A",
  isPlayer: true,
  onSpawn: 2,

  holding: false,

  collectables: 0,
};
p.draw = function() {
/*
  fill(100, 100, 100)
  circle(this.x, this.y + 5, this.r * 1.7);
  circle(this.x, this.y + 2, this.r * 1.7);

  fill(230, 230, 230)
  circle(this.x, this.y - this.r, this.r*1.2);
  rect(this.x + -5 + -4, this.y - this.r*1.9, 5, 10)
  rect(this.x + 4, this.y - this.r*1.9, 5, 10)

  /*fill(0, 0, 0)
  circle(this.x - 3, this.y - this.r, 3);
  circle(this.x + 3, this.y - this.r, 3);*/
  image(Math.abs(p.vx) < 0.1 ? Images.player : p.vx < 0 ? Images.player_left : Images.player_right, this.x - bs*0.5, this.y - bs*0.5, bs, bs)
};
p.move = function() {
  if (Keys.a || Keys.ArrowLeft) {
    this.vx = -3;
  }
  if (Keys.d || Keys.ArrowRight) {
    this.vx = 3;
  }

  if ((Keys.w || Keys.ArrowUp) && this.jump) {
    this.vy = -8.5;
    this.jump = false;
  } else if ((Keys.w || Keys.ArrowUp) && this.climb && this.vy > -2) {
    this.vy = -2;
  }
};
p.update = function() {


  this.move();
  this.vy += grav;
  this.vy = constrain(this.vy, -100, 10);

  if(this.dead) {
    Trans.set("dead");
  } else {
    this.x += this.vx;
    this.y += this.vy;
  }

  this.x = constrain(this.x, this.r, width - this.r);
  this.y = constrain(this.y, this.r, height - this.r);

  if(this.y > height + 200) {
    this.dead = true;
  }


  this.vx *= 0.5;
  this.jump = false;


  this.onSpawn = constrain(this.onSpawn - 1, -1, 5);
  this.climb = false;

  circCollide(this, checkBlocks(this.x, this.y, blocksArr));


  this.draw();

  if(Mouse.click && this.holding) {
    this.holding.reset(this.x, this.y, Math.atan2(mouseX - this.x, mouseY - this.y), 10);
    this.holding.harming = true;
    maps[lvl].rocks.push(this.holding);
    this.holding = false;
  }


  //console.log(this.holding);

};

// } player object

// {


Spider = function(x, y) {
  this.x = x;
  this.y = y;

  this.ox = x;
  this.oy = y;


  this.health = 1;

  this.r = bs*0.5;

  this.svx = 0;
  this.svy = 0;

  this.vx = 0;
  this.vy = 0;

  this.seekX = x;
  this.seekY = y;

  this.maxLegLength = 110;
  this.reachInCells = 3;


  this.tries = [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, -0, -0.2, -0.4, -0.6, -0.8, -1, -1.2, -1.4, -1.6, -1.8, -2, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6, 3.8, 4, -2, -2.2, -2.4, -2.6, -2.8, -3, -3.2, -3.4, -3.6, -3.8, -4, 4, 4.2, 4.4, 4.6, 4.8, 5, 5.2, 5.4, 5.6, 5.8, 6, -4, -4.2, -4.4, -4.6, -4.8, -5, -5.2, -5.4, -5.6, -5.8, -6];

  this.a = 0;
  this.ll = this.maxLegLength/3;

  this.feet = (function(px, py, sl) {
    var f = [];

    var mult = Math.PI*0.25, dMult = 20/8;

    for(var i = 0; i < 8; i++) {
      //console.log(px + ", " + py);
      f.push({
        x: px,
        y: py,

        fromX: px,
        fromY: py,

        nodes: [
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
        ],

        sideX: 0,
        sideY: 0,

        toX: px + Math.sin((i + 0.5)*mult)*10,
        toY: py + Math.cos((i + 0.5)*mult)*10,

        delay: i*dMult,
        placed: false,
      });
      //console.log(f[i]);
    }


    return f;
  })(x, y);

  this.q = [];
  this.z = [];
};

Spider.prototype.place = function(a, n) {
  var r = Math.atan2(n[0] - a[0], n[1] - a[1]);
  n[0] = lerp(a[0] + Math.sin(r)*this.ll, n[0], 0.5);
  n[1] = lerp(a[1] + Math.cos(r)*this.ll, n[1], 0.5);
};
Spider.prototype.stepRay = function(x, y, vx, vy, count) {
  //point(x, y);
  //rect(x, y, 3, 3);
  x += vx;
  y += vy;
  if(blocksArr[~~(y/bs)] && blocksArr[~~(y/bs)][~~(x/bs)] !== undefined) {
    var b = blocksArr[~~(y/bs)][~~(x/bs)];
    if(b.isStick && count > 40 && init(x, y, b.x, b.y, b.w, b.h) || b.solid && !b.isStick) {

      return {
        x: x - vx,
        y: y - vy,
        sideX: (x - vx > b.x + b.w*0.5) ? 1 : -1,
        sideY: (y - vy > b.y + b.h*0.5) ? 1 : -1,
      };
    }
  }
  if(count < this.maxLegLength) {
    return this.stepRay(x, y, vx, vy, count + 2);
  }
  return false;
};
Spider.prototype.placeFoot = function(an) {
  var run = false, i = 0;
  while(run === false && i < this.tries.length) {
    var a = an + this.tries[i]*0.2*Math.PI;
    run = this.stepRay(this.x, this.y, Math.sin(a)*2, Math.cos(a)*2, 0);
    i++;
  }
  return run;
};
Spider.prototype.updateFoot = function(f, i) {

  if(f.delay <= 5) {
    f.x = lerp(f.fromX, f.toX, f.delay*0.2);
    f.y = lerp(f.fromY, f.toY, f.delay*0.2);

  } else if(f.delay > 20 && this.move) {

    var a = this.findDir(~~(this.seekX/bs), ~~(this.seekY/bs));
    if(a && !(a[0] === 0 && a[1] === 0)) {
      this.a = Math.atan2(a[0], a[1])
    }
    var coords = this.placeFoot(this.a + (Math.random() - 0.5));
    if(coords) {
      f.fromX = f.toX;
      f.fromY = f.toY;

      f.toX = coords.x;
      f.toY = coords.y;
      f.sideX = coords.sideX;
      f.sideY = coords.sideY;
      f.delay = 0;
      f.placed = false;
    }
  } else {
    f.placed = true;
  }
  if(this.move) {
    f.delay++;
  }

  f.nodes[3][0] = f.x;
  f.nodes[3][1] = f.y;

  f.nodes[0][0] = this.x;
  f.nodes[0][1] = this.y;

  stroke(0, 0, 0);
  //line(this.x, this.y, f.x, f.y);
  var l = 4;
  for(var i = 1; i < l - 1; i++) {
    f.nodes[i][0] += f.sideX*3;
    f.nodes[i][1] += f.sideY*3;
  }
  for(var i = 1; i < l - 1; i++) {
    this.place(f.nodes[i - 1], f.nodes[i]);
    this.place(f.nodes[l - i], f.nodes[(l - i) - 1]);
  }


  strokeWeight(4);
  line(f.nodes[0][0], f.nodes[0][1], f.nodes[1][0], f.nodes[1][1]);
  strokeWeight(2);
  line(f.nodes[1][0], f.nodes[1][1], f.nodes[2][0], f.nodes[2][1]);
  strokeWeight(1.5);
  line(f.nodes[2][0], f.nodes[2][1], f.nodes[3][0], f.nodes[3][1]);





};
Spider.prototype.update = function() {
  var sx = 0, sy = 0, cc = 0;

  var d = constrain(dist(0, 0, sx - this.x, sy - this.y), 0, 0.1);

  for(var i = 0; i < this.feet.length; i++) {
    this.updateFoot(this.feet[i], i);
    if(this.feet[i].placed) {
      var s = spring(this.feet[i].x, this.feet[i].y, this.x, this.y, this.r*2, 0.2);

      sx += s.x;
      sy += s.y;
    }
  }
  this.vx = sx + Math.sin(this.a);
  this.vy = sy + Math.cos(this.a);
  if(dist(this.x, this.y, this.seekX, this.seekY) < this.r*1.2) {
    this.vx *= 0.2;
    this.vy *= 0.2;
    this.move = !true;
  } else {
    this.move = true;
  }
  this.x += this.vx;
  this.y += this.vy;


  circCollide(this, checkBlocks(this.x, this.y, blocksArr));

  fill(0, 0, 0);
  circle(this.x, this.y, this.r*2);
  //line(this.x, this.y, this.x + Math.sin(this.a)*this.r, this.y + Math.cos(this.a)*this.r);

  //fill(255, 0, 0, 30);
  //circle(this.x, this.y, this.maxLegLength*2);
};
Spider.prototype.addToQ = function(x, y, vx, vy) {
  x += vx;
  y += vy;


  if(blocksArr[y] && (blocksArr[y][x] === undefined || !blocksArr[y][x].solid/* && !blocksArr[y][x].isStick*/) && this.z[y][x] === -1) {

    this.q.push([x - vx, y - vy, vx, vy]);
    //rect(x*bs, y*bs, bs, bs);
    this.z[y][x] = 1;
  }

};
Spider.prototype.checkBlock = function(x, y, vx, vy) {
  x += vx;
  y += vy;

  if(x === this.cellX && y === this.cellY) {
    return [-vx, -vy];
  } else {
    this.addToQ(x, y, 1, 0);
    this.addToQ(x, y, -1, 0);
    this.addToQ(x, y, 0, -1);
    this.addToQ(x, y, 0, 1);

    this.addToQ(x, y, 1, 1);
    this.addToQ(x, y, -1, 1);
    this.addToQ(x, y, -1, -1);
    this.addToQ(x, y, 1, -1);

    //rect(x*bs, y*bs, bs, bs)
  }
};
Spider.prototype.findDir = function(x, y) {

  this.cellX = ~~(this.x/bs);
  this.cellY = ~~(this.y/bs);

  this.q = [[x, y, 0, 0]];

  this.z = [];
  for(var i = 0; i < blocksArr.length; i++) {
    this.z.push([]);
    for(var j = 0; j < blocksArr[i].length; j++) {
      this.z[i].push(-1);
    }
  }

  fill(255, 0, 0, 30)
  var out, l = 0;
  while(out === undefined && this.q.length > 0 && l < 2000) {
    out = this.checkBlock(this.q[0][0], this.q[0][1], this.q[0][2], this.q[0][3]);
    this.q.shift();
    l++;
  }

  return out;

};


// } spider object

// {
function calcShadow(a, n) {
  return a - (n - a)*50;
}
function shadow(x, y, w, h, lx, ly) {
  fill(0, 0, 0, 50);
  quad(x, y, calcShadow(x, lx), calcShadow(y, ly), calcShadow(x + w, lx), calcShadow(y + h, ly), x + w, y + h);
  quad(x + w, y, calcShadow(x + w, lx), calcShadow(y, ly), calcShadow(x, lx), calcShadow(y + h, ly), x, y + h);

fill(0, 0, 0);
  rect(x, y, w, h);
}

Block = function(x, y, type) {
  this.x = x * bs;
  this.y = y * bs;

  this.w = bs;
  this.h = bs;

  this.solid = true;
};
Block.prototype.draw = function() {

};

Decor = function(x, y, type) {
  this.x = x * bs;
  this.y = y * bs;

  this.w = bs;
  this.h = bs;

  this.type = type;
  this.solid = false;

  if(this.type === "spike") {
    this.y += bs*0.5;
    this.h*= 0.5;
  }

  if(this.type === "collectable") {
    this.ind = collectableCount;
    collectableCount++;
  }
};
Decor.prototype.draw = function() {
  fill(0, 0, 0, 100)
  //rect(this.x, this.y, this.w, this.h);
  image(Images[this.type], this.x, this.y, bs, bs);
  //image(Images.grass, this.x + 10, this.y, bs, bs);
};
Decor.prototype.onCollide = function(that) {
  if(that.isPlayer) {
    if(this.type === "collectable" && holders[this.ind][2] === false) {
      p.collectables++;
      console.log("move collectable to beacon")
      holders[this.ind][2] = undefined;
    } else if(this.type === "spike") {
      p.dead = true;
      //console.log("spiked");
    }
  }
  if(that.isThrowable && this.type === "spike") {
    that.coll = true;
  }
};

Stick = function(x, y, type) {
  this.x = (x + 0.5) * bs - 2;
  this.y = y * bs;

  this.w = 4;
  this.h = bs;

  this.solid = !true;
  this.isStick = true;
};
Stick.prototype.draw = function() {
  fill(0, 0, 0);
  rect(this.x, this.y, this.w, this.h);
};
Stick.prototype.onCollide = function(that) {

  if(that.isPlayer) {
    that.climb = true;

    that.vy = constrain(that.vy, -100, 4);
  }

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


  this.img = "pipe_" + (data[2] || "right");

  this.off = {
    "pipe_left": [bs, 0],
    "pipe_right": [-bs, 0],
    "pipe_up": [0, bs],
    "pipe_down": [0, -bs],
  }
};
Pipe.prototype.onCollide = function(that) {
  //console.log(this.pipe + " " + that.spawn + " " + that.onSpawn);
  if(that.spawn === this.pipe && that.onSpawn > 0) {
    that.onSpawn = 2;
  }
  if(that.onSpawn < 0) {
    //console.log(this.pipe + ". " + this.toLevel + ": " + this.toPipe);
    that.spawn = this.toPipe;

    if(that.isPlayer) {
      console.log("from " + lvl + " " + this.pipe + " to " + this.toLevel + " " + this.toPipe);
      lvl = this.toLevel;
      blocksArr = maps[lvl][0];
      resetSpiders(lvl);
      p.onSpawn = 2;

      var pOffset = this.off["pipe_" + maps[lvl][1][this.toPipe][2]];
      p.x = maps[lvl][1][this.toPipe][3] + pOffset[0];
      p.y = maps[lvl][1][this.toPipe][4] + pOffset[1];


      if(that.vy > 0) {
        that.vy = 0;
      }
      //console.log(lvl);

      saveLevels();

      //console.log("to " + lvl + " " + this.toPipe);
      pings = [];
    }
  }
  if(that.isThrowable) {
    that.coll = true;
  }

  return that.spawn !== this.pipe;

};
Pipe.prototype.draw = function() {
  /*fill("lightgreen");*/
  fill(0, 0, 0)
  shadow(this.x, this.y, this.w, this.h, p.x, p.y);
  image(Images[this.img], this.x + this.off[this.img][0], this.y + this.off[this.img][1], bs, bs)
  fill(255, 255, 255);
};


// } block constructors



/*Images = {
  grass: function() {
    ctx.clearRect(0, 0, 600, height)

    fill(0, 0, 0, 200)
    ctx.beginPath();
    ctx.moveTo(0, bs);
    for(var i = 1; i < bs; i += 2) {
      ctx.lineTo(i, bs - random(0, 0.8)*bs)
    }
    ctx.lineTo(bs, bs);
    ctx.fill();

    return get(0, 0, bs, bs);
  },
  vine: function() {
    ctx.clearRect(0, 0, 600, height)

    stroke(0, 0, 0, 200)
    strokeWeight(3);
    for(var i = 1; i < bs; i += 10) {
      line(i, 0, i + random(-15, 15), random(0, 0.8)*bs*2)
    }

    return get(0, 0, bs, bs);
  },
  collectable: function() {
    ctx.clearRect(0, 0, 600, height)

    fill(188, 191, 180)
    circle(bs*0.5, bs*0.5, bs, bs)

    return get(0, 0, bs, bs);
  },

  pipe_right: function() {
    ctx.clearRect(0, 0, 600, height)

    let grad = ctx.createLinearGradient(0, 0, bs, 5);
    grad.addColorStop(0.2, "rgba(255, 255, 255, 0)");
    grad.addColorStop(1, "rgba(255, 255, 255, 1)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, bs, bs);

    return get(0, 0, bs, bs);
  },
  pipe_left: function() {
    ctx.clearRect(0, 0, 600, height)

    let grad = ctx.createLinearGradient(0, 5, bs, 0);
    grad.addColorStop(0.8, "rgba(255, 255, 255, 0)");
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, bs, bs);

    return get(0, 0, bs, bs);
  },
  pipe_up: function() {
    ctx.clearRect(0, 0, 600, height)

    let grad = ctx.createLinearGradient(5, 0, 0, bs);
    grad.addColorStop(0.8, "rgba(255, 255, 255, 0)");
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, bs, bs);

    return get(0, 0, bs, bs);
  },
  pipe_down: function() {
    ctx.clearRect(0, 0, 600, height)

    let grad = ctx.createLinearGradient(0, 0, 5, bs);
    grad.addColorStop(0.2, "rgba(255, 255, 255, 0)");
    grad.addColorStop(1, "rgba(255, 255, 255, 1)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, bs, bs);

    return get(0, 0, bs, bs);
  },
};*/
Images = {
  "vine": [0, 0, 1, 1],
  "grass": [1, 0, 1, 1],
  "spike": [0, 1.5, 1, 1],
  "holder": [1, 1, 1, 1],
  "collectable": [2, 1, 1, 1],

  "player": [3, 1, 1, 1],
  "player_left": [4, 1, 1, 1],
  "player_right": [5, 1, 1, 1],

  "pipe_right": [2, 0, 1, 1],
  "pipe_down": [3, 0, 1, 1],
  "pipe_left": [4, 0, 1, 1],
  "pipe_up": [5, 0, 1, 1],

  "glow_false": [0, 2, 1, 1],
  "glow_true": [1, 2, 1, 1],
};
Scenes = {
  /*load: function() {
    ImageLoader.load();
  },*/
  menu: function() {
    background(240);
  },
  game: function() {
    background(51, 48, 42);
    if(lvl === "a") {
      ctx.drawImage(radioshack, 0, 0, 600, 600);
      var count = 0;
      for(var i = 0; i < holders.length; i++) {
        if(holders[i][2]) {
          image(Images.collectable, holders[i][0]*bs, (holders[i][1] + 0.5)*bs, bs, bs);

          fill(clr);
          rect(300, 350 + count*10, 15, 5);
          count++;
        }
      }

      if(count === 6) {
        fill(255, 255, 255);
        rect(281, 360, 8, 25);
        triangle(275, 384, 285, 396, 295, 384);
        var s = Math.sin(frameCount*0.1)*6;
        rect(280, 417 - s, 40, s + 3);
      } else {
        fill(255, 255, 255);
        rect(280, 417 - 3, 40, 3);
      }
    } else {
      ctx.drawImage(sky, 0, 0, 600, 600);
    }

    for(var i = 0; i < maps[lvl].spiders.length; i++) {
      if(maps[lvl].spiders[i].health > 0) {
        maps[lvl].spiders[i].update();
      }
    }

    for(var i = 0; i < maps[lvl].rocks.length; i++) {
      //console.log(maps[lvl].rocks[i])
      maps[lvl].rocks[i].update();
      if(maps[lvl].rocks[i].dead) {
        maps[lvl].rocks.splice(i, 1);
        i--;
      }
    }

    p.update();


    /*fill(0, 0, 0);
    rect(-600, -300, 600, 900);
    rect(blocksArr[0].length * bs, -300, 600, 900);
    rect(0, blocksArr.length * bs, blocksArr[0].length * bs, 600);
    rect(0, -600, blocksArr[0].length * bs, 600);*/

    for(var i = 0; i < pings.length; i++) {
      pings[i].update();
      if(pings[i].dead) {
        pings.splice(i, 1);
        i--;
      }
    }

    for (var y = 0; y < blocksArr.length; y++) {
      for (var x = 0; x < blocksArr[y].length; x++) {
        if (blocksArr[y][x]) {
          if(blocksArr[y][x].type === "collectable") {
            if(holders[blocksArr[y][x].ind][2] === false) {
              blocksArr[y][x].draw();
            }
          } else {
            blocksArr[y][x].draw();
          }
        }
      }
    }

    for (var y = 0; y < blocksArr.length; y++) {
      for (var x = 0; x < blocksArr[y].length; x++) {
        if (blocksArr[y][x] && blocksArr[y][x].solid) {
          shadow(blocksArr[y][x].x, blocksArr[y][x].y, blocksArr[y][x].w, blocksArr[y][x].h, p.x, p.y);
        }
      }
    }


    if(lvl !== "a") {
      for(var i = 0; i < holders.length; i++) {
        var h = holders[i][2];
        image(Images["glow_" + (h === undefined || h ? "true" : "false")], 210 + i*30, 0, bs, bs);
      }

      if(p.holding && p.holding.harming !== undefined) {
        translate(-5, 0);
        stroke(255, 255, 255);
        strokeWeight(3);
        line(575, 38, 592, 8);
        line(580, 15, 592, 8);
        noStroke();

      }
    }




    //line(300, 300, mouseX, mouseY);
    //println(atan2(mouseX - 300, mouseY - 300));
  },
  dead: function() {
    background(0, 0, 0);
    if(p.dead) {
      resetLevels();
      console.log("reset to save");
    }
    Trans.set("game");
    p.dead = false;
  }
};



(function() {

  for(var k in maps) {
    maps[k].spiders = [];
    maps[k].spiderPortals = [];
    maps[k].rocks = [];

    maps[k][0] = fillLevel(k);
    if(k === "a") {
    console.log(maps[k][0])
  }
  }

})();
console.log(maps)
saveLevels();
//console.log(maps[lvl])
blocksArr = maps[lvl][0]

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
