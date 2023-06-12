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

let munition = 6
let points = 0
let time = 60
const mousePosText = document.getElementById('surface');
let mousePos = { x: undefined, y: undefined };

window.addEventListener('mousemove', (event) => {
    mousePos = { x: event.clientX, y: event.clientY };

});



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
    timer()
    startButton.remove()
    genMunition()
    generateDuck()
    document.getElementById('weaponImg').style.opacity = "1"
    gameLoop()
}
async function gameLoop() {

    if (mousePos.x < window.innerWidth / 2) {
        document.getElementById('weapon').style.transition = "all 0.5s"
        document.getElementById('weapon').style.transform = "scaleX(1)"
    } else {
        document.getElementById('weapon').style.transition = "all 0.5s"
        document.getElementById('weapon').style.transform = "scaleX(-1)"
    }
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
        <img id="duck" onclick="shoot(this)" src="../img/game/flying_duck.gif" alt="Flying Duck">
    `
    document.getElementById('duck').style.top = random + "px"
}


async function shoot() {
    if (munition > 0) {
        munition--
        document.getElementById('duck').remove()
        points += 1
        document.getElementById('points').innerHTML = `<p>Punkte: ${points}</p>`
        multiplier = 0
        genMunition()
        generateDuck()
    }
    if (munition == 0) {
        document.getElementById('reload').innerHTML = `<button id="reloadButton" onclick="reload()">Nachladen</button>`
    }
}
async function reload() {
    munition = 6
    genMunition()
    document.getElementById('reload').innerHTML = ""
}
async function genMunition() {
    document.getElementById('munition').innerHTML = ""
    for (let i = 1; i <= munition; i++) {
        document.getElementById('munition').innerHTML += `<img src="../img/game/bullet.png" alt="patrone">`

    }
}
function safeScore() {
    let playerName = JSON.parse(sessionStorage['game'])
    let playerScore = points
    localStorage['game']
    let person = {
        'name': playerName,
        'score': playerScore
    }
    let players = []
    if ((localStorage['game'])) {
        players = JSON.parse(localStorage['game'])
    }
    players.push(person)
    localStorage['game'] = JSON.stringify(players)

    window.open("./game_scoreboard.html", "_self")
}

async function timer() {
    time--
    if (time == 0) {
        timerBox.innerHTML = `Sec: ${parseInt(time)}`
        duckBox.remove()
        weapon.remove()
        
              
        document.getElementById('reload').innerHTML += `<button id="reloadButton" onclick="safeScore()">Bestenliste</button>`

    }
    else {
        timerBox.innerHTML = `Sec: ${parseInt(time)}`
        setTimeout(timer, 1000)
    }
}
function printLeaderbord() {
    let players = JSON.parse(localStorage['game']);
    console.log(players);
    players.sort((b, a) => a.score - b.score);
    // HTML Ausgabe generieren
    for (let i = 0; i < players.length; i++) {
        
        if (players[i].name == JSON.parse(sessionStorage['game'])) {
            table.innerHTML += `
            <tr>
                <td class="text-left" style="color: red;">${players[i].name}</td>
                <td class="text-left" style="color: red;">${players[i].score}</td>
            </tr>
        `
        }
        else {
            table.innerHTML += `
            <tr>
                <td class="text-left">${players[i].name}</td>
                <td class="text-left">${players[i].score}</td>
            </tr>
            `
        }
    }
}