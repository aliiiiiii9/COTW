let table = document.getElementById('table')

printLeaderbord()
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