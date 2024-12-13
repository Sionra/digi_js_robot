//Permet d'afficher le plateau
function show(plateau, robot) {
    //console.clear()
    plateau.map((line) => {
        console.log(line);
    })
}

//Permet de cree le plateau
//Percentage entre 0 et 1
function createMap(sizeX, sizeY, percentage) {
    let plateau = []
    let dirtMax = Math.round((sizeX * sizeY) * percentage)
    let count = 0

    //on fais le plateau  propre
    for (let x = 0; x < sizeX; x++) {
        plateau.push([])
        for (let y = 0; y < sizeY; y++) {
            plateau[x].push(0) // case propre
        }
    }

    //On met la saleté
    while (count !== dirtMax) {
        plateau.map((line, indexY) => {
            line.map((char, indexX) => {
                if (char === 0 && count !== dirtMax) {
                    if (Boolean(Math.round(Math.random()))) {
                        count++
                        plateau[indexY][indexX] = 1// case salle
                    }
                }
            })
        })
    }
    return plateau
}

//Notre class Robot ( •̀ ω •́ )✧
class RobotAspi {
    constructor(x, y, energieMax) {
        this.x = x
        this.y = y
        this.positionBase = [x, y]
        this.energieMax = energieMax
        this.energieActuelle = this.energieMax
        this.retourBase = false
    }


    choixDirectionRetour(plateau, direction) {
        if (direction === "haut") {
            if ((((this.x + 1) * 2 + (this.y) * 2) < ((this.x - 1) * 2 + (this.y) * 2) &&  (((this.x + 1) * 2 + (this.y) * 2) < ((this.x) * 2 + (this.y -1) * 2)) && this.check(this.x+1,this.y,plateau,this.retourBase))) {
                return "droite"
            } else if ((((this.x - 1) * 2 + (this.y) * 2) < ((this.x) * 2 + (this.y - 1) * 2))&& this.check(this.x-1,this.y,plateau,this.retourBase)) {
                return "gauche"
            } else  {
                return "haut"
            }
        } else if (direction === "droite") {
            if ((((this.x) * 2 + (this.y-1) * 2) < ((this.x + 1) * 2 + (this.y) * 2)&& (((this.x) * 2 + (this.y-1) * 2) < ((this.x) * 2 + (this.y + 1) * 2))) && this.check(this.x,this.y-1,plateau,this.retourBase)){
                return "haut"
            } else if ((((this.x + 1) * 2 + (this.y) * 2) < ((this.x) * 2 + (this.y + 1) * 2))&& this.check(this.x-1,this.y ,plateau,this.retourBase)) {
                return "droite"
            } else {
                return "bas"
            }
        } else if (direction === "gauche") {
            if ((((this.x) * 2 + (this.y-1) * 2) < ((this.x - 1) * 2 + (this.y) * 2)&& (((this.x) * 2 + (this.y-1) * 2) < ((this.x) * 2 + (this.y + 1) * 2)))&& this.check(this.x,this.y-1,plateau,this.retourBase)) {
                return "haut"
            } else if ((((this.x - 1) * 2 + (this.y) * 2) < ((this.x) * 2 + (this.y + 1) * 2)) && this.check(this.x-1,this.y,plateau,this.retourBase)){
                return "gauche"
            } else {
                return "bas"
            }
        } else if (direction === "bas") {
            if ((((this.x) * 2 + (this.y+1) * 2) < ((this.x + 1) * 2 + (this.y) * 2) && (((this.x) * 2 + (this.y+1) * 2) < ((this.x) * 2 + (this.x - 1) * 2))) && this.check(this.x,this.y+1,plateau,this.retourBase)){
                return "bas"
            } else if ((((this.x + 1) * 2 + (this.y) * 2) < ((this.x) * 2 + (this.x - 1) * 2)) && this.check(this.x+1,this.y,plateau,this.retourBase)){
                return "droite"
            } else {
                return "gauche"
            }
        }
    }

