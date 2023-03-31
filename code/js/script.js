let pistolBox = document.getElementById('boxPistols')
let rifleBox = document.getElementById('boxRifles')
let shotgunBox = document.getElementById('boxShotguns')
let bowBox = document.getElementById('boxBows')
let boxSights = document.getElementById('boxSights')

/* Functions which are loaded on the page onload */
genWeapons()
genSights()
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
function genSights(){
    for(let i = 0; i < sights.sights.length; i++){
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