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
    fetch('https://script.google.com/macros/s/AKfycbwTlzd0E6Xt9XiVt2SyKFEsy32ku_gXl-XlqSzUkWvBMa34vQu9WLXvXnkDSf6fVcaD/exec', {
        method:'POST',
        body:JSON.stringify({token,type,date:new Date()}),
        headers:{'Content-Type':'application/json'}
    }).then(res=>{
        status.textContent = 'Pointage enregistré : '+type+' ✅';
    }).catch(err=>{
        status.textContent = 'Erreur : '+err;
        status.style.color='red';
    });
}

