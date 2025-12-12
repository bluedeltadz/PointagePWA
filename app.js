// URL de ton Google Apps Script (API pointage)
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw9QmigOhu4AuuNZiWkzjWd3taLskPRaAfHQMBL6D3nl8_1YXDVygPfLdxSfPS3c-Zs/exec";

// Cette fonction s'exécute quand l'utilisateur clique sur Entrée ou Sortie
async function sendPointage(action) {
    const statusEl = document.getElementById("status");

    try {
        // Identification de l'utilisateur via le device
        let employee = localStorage.getItem("employee_id");

        // Si l'utilisateur n'a pas encore d'ID, on en crée un
        if (!employee) {
            employee = "EMP-" + Math.random().toString(36).substring(2, 10);
            localStorage.setItem("employee_id", employee);
        }

        // Construire les données à envoyer
        const payload = {
            employee: employee,
            action: action
        };

        // Envoyer au script Google (POST)
        const response = await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        // Comme no-cors empêche la réponse, on considère que l’envoi est OK
        statusEl.textContent = "✔️ Pointage enregistré avec succès !";
        statusEl.style.color = "green";

    } catch (error) {
        statusEl.textContent = "❌ Erreur : " + error;
        statusEl.style.color = "red";
    }
}
