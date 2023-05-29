/*let surface = document.getElementById('surface');
let playerName
let duckGenerationDiv = document.getElementById('duckBox')
let duckPosY
let duckPosX = -5
let duckMoveCount = 0

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
    document.getElementById('startButton').remove()
}
async function gameLoop() {
    moveDuck()

    setTimeout(gameLoop, 100)
}
async function generateDuck() {
    let random = Math.floor(Math.random() * surface.offsetHeight-20)

    duckGenerationDiv.innerHTML = `
        <img onclick="killDuck(this)" id="duck" src="../img/game/flying_duck.gif" alt="flying_duck">
    `
    document.getElementById(`duck`).style.top = random + "px"
    document.getElementById(`duck`).style.left = 0 + "px"
}
async function moveDuck() {
    if(duckPosCor()){
        let tempDuckPosX = 0;
        duckMoveCount++
        tempDuckPosX = tempDuckPosX + (30 * duckMoveCount)
        document.getElementById(`duck`).style.left = tempDuckPosX + "px"
    }
    else{
        console.log('new');
        duckMoveCount = -1
        killDuck(document.getElementById('duck'))
    }
}
async function killDuck(elem) {
    elem.remove()
    duckMoveCount= -5
    generateDuck()
}
function duckPosCor(){
    let duckPosLeft = document.getElementById('duck').style.left.substring(1,document.getElementById('duck').style.left.length-2)
    if(duckPosLeft <= window.innerWidth){
        return true
    }
    else{
        console.log('true');
        return false
    }
}

*/


let playerName
let startButton = document.getElementById('startButton')
let duckBox = document.getElementById('duckBox')
let surface = document.getElementById('surface')
let surfaceHeight = surface.offsetHeight - surface.offsetTop
let multiplier = 0;
let weapon = document.getElementById('weapon')


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
    startButton.remove()
    generateDuck()
    gameLoop()
}
async function gameLoop() {

    moveDuck()
    multiplier++

    setTimeout(gameLoop, 50)
}
async function generateDuck() {
    let random = Math.floor(Math.random() * surfaceHeight)


    duckBox.innerHTML = `
        <img id="duck" onclick="shoot()" src="../img/game/flying_duck.gif" alt="Flying Duck">
    `
    document.getElementById('duck').style.top = random + "px"
}
async function moveDuck() {

    if (document.getElementById('duck').style.left.substring(0, document.getElementById('duck').style.left.length - 2) < surface.clientWidth - document.getElementById('duck').clientWidth) {
        let tempDuckPos = 10 * multiplier
        document.getElementById('duck').style.left = tempDuckPos + "px"

    } else {
        console.log("ELSE");
        
        multiplier = 0
        resetDuck()
    }
}
async function resetDuck() {
    let random = Math.floor(Math.random() * surfaceHeight)
    duckBox.innerHTML = `
        <img id="duck" onclick="shoot()" src="../img/game/flying_duck.gif" alt="Flying Duck">
    `
    document.getElementById('duck').style.top = random + "px"
}