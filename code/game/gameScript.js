/***********************************
 * INIT
 * **********************************/
let player = document.getElementById('player');
let spriteImg = document.getElementById('spriteImg');
let surface = document.getElementById('surface');

let startButton = document.getElementById('startButton');
let debug_output = document.getElementById('debug_output');

let direction = -1;

let item = document.getElementById('item')
let honk = document.getElementById('honk')
let counter = document.getElementById('counter')
let count = 0


let items = "./img/items/Mini_Golden_Bell.png"

let time = 60
let timerBox = document.getElementById('timer')

let playerCounter = 0;



// Scale the surface to 80% of the screen width
let surface_scale = 0.80 * (window.innerWidth / surface.clientWidth)
surface.style.transform = `scale(${surface_scale})`;



/***********************************
 * GAME CONFIG
 * **********************************/
let spriteImgNumber = 0; // current animation part of sprite image
let gameSpeed = 15; // game loop refresh rate (pictures per second)
let characterSpeed = 7; // move offset in PX



/***********************************
 * EVENT LISTENER
 * **********************************/
document.onkeydown = keydown_detected;
document.onkeyup = keyup_detected;

let leftArrow = false;
let rightArrow = false;
let upArrow = false;
let downArrow = false;
let space = false;
function keydown_detected(e) {
    //console.log(e);
    //console.log(e.keyCode);
    if (!e) {
        e = window.event; //Internet Explorer
    }
    if (e.keyCode == 37) { // leftArrow
        leftArrow = true;
    }
    if (e.keyCode == 38) { //upArrow
        upArrow = true;
    }
    if (e.keyCode == 39) { // rightArrow
        rightArrow = true;
    }
    if (e.keyCode == 40) { // downArrow
        downArrow = true;
    }
    if (e.keyCode == 32) { // space
        space = true;
    }
}
function keyup_detected(e) {
    //console.log(e);
    //console.log(e.keyCode);
    if (!e) {
        e = window.event; //Internet Explorer
    }
    if (e.keyCode == 37) { // leftArrow
        leftArrow = false;
    }
    if (e.keyCode == 38) { //upArrow
        upArrow = false;
    }
    if (e.keyCode == 39) { // rightArrow
        rightArrow = false;
    }
    if (e.keyCode == 40) { // downArrow
        downArrow = false;
    }
    if (e.keyCode == 32) { // space
        space = false;
    }

}

/* Functionto get the position of an element */
function getOffset(el) {
    const rect = el.getBoundingClientRect()
    return {
        x: rect.x + window.scrollX,
        y: rect.y + window.scrollY,
    }
}

/***********************************
 * GAME LOOP
 * **********************************/
function startGame() {
    player.style.left = '350px'; // starting position
    player.style.top = '180px'; // starting position
    player.style.opacity = '1'; // show player
    spriteImg.style.right = '0px'; // starting animation

    startButton.innerHTML = 'STARTED';
    startButton.removeAttribute('onclick');
    timer()
    gameLoop();
}
async function timer() {
    time--
    if (time == 0) {
        surface.style.background = "none"
        surface.style.border = "none"
        player.innerHTML = ""
        timerBox.innerHTML = ""
        item.innerHTML = ""
        honk.innerHTML = ""
        surface.innerHTML = `
            <div id="flexScore">
                <p>Playername</p>
                <p>Score</p>
                <p>${JSON.parse(sessionStorage['game'])}</p>
                <p>${count}</p>       
            </div>
        `
        surface.innerHTML += `
            <center>
                <a id="leaderbordLink" href="./game_leaderbord.html" onclick="safeScore()">Leaderbord</a>
            </center>
        `
        setTimeout(safeScore, 5000)
    }
    else {

        timerBox.innerHTML = `Sec: ${parseInt(time)}`
        setTimeout(timer, 1000)
    }
}

function gameLoop() {
    //Code for the Honk
    if (space) {
        document.getElementById('honkSound').play()
        document.getElementById('honk').style.opacity = 1;
    }
    if (space == false) {
        document.getElementById('honk').style.opacity = 0;
    }
    if (player.offsetLeft >= 0) {
        if (leftArrow) {
            movePlayer((direction) * characterSpeed, 0, direction);
            animatePlayer();
        }
    }
    if (player.offsetLeft <= surface.clientWidth - 58) {
        if (rightArrow) {
            movePlayer(characterSpeed, 0, 1)
            animatePlayer();
        }
    }

    if (player.offsetTop >= 2) {
        if (upArrow) {
            movePlayer(0, (-1) * characterSpeed, 0);
            animatePlayer();
        }
    }
    if (player.offsetTop <= surface.clientHeight - 55) {
        if (downArrow) {
            movePlayer(0, characterSpeed, 0);
            animatePlayer();
        }
    }

    if (isColliding(player, item, -15) == true) {
        genItems()
        count++;
        document.getElementById('grab').play()
    }
    counter.innerHTML = count
    setTimeout(gameLoop, 1000 / gameSpeed); // async recursion
}



