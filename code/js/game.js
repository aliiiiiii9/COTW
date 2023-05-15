let surface = document.getElementById('surface');
let playerName
let duckGenerationDiv = document.getElementById('duckGenBox')
let duckPosY
let duckPosX = -150
let duckMoveCount = -1

function setNameAndStart() {
    if (document.getElementById('input_name').value != " " && document.getElementById('input_name').value != "") {
        playerName = document.getElementById('input_name').value
        sessionStorage['game'] = JSON.stringify(playerName)
        window.open("./game_main.html", "_self")
    }
    else {
        document.getElementById('message').style.color = "rgb(145, 23, 23)"
    }
}
function startGame() {
    generateDuck()
    gameLoop()
}
async function gameLoop() {
    moveDuck()

    setTimeout(gameLoop, 200)
}
async function generateDuck() {
    let random = Math.floor(Math.random() * surface.clientHeight)

    duckGenerationDiv.innerHTML += `
        <img onclick="killDuck(this)" id="duck" src="../img/game/flying_duck.gif" alt="flying_duck">
    `
    document.getElementById(`duck`).style.top = random + "px"
    document.getElementById(`duck`).style.left = -150 + "px"
}
async function moveDuck() {
    if(duckPosCor()){
        let tempDuckPosX = 0;
        duckMoveCount++
        tempDuckPosX = tempDuckPosX + (40 * duckMoveCount)
        document.getElementById(`duck`).style.left = tempDuckPosX + "px"
    }
    else{
        document.getElementById('duck').remove
    }
}
async function killDuck(elem) {
    elem.remove()
    duckMoveCount= -20
    generateDuck()
}
function duckPosCor(){
    let duckPosLeft = document.getElementById('duck').style.left.substring(1,document.getElementById('duck').style.left.length-1)
    if(duckPosLeft > window.innerWidth){
        return false
    }
    else{
        return true
    }
}
