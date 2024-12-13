//Permet de check si une case existe
function check(x, y,plateau){
    if(plateau[y]===undefined){
        return false;
    }
    return plateau[y][x] !== undefined;

}

//Permet d'afficher le plateau
function show(plateau){
    plateau.map( (line) => {
        console.log(line)
    })
}

//Permet de cree le plateau
function createMap(sizeX,sizeY) {
    let plateau = []
    for(let x=0; x<sizeX; x++){
        plateau.push([])
        for(let y=0; y<sizeY; y++){
            plateau[x].push(Math.round(Math.random()*100))
        }
    }
    return plateau
}

//Notre class Robot ( •̀ ω •́ )✧
class RobotAspi{
    constructor() {
        this.x=0
        this.y=0
        this.positionBase=[0,0]
        this.energieMax=20
        this.energieActuelle=this.energieMax
    }

    //Fait la direction du robot
    choixDirection() {
        if(check(this.x,this.y-1)){return "haut"}
        if(check(this.x,this.y+1)){return "bas"}
        if(check(this.x-1,this.y)){return "gauche"}
        if(check(this.x+1,this.y)){return "droite"}

    }

    //Deplace le robot
    move(direction){
        switch (direction) {
            case "haut":
                this.y--
                break;
            case "bas":
                this.y++
                break;
            case "gauche":
                this.x--
                break;
            case "droite":
                this.x++
                break;
            default:
                console.log("Mauvaise direction")
                break;
        }
    }
    clean(plateau){
        if(plateau[y]===undefined){}
    }
}
show(createMap(3,4))
plateau=createMap(2,2)
show(plateau)
