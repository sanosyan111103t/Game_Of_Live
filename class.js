
////////////////////////////////////////////////////////////////////
class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 3 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}
class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 15;
        this.index = index;

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {

        var newCell = random(this.chooseCell(0))

        if (newCell) {
            this.energy--;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.x = newX;
            this.y = newY;
        }
    }
    eat() {
        var grass = random(this.chooseCell(1));
        if (grass) {
            var newX = grass[0];
            var newY = grass[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 3);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;
            this.energy += 2;
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 16 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grasseaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 15;
        }
    }
    die() {
        if (this.energy <= 3) {
            matrix[this.y][this.x] = 0;
            for (var i in grasseaterArr) {
                if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                }
            }
        }
    }
}
class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 40;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y + 2],
            [this.x + 2, this.y + 2]

        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        // move to 0 & 4 
        var newCell1 = random(this.chooseCell(0));
        var newCell2 = random(this.chooseCell(1));
        var newCell3 = random(this.chooseCell(2));
        var num = [];

        num[0] = newCell1;
        num[1] = newCell2;
        num[2] = newCell3;
        let i = Math.floor(Math.random() * 3);
        var newCell = num[i];

        if (newCell) {
            this.energy -= 1;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.x = newX;
            this.y = newY;
        }
    }
    eat() {
        var grasseater = random(this.chooseCell(2));
        if (grasseater) {
            var newX = grasseater[0];
            var newY = grasseater[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;
            for (var i in grasseaterArr) {
                if (newX == grasseaterArr[i].x && newY == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;
            this.energy += 4;
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 46 && newCell) {
            var newpredator = new Predator(newCell[0], newCell[1], this.index);
            predatorArr.push(newpredator);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 40;
        }
    }
    die() {
        if (this.energy <= 2) {
            matrix[this.y][this.x] = 0;
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                }
            }
        }
    }
}
class Men {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 100;

    }
    getNewCoordinates_mul() {
        this.directions = [
            [this.x, this.y - 1],
            [this.x - 1, this.y],                          //  0 0 1 0 0
            [this.x + 1, this.y],                          //  0 1 8 1 0
            [this.x, this.y + 1]                           //  0 0 1 0 0

        ];
    }
    getNewCoordinates_move() {
        this.directions = [
            [this.x - 2, this.y - 2],                 //  0 0 0 0 0 0 0 
            [this.x + 2, this.y - 2],                 //  0 1 0 0 0 1 0 
            [this.x - 1, this.y - 1],                 //  0 0 1 0 1 0 0
            [this.x + 1, this.y],                 //  0 0 0 8 0 0 0 
            [this.x - 1, this.y + 1],                 //  0 0 1 0 1 0 0 
            [this.x + 1, this.y + 1],                 //  0 1 0 0 0 1 0
            [this.x - 2, this.y + 2]                  //  0 0 0 0 0 0 0     
        ];
    }
    getNewCoordinates_eat() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    getNewCoordinates_die() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y + 2],
            [this.x + 2, this.y + 2]

        ];
    }

    chooseCellforMul(character) {
        this.getNewCoordinates_mul();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    chooseCellforEat(character) {
        this.getNewCoordinates_eat();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    chooseCellforMove(character) {
        this.getNewCoordinates_move();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    chooseCellforDie(character) {
        this.getNewCoordinates_die();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {

        var newCell1 = random(this.chooseCellforMove(0));
        var newCell2 = random(this.chooseCellforMove(1));
        var newCell3 = random(this.chooseCellforMove(2));
        var newCell4 = random(this.chooseCellforMove(3));
        var num = [];

        num[0] = newCell1;
        num[1] = newCell2;
        num[2] = newCell3;
        num[3] = newCell4
        let i = Math.floor(Math.random() * 4);
        var newCell = num[i];

        if (newCell) {
            this.energy -= 1.5;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.x = newX;
            this.y = newY;
        }
    }
    eat() {
        if (grasseaterArr.length <= 5) {

            var predator1 = random(this.chooseCellforEat(3));
            var grasseater1 = random(this.chooseCellforEat(2));
            var grass1 = random(this.chooseCellforEat(1));
            var food = [];

            food[0] = predator1;
            food[1] = grasseater1;
            food[2] = grass1;

            let foodnum = Math.floor(Math.random() * 3);

            var predator = food[foodnum];
            if (predator) {
                var newX = predator[0];
                var newY = predator[1];
                matrix[newY][newX] = this.index;
                matrix[this.y][this.x] = 0;
                for (var i in predatorArr) {
                    if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
                this.x = newX;
                this.y = newY;
                this.energy += 5;
            }
        }
    }
    mul() {
        var newCell = random(this.chooseCellforMul(0));
        if (this.energy >= 70 && newCell) {
            var newMen = new Men(newCell[0], newCell[1], this.index);
            menArr.push(newMen);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 50;
        }
    }
    die() {
        var newCell = random(this.chooseCellforDie(5));
        if (this.energy <= 0 || newCell) {
            matrix[this.y][this.x] = 0;
            for (var i in menArr) {
                if (this.x == menArr[i].x && this.y == menArr[i].y) {
                    menArr.splice(i, 1);
                }
            }
        }
    }
}
class Bomb {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.cores = 80;
    }
    getNewCoordinates_move() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    getNewCoordinates_eat() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    chooseCellforMove(character) {
        this.getNewCoordinates_move();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    chooseCellforEat(character) {
        this.getNewCoordinates_eat();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        // move to 0 & 4 & 6
        var newCell1 = random(this.chooseCellforMove(0));
        var newCell2 = random(this.chooseCellforMove(4));
        var newCell3 = random(this.chooseCellforMove(6));
        var num = [];

        num[0] = newCell1;
        num[1] = newCell2;
        num[2] = newCell3;
        let i = Math.floor(Math.random() * 3);       
        var newCell = num[i]

        if (newCell) {
            this.cores -= 1;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.x = newX;
            this.y = newY;
        }
    }
    eat() {
        var men = random(this.chooseCellforEat(4));
        if (men) {
            var newX = men[0];
            var newY = men[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;
            for (var i in menArr) {
                if (newX == menArr[i].x && newY == menArr[i].y) {
                    menArr.splice(i, 1);
                    bombkils++;
                    break;
                }
            }
            this.x = newX;
            this.y = newY;
            this.energy += 35;
        }
    }
    die() {
        if (this.cores <= 30) {
            matrix[this.y][this.x] = 0;
            for (var i in bombArr) {
                if (this.x == bombArr[i].x && this.y == bombArr[i].y) {
                    bombArr.splice(i, 1);
                }
            }
        }
    }
    blast() {
        // if (this.cores >= 250 || (bombArr.length <= 1 && menArr.length >= 10) /* || blastPerm >= 2 */) {
        alert("Blast!!!!!");
        console.log("Blast!!!!!");
        grassArr.length = 0;
        grasseaterArr.length = 0;
        predatorArr.length = 0;
        menArr.length = 0;
        bombArr.length = 0;
        botArr.length = 0;

        setTimeout(function () { alert("Game over!.....PLS click in Restart"); }, 1200);

        for (var y = 0; y < n; y++) {
            matrix[y] = [];
            for (var x = 0; x < m; x++) {
                matrix[y][x] = 9;
            }
        }
    }

}
class StoneBot {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;

    }
    getNewCoordinates() {
        this.directions = [
             [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
           [this.x + 1, this.y],
           [this.x + 1, this.y]
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    lineup() {
        var newBotCord = [];
        newBotCord[0] = random(this.chooseCell(0));
        if (grassArr.length != 0) {
            newBotCord[1] = random(this.chooseCell(1));
        };
        if (grasseaterArr.length != 0) {
            newBotCord[2] = random(this.chooseCell(2));
        };
        if (predatorArr.length != 0) {
            newBotCord[3] = random(this.chooseCell(3));
        };
        if (menArr.length != 0) {
            newBotCord[4] = random(this.chooseCell(4));
        };
        newBotCord[5] = random(this.chooseCell(5));

        let cl = Math.floor(Math.random() * 2) + 1;
        var newCell6 = newBotCord[cl];

        if (newCell6) {
            var newX = newCell6[0];
            var newY = newCell6[1];
            matrix[newY][newX] = 8;
            this.x = newX;
            this.y = newY;
        }
    }
    lineup2(){

    let botnum = 0;
    while (botnum <= m) {
     
        matrix[n / 4][botnum] = 6;
        matrix[n/2][botnum] = 6;
        matrix[n - n / 4][botnum] = 6;
     
                             botnum++; }
    }
}

















