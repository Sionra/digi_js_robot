//Permet de check si une case existe
function check(x, y, plateau, retourBase) {
    if (plateau[y] === undefined) {
        return false;
    }
    return plateau[y][x] !== undefined && plateau[y][x] !== -1 || retourBase;

}

//Permet d'afficher le plateau
function show(plateau, robot) {
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

    retourBase(plateau) {

    }

    //Fait la direction du robot
    choixDirection(plateau) {
        if (check(this.x, this.y - 1, plateau)) {
            return "haut"
        }
        if (check(this.x + 1, this.y, plateau)) {
            return "droite"
        }
        if (check(this.x, this.y + 1, plateau)) {
            return "bas"
        }
        if (check(this.x - 1, this.y, plateau)) {
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

    moveToBase(plateau) {
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

    setInterval(() => {
        if(taillePlateau !==0) {
            robotAspi.move(robotAspi.choixDirection(plateau), plateau)
            taillePlateau--
            show(plateau)

        }else{
            console.log("j'ai tout nettoyer")
        }
    }, 1000)
}


partie = creationParti(0, 0, 20, 3, 3, 0.4)
plateau = partie[1]
robot = partie[0]
console.log(robot)
console.log(plateau)
//show(plateau)
parti(robot, plateau)