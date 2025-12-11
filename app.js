let token = localStorage.getItem('pointage_token');
if(!token){
    token = 't'+Math.random().toString(36).substr(2,10);
    localStorage.setItem('pointage_token', token);
}

const main = document.getElementById('main');
main.innerHTML = `
  <button id="btnIn">Entrée</button>
  <button id="btnOut">Sortie</button>
`;

document.getElementById('btnIn').onclick = () => sendPointage('Entrée');
document.getElementById('btnOut').onclick = () => sendPointage('Sortie');

function sendPointage(type){
    const status = document.getElementById('status');

    fetch('https://script.google.com/macros/s/AKfycbw9QmigOhu4AuuNZiWkzjWd3taLskPRaAfHQMBL6D3nl8_1YXDVygPfLdxSfPS3c-Zs/exec', {
        method: 'POST',
        body: JSON.stringify({
            token: token,
            type: type,
            date: new Date()
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === "ok"){
            status.style.color = 'green';
            status.textContent = 'Pointage enregistré : ' + type + ' ✅';
        } else {
            status.style.color = 'red';
            status.textContent = 'Erreur serveur';
        }
    })
    .catch(err => {
        status.style.color = 'red';
        status.textContent = 'Erreur : ' + err;
    });
}

