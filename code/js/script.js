let pistolBox = document.getElementById('boxPistols')
let rifleBox = document.getElementById('boxRifles')
let shotgunBox = document.getElementById('boxShotguns')
let bowBox = document.getElementById('boxBows')
let boxSights = document.getElementById('boxSights')
let dlcBox = document.getElementById('dlc_box')
let reserve_box = document.getElementById('reserve_box')

ScrollReveal().reveal('.headline');


function randomBannerImage(){
    const randomNum = Math.floor(Math.random() * 21) + 1;
    document.getElementById('banner').innerHTML = `        
        <img src='../img/random/${randomNum}.jpg' alt="Background Image" id="bannerImage">
    `
}
function genWeapons() {
    for (let i = 0; i < weapons.pistols.length; i++) {
        pistolBox.innerHTML += `
            <div class='weaponCard'>
                <img class='weaponImg' src="${weapons.pistols[i].image}" alt="focoso">
                <h3>${weapons.pistols[i].name}</h3>
                <div class="grid">
                    <p>Rückstoß:</p>
                    <p>${weapons.pistols[i].recoil}</p>
                    <p>Nachladezeit:</p>
                    <p>${weapons.pistols[i].reload}</p>
                    <p>Hüstschuss:</p>
                    <p>${weapons.pistols[i].hipshot}</p>
                    <p>Magazin:</p>
                    <p>${weapons.pistols[i].magazine}</p>
                </div>
            </div>
        `
    }
    for (let i = 0; i < weapons.rifles.length; i++) {
        rifleBox.innerHTML += `
        <div class='weaponCard'>
            <img class='weaponImg' src="${weapons.rifles[i].image}" alt="focoso">
            <h3>${weapons.rifles[i].name}</h3>
            <div class="grid">
                <p>Rückstoß:</p>
                <p>${weapons.rifles[i].recoil}</p>
                <p>Nachladezeit:</p>
                <p>${weapons.rifles[i].reload}</p>
                <p>Hüstschuss:</p>
                <p>${weapons.rifles[i].hipshot}</p>
                <p>Magazin:</p>
                <p>${weapons.rifles[i].magazine}</p>
            </div>
        </div>
        `}
    for (let i = 0; i < weapons.shotguns.length; i++) {
        shotgunBox.innerHTML += `
        <div class='weaponCard'>
            <img class='weaponImg' src="${weapons.shotguns[i].image}" alt="focoso">
            <h3>${weapons.shotguns[i].name}</h3>
            <div class="grid">
                <p>Rückstoß:</p>
                <p>${weapons.shotguns[i].recoil}</p>
                <p>Nachladezeit:</p>
                <p>${weapons.shotguns[i].reload}</p>
                <p>Hüstschuss:</p>
                <p>${weapons.shotguns[i].hipshot}</p>
                <p>Magazin:</p>
                <p>${weapons.shotguns[i].magazine}</p>
            </div>
        </div>
        `
    }
    for (let i = 0; i < weapons.bows.length; i++) {
        bowBox.innerHTML += `
        <div class='weaponCard'>
            <img class='weaponImg' src="${weapons.bows[i].image}" alt="focoso">
            <h3>${weapons.bows[i].name}</h3>
            <div class="grid">
                <p>Rückstoß:</p>
                <p>${weapons.bows[i].recoil}</p>
                <p>Nachladezeit:</p>
                <p>${weapons.bows[i].reload}</p>
                <p>Hüstschuss:</p>
                <p>${weapons.bows[i].hipshot}</p>
                <p>Magazin:</p>
                <p>${weapons.bows[i].magazine}</p>
            </div>
        </div>
        `
    }
}
function genSights() {
    for (let i = 0; i < sights.sights.length; i++) {
        boxSights.innerHTML += `
        <div class='weaponCard'>
            <img class='weaponImg' src="${sights.sights[i].image}" alt="focoso">
            <h3>${sights.sights[i].name}</h3>
            <div class="grid">
                <p>Vergrößerung:</p>
                <p>${sights.sights[i].magnification}</p>
                <p>Preis:</p>
                <p>${sights.sights[i].Price}</p>
            </div>
        </div>
        
        `
    }
}
function genItems() {
    for (let i = 0; i < items.items.length; i++) {
        boxItems.innerHTML += `
        <div class='weaponCard'>
            <img class='weaponImg' src="${items.items[i].image}" alt="focoso">
            <h3>${items.items[i].name}</h3>
            <div class="grid">
                <p>Stärke:</p>
                <p>${items.items[i].strength}</p>
                <p>Dauer:</p>
                <p>${items.items[i].duration}</p>
                <p>Reichweite:</p>
                <p>${items.items[i].range}</p>
                <p>Preis:</p>
                <p>${items.items[i].Price}</p>
            </div>
        </div>
        
        `
    }
}
function genDlcs() {
    for (let i = 0; i < dlcs.dlcs.length; i++) {
        if (i % 2 == 0) {
            dlcBox.innerHTML += `
            <div class="dlcGrid1">
                <img class="dlcImg" src="${dlcs.dlcs[i].image}" alt="">
                <div>
                    <h2 class="dlcName">${dlcs.dlcs[i].name}</h2>
                    <p class="dlcText">${dlcs.dlcs[i].text}</p>
                </div>
            </div>
        `
        } else {
            dlcBox.innerHTML += `
            <div class="dlcGrid2">
                <div>
                    <h2 class="dlcName">${dlcs.dlcs[i].name}</h2>
                    <p class="dlcText">${dlcs.dlcs[i].text}</p>
                </div>
                <img class="dlcImg" src="${dlcs.dlcs[i].image}" alt="">
            </div>
        `
        }


    }
}
function getParamReserve(value) {
    let inputUrl = new URL(window.location)
    console.log(window.location)
    let inputParams = new URLSearchParams(inputUrl.search)
    inputParams.append('reserve', `${value}`);
    let reserve = new URL(window.location.toLocaleString()).searchParams.get('reserve')

    console.log(inputParams.get('reserve'))
    setParam(inputParams.get('reserve'))
}
function setParam(reserve) {
    window.open(`./reserve.html?=${reserve}`, "_self")
}
function changeReserveImg(reserve) {
    document.getElementById(reserve).style.zIndex = "3"
}
function setReserveImgBack(reserve) {    
    document.getElementById(reserve).style.zIndex = "1"
}
function getParamToGenerate() {
    let reserve = "" + new URLSearchParams(window.location.search).get('') + ""
    let s = `reserves.${reserve}`
    let final_reserve = eval(s)
    // HEADER TEXT
    document.getElementById('headerText').innerHTML = final_reserve.name

    // GENERATION
    let temp_html = ""

    temp_html += `<img id="reserve_card" src="${final_reserve.cardLink}" alt="Karte">`
    temp_html += "<div id='animals'>"
    temp_html += "<h2>Tiere</h2>"
    for (let i = 0; i < final_reserve.animals.length; i++) {
        temp_html += `<p>${final_reserve.animals[i]}</p>`
    }
    temp_html += "</div>"

    reserve_box.innerHTML = temp_html
    document.getElementById('banner').innerHTML = `
        <img src='${final_reserve.background}' alt="Background Image" id="bannerImage">
    `

}
