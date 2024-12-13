//Permet de check si une case existe
function check(x, y, plateau) {
    if (plateau[y] === undefined ) {
        return false;
    }
    return plateau[y][x] !== undefined && plateau[y][x] !== -1;

}

//Permet d'afficher le plateau
function show(plateau,robot) {
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
    }

    //Fait la direction du robot
    choixDirection() {
        if (check(this.x, this.y - 1)) {
            return "haut"
        }
        if (check(this.x + 1, this.y)) {
            return "droite"
        }
        if (check(this.x, this.y + 1)) {
            return "bas"
        }
        if (check(this.x - 1, this.y)) {
            return "gauche"
        }

    }

    //Deplace le robot
    move(direction,plateau) {
        switch (direction) {
            case "haut":
                plateau [this.x][this.y] = -1
                this.y--
                break;
            case "bas":
                plateau [this.x][this.y] = -1
                this.y++
                break;
            case "gauche":
                plateau [this.x][this.y] = -1
                this.x--
                break;
            case "droite":
                plateau [this.x][this.y] = -1
                this.x++
                break;
            default:
                console.log("Mauvaise direction")
                break;
        }
    }

    clean(plateau) {
        if (plateau[this.x][this.y] > 0) {
            plateau[this.x][this.y] = 0
        }
    }
}

function creationParti(postionXRobot, postionYRobot, energieMax, tailleXPlateau,tailleYPlateau,pourcentageSalete) {
    let robotAspi = new RobotAspi(postionXRobot,postionYRobot,energieMax)
    let plateau = createMap(tailleXPlateau, tailleYPlateau, pourcentageSalete )
    return [robotAspi, plateau]
}

function parti(robotAspi, plateau) {
    setInterval(() => {
        robotAspi.move(robotAspi.choixDirection())
    }, 1000)
}


partie= creationParti(0, 0, 20, 5, 5, 0.4)
plateau = partie[1]
robot = partie[0]
console.log(robot)
console.log(plateau)
show(plateau)