    moveToBase(plateau,direction) {
        switch (direction) {
            case "haut" :
                this.move(this.choixDirectionRetour(plateau,direction), plateau)
                plateau [this.y][this.x] = -2
                return this.choixDirectionRetour(plateau, direction)

            case "droite":
                this.move(this.choixDirectionRetour(plateau,direction), plateau)
                plateau [this.y][this.x] = -2
                return this.choixDirectionRetour(plateau, direction)


            case "gauche":
                this.move(this.choixDirectionRetour(plateau,direction), plateau)
                plateau [this.y][this.x] = -2
                return this.choixDirectionRetour(plateau, direction)

            case "bas":
                this.move(this.choixDirectionRetour(plateau,direction), plateau)
                plateau [this.y][this.x] = -2

                return this.choixDirectionRetour(plateau, direction)

        }
    }

    //Fait la direction du robot
    choixDirection(plateau) {
        if (this.check(this.x, this.y - 1, plateau, this.retourBase)) {
            return "haut"
        }
        if (this.check(this.x + 1, this.y, plateau, this.retourBase)) {
            return "droite"
        }
        if (this.check(this.x, this.y + 1, plateau, this.retourBase)) {
            return "bas"
        }
        if (this.check(this.x - 1, this.y, plateau, this.retourBase)) {
            return "gauche"
        }

    }

    //Deplace le robot
    move(direction, plateau) {
        switch (direction) {
            case "haut":
                plateau [this.y][this.x] = -1
                this.y--
                console.log(`Le robot ce deplace vers le haut : ${this.x}, ${this.y}`)
                break;
            case "bas":
                plateau [this.y][this.x] = -1
                this.y++
                console.log(`Le robot ce deplace vers le bas : ${this.x}, ${this.y}`)
                break;
            case "gauche":
                plateau [this.y][this.x] = -1
                this.x--
                console.log(`Le robot ce deplace vers la gauche : ${this.x}, ${this.y}`)
                break;
            case "droite":
                plateau [this.y][this.x] = -1
                this.x++
                console.log(`Le robot ce deplace vers la droite : ${this.x}, ${this.y}`)
                break;

            default:
                console.log("Mauvaise direction")
                break;
        }
    }

//Permet de check si une case existe
    check(x, y, plateau, retourBase) {
        if (plateau[y] === undefined) {
            return false;
        }
        if (plateau[y][x] === undefined) {
            return false;
        }
        return plateau[y][x] !== -1 || retourBase;

    }


    clean(plateau) {
        if (plateau[this.x][this.y] > 0) {
            plateau[this.x][this.y] = 0
        }
    }
}

function creationParti(postionXRobot, postionYRobot, energieMax, tailleXPlateau, tailleYPlateau, pourcentageSalete) {
    let robotAspi = new RobotAspi(postionXRobot, postionYRobot, energieMax)
    let plateau = createMap(tailleXPlateau, tailleYPlateau, pourcentageSalete)
    return [robotAspi, plateau]
}

function parti(robotAspi, plateau) {
    taillePlateau = partie[1].length * partie[1][0].length
    let direction = "droite"
    setInterval(() => {
        if (taillePlateau !== 0) {
            robotAspi.move(robotAspi.choixDirection(plateau), plateau)
            taillePlateau--

        } else {
            robotAspi.retourBase=true
            direction = robotAspi.moveToBase(plateau,direction)
            console.log("j'ai tout nettoyer")
        }
        show(plateau)
    }, 1000)
}

function htmlGeneration(plateau) {
    let table = document.querySelector('table');
    plateau.map((row) => {
        let newRow = table.insertRow(-1)
        row.map((cell) => {
            let newCell = newRow.insertCell(-1)
            let text = document.createElement('p')
            text.innerText = cell
            newCell.appendChild(text)
        })
    })
    console.log(table)
}

function htmlUpdate(plateau){
        let table = document.querySelector('table');
        let rows = table.rows
        rows.map((row, indexY) => {
            row.map((cell, indexX) => {
                rows[indexY][indexX] = plateau[indexY][indexX]
            })
        })
}

partie = creationParti(0, 0, 20, 5, 5, 0.4)
plateau = partie[1]
robot = partie[0]
console.log(robot)
console.log(plateau)
//htmlGeneration(plateau)
//show(plateau)
parti(robot, plateau)