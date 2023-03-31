let surface = document.getElementById('surface');

let playerName
let duckGenerationDiv = document.getElementById('ducks')
let duckPosY
let duckPosX = -150
let duckIdCount = 1

function setNameAndStart() {
    if (document.getElementById('input_name').value != "" ) {
        playerName = document.getElementById('input_name').value
        sessionStorage['game'] = JSON.stringify(playerName)
        window.open("./game_main.html", "_self")
    }
    else{
        document.getElementById('message').innerHTML = `<p>Bitte einen Namen eingeben</p>`
    }
}
function startGame() {
    gameLoop()
}
async function gameLoop() {
    moveDuck()

    generateDuck()
    setTimeout(gameLoop, 1000)
}
async function generateDuck() {
    let random = Math.floor(Math.random() * surface.clientHeight)
    duckGenerationDiv.innerHTML += `<img onclick="killDuck(this)" class="duck" id="duck${duckIdCount}" src="../img/game/flying_duck.gif" alt="flying_duck"></img>`
    document.getElementById(`duck${duckIdCount}`).style.top = random + "px"
    document.getElementById(`duck${duckIdCount}`).style.left = -150 + "px"
    duckIdCount++
}
async function moveDuck() {
    let tempDuckPosX = 0;
    for(let i = 1; i <= duckIdCount;i++){
        if(i == 1){
            tempDuckPosX = tempDuckPosX + (20 * i)
        }
        document.getElementById(`duck${i}`).style.left = tempDuckPosX + "px"
    }
    
}
async function killDuck(elem) {
    elem.remove()
}
