 //*Start Project III*//

var matrix = [];

var n = 60;
var m = 60;
var side = 10;

var grassArr = [];
var grasseaterArr = [];
var predatorArr = [];
var menArr = [];
var bombArr = [];
var botArr = [];

var bombkils = 0;
var botOn = false;

function restart() {
    location.reload();
};

function keyPressed() {
    console.log("presed key - " + key);
    let keyevent = key;
    if (keyevent == "R") {
       console.log("Reloading!!")
        alert("Reloading!!");
        location.reload();
    };
    if(keyevent == "B"){
        for (var i in bombArr) {
            bombArr[i].blast();
        };
    };
    if(keyevent == "L"){
        for (var i in botArr) {
        //  if(botOn == true){
         botArr[i].lineup();
        // botArr[i].lineup2();
        // }

    }
    };
   
};


function mousePressed() {
    console.log(mouseX, mouseY);
    //alert(mouseX, mouseY);
 };

function setup() {
    for (var y = 0; y < n; y++) {
        matrix[y] = [];
        for (var x = 0; x < m; x++) {
            var rand = Math.floor(random(0, 2));
            matrix[y][x] = rand;
        }
    }
    //first men Cordinate
    matrix[n - 1][m - 1] = 4;
    matrix[n - 1][1] = 4;

    //first grasseaters Coordinates
    matrix[2][2] = 2;
    matrix[n - 2][m - 2] = 2;

    //first predators Coordinates
    matrix[n / 2][m / 2] = 3;
    matrix[n / 2][m / 2 + 2] = 3;
    matrix[n / 2][m / 2 - 2] = 3;
    matrix[2][m - 2] = 3;
    matrix[n - 2][2] = 3;

    //first bombs Cordinates
    matrix[3][m / 2] = 5;
    matrix[n - 3][m / 2] = 5;
    matrix[n / 2][3] = 5;
    matrix[n / 2][m - 3] = 5;

    //first bot cordinates
    matrix[n / 4][1] = 6;
    matrix[n / 2][1] = 6;
    matrix[n - n / 4][1] = 6;

    frameRate(3);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var ge = new GrassEater(x, y, 2);
                grasseaterArr.push(ge);
            }
            else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y, 3);
                predatorArr.push(pr);
            }
            else if (matrix[y][x] == 4) {
                var me = new Men(x, y, 4);
                menArr.push(me);
            }
            else if (matrix[y][x] == 5) {
                var bo = new Bomb(x, y, 5);
                bombArr.push(bo);
            }
            else if (matrix[y][x] == 6) {
                var bot = new StoneBot(x, y, 6);
                botArr.push(bot);
            }
        }
    }
}
function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill('#acacac');
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("#515A5A");
            }
            else if (matrix[y][x] == 5) {
                if (predatorArr.length <= 0) {
                    fill("black");
                };
            }
            else if (matrix[y][x] == 6) {
                fill("#0B03FF");
            }
            else if (matrix[y][x] == 8) {
                fill("#7E4915");
            }
            else if (matrix[y][x] == 9) {
                fill("#191919");
            }

            rect(x * side, y * side, side, side);
        }
    }
    if (bombArr.length <= 2 && menArr.length >= 15 || menArr.length <= 1 && bombArr.length >= 1) {
        for (var i in bombArr) {
            bombArr[i].blast();
        }
    }
    else {
        for (var i in grassArr) {
            grassArr[i].mul();
        };
        for (var i in grasseaterArr) {
            grasseaterArr[i].move();
            grasseaterArr[i].eat();
            grasseaterArr[i].mul();
            grasseaterArr[i].die();
        };
        for (var i in predatorArr) {
            predatorArr[i].move();
            predatorArr[i].eat();
            predatorArr[i].mul();
            predatorArr[i].die();
        };
        for (var i in menArr) {
            menArr[i].move();
            menArr[i].eat();
            if (menArr.length <= ((n * m) / 2)) {
                menArr[i].mul();
            }
            menArr[i].die();
        };
        if (predatorArr.length <= 0) {

            for (var i in bombArr) {

                bombArr[i].move();
                bombArr[i].eat();
                bombArr[i].die();
            };
        };
        for (var i in botArr) {
            //  if(botOn == true){
            // botArr[i].lineup();
            // botArr[i].lineup2();
            // }

        }
    }

    ////----console----////

    // if (menArr.length != 0) {
    //     console.log("menArr lenght" + menArr.length);
    // }
    // if (bombArr.length != 0) {
    //     console.log("Bomb Arr " + bombArr.length);
    // }
    if (botArr.length != 0) {
        console.log("Bot Arr " + botArr.length);
    }
    // console.log(bombArr.length);
}




























