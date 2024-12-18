const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware pour gérer les JSON
app.use(express.json());

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint pour traiter les données du formulaire
app.post('/api/submit', (req, res) => {
    const { userType, lastName, firstName, email, phone } = req.body;
    const filePath = path.join(__dirname, 'data.json');

    // Lire ou initialiser les données
    let data = [];
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        if (fileContent.trim()) {
            data = JSON.parse(fileContent);
        }
    }

    // Ajouter la nouvelle entrée
    data.push({ userType, lastName, firstName, email, phone });

    // Sauvegarder dans le fichier
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.json({ message: 'Inscription enregistrée avec succès !' });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
