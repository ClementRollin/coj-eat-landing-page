document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Récupérer les données du formulaire
    const userType = document.querySelector('input[name="userType"]:checked').value;
    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Envoyer les données au serveur
    const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userType,
            lastName,
            firstName,
            email,
            phone,
        }),
    });

    const result = await response.json();
    document.getElementById('response').innerText = result.message;

    // Réinitialiser le formulaire
    document.getElementById('registrationForm').reset();
});