/***********************************
 * MOVE
 * **********************************/
/**
 * @param {number} dx - player x move offset in pixel
 * @param {number} dy - player y move offset in pixel
 * @param {number} dr - player heading direction (-1: move left || 1: move right || 0: no change)
 */
function movePlayer(dx, dy, dr) {
    document.getElementById('walk1').play()

    // current position
    let x = parseFloat(player.style.left);
    let y = parseFloat(player.style.top);

    // calc new position
    x += dx;
    y += dy;

    // assign new position
    player.style.left = x + 'px';
    player.style.top = y + 'px';
    document.getElementById('honk').style.left = x + (15 * dr) + 'px';
    document.getElementById('honk').style.top = y - 20 + 'px';

    // handle direction
    if (dr != 0) {
        player.style.transform = `scaleX(${dr})`;
        document.getElementById('honk').style.transform = `scaleX(${dr})`;

    }

    // output in debugger box
    //debug_output.innerHTML = `x: ${x} | y: ${y} | direction: ${dr} | animation: ${spriteImgNumber}`;
}



/***********************************
 * ANIMATE PLAYER
 * **********************************/
function animatePlayer() {

    if (spriteImgNumber < 3) { // switch to next sprite position
        spriteImgNumber++;
        let x = parseFloat(spriteImg.style.right);
        x += 64.0; // ANPASSEN!
        spriteImg.style.right = x + "px";
    }
    else { // animation loop finished: back to start animation
        spriteImg.style.right = "0px";
        spriteImgNumber = 0;
    }

}
/**
 * Checks intersection between two html elements
 * @param {HTMLElement} div1 - Reference to first html element 
 * @param {HTMLElement} div2 - Reference to second html element
 * @param {number} tolerance - Integer to change accuracy of collission (0: default, negative number: detect later, positive number: detect earlier) 
 * @returns {boolean} - true or false depending on collision
 */function isColliding(div1, div2, tolerance = 0) {

    let d1OffsetTop = div1.offsetTop;
    let d1OffsetLeft = div1.offsetLeft;
    let d1Height = div1.clientHeight;
    let d1Width = div1.clientWidth;
    let d1Top = d1OffsetTop + d1Height;
    let d1Left = d1OffsetLeft + d1Width;

    let d2OffsetTop = div2.offsetTop;
    let d2OffsetLeft = div2.offsetLeft;
    let d2Height = div2.clientHeight;
    let d2Width = div2.clientWidth;
    let d2Top = d2OffsetTop + d2Height;
    let d2Left = d2OffsetLeft + d2Width;

    let distanceTop = d2OffsetTop - d1Top;
    let distanceBottom = d1OffsetTop - d2Top;
    let distanceLeft = d2OffsetLeft - d1Left;
    let distanceRight = d1OffsetLeft - d2Left;

    return !(tolerance < distanceTop || tolerance < distanceBottom || tolerance < distanceLeft || tolerance < distanceRight);
}

function genItems() {
    let randomTop = Math.floor(Math.random() * surface.clientHeight)
    console.log(randomTop)
    if (randomTop >= 318) {
        genItems()
    }
    else {
        item.style.top = `${randomTop}px`

    }

    let randomLeft = Math.floor(Math.random() * surface.clientWidth)
    if (randomLeft >= 713) {
        genItems()
    }
    else {
        item.style.left = `${randomLeft}px`

    }
    item.innerHTML = `<img src="${items}" style="width: 2.5vw;">`
}

/***********************************
 *             GAME FORUM
 * **********************************/
function setNameAndStart() {
    if (document.getElementById('input_name').value != "" ) {
        let playerName = document.getElementById('input_name').value
        sessionStorage['game'] = JSON.stringify(playerName)
        window.open("./game_main.html", "_self")
    }
    else{
        document.getElementById('message').innerHTML = `<p>Please enter a name!</p>`
    }
}
function printPlayer() {
    document.getElementById('playerNameOutput').innerHTML = playerName
}
function safeScore() {
    let playerName = JSON.parse(sessionStorage['game'])
    let playerScore = count
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
}
