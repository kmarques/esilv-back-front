# 🟢 Node.js — Présentation Rapide & Référence

Node.js est un environnement d'exécution JavaScript côté serveur open-source et multiplateforme. Il permet d'exécuter du code JavaScript en dehors du navigateur pour concevoir des serveurs web, des APIs REST, des microservices et des outils en ligne de commande.

---

## ⚙️ Architecture & Moteur d'exécution

### 🏎️ Moteur V8
Node.js repose sur le moteur JavaScript **V8** (développé par Google pour Chromium). Il compile directement le code JavaScript en code machine natif pour garantir des performances optimales.

### 🔄 I/O Non-bloquantes (Core APIs)
Node.js fournit une riche bibliothèque d'APIs standard permettant de manipuler le système sans bloquer la boucle d'événements (*Event Loop*) : gestion des flux, accès au système de fichiers, manipulation de chemins, gestion des processus, etc.

---

## 🛠️ Modules natifs (Core) & Exemples d'utilisation

Voici quelques-uns des modules natifs les plus couramment utilisés :

### 1. `fs` — Système de fichiers
Permet de lire, créer, modifier ou supprimer des fichiers et dossiers (de manière synchrone, asynchrone ou via flux/streams).

```javascript
const fs = require('fs');

// Lister le contenu du répertoire courant de façon synchrone
const files = fs.readdirSync('.');
console.log('Fichiers :', files);
```

### 2. `path` — Gestion des chemins
Facilite la manipulation et la résolution des chemins de fichiers et répertoires de manière portable entre OS (Windows / POSIX).

```javascript
const path = require('path');

// Concaténation normalisée d'un chemin absolu
const fullPath = path.join(__dirname, 'src', 'index.js');
console.log('Chemin absolu :', fullPath);

// Récupérer le nom du fichier
console.log('Nom de fichier :', path.basename('/foo/bar/baz.txt')); // 'baz.txt'
```

### 3. `process` — Contrôle du processus Node.js
Donne accès aux métadonnées du processus en cours d'exécution et aux variables d'environnement.

```javascript
// Identifiant du processus (PID)
console.log('Process PID :', process.pid);

// Environnement d'exécution (production, development, test...)
console.log('Environnement :', process.env.NODE_ENV || 'development');
```

---

## ⚡ Prise en main d'Express

Le projet s'appuie sur le framework **Express** pour exposer des APIs HTTP modulaires (voir le code d'exemple dans [`BIC1/backend/server.js`](file:///Users/karl/projects/2026-2027/dev_web/BIC1/backend/server.js)).

### 1. Initialisation & Démarrage du serveur
Avec les modules ES (`"type": "module"` configuré dans le `package.json`), l'application s'instancie et écoute sur un port réseau :

```javascript
import express from 'express';

const app = express();
const PORT = 3000;

// Lancement de l'écoute HTTP
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```

> **Exécution en développement :** Le projet utilise la commande `node --watch server.js` (définie dans le script `npm run dev`) pour recharger automatiquement l'application à chaque sauvegarde.

---

### 2. Gestion du Body (`express.json()`)
Par défaut, Express ne parse pas le corps des requêtes entrantes. Le middleware `express.json()` analyse les requêtes dont le `Content-Type` est `application/json` et stocke les données parsées directement dans `req.body` :

```javascript
// Active le parsing automatique des requêtes au format JSON
app.use(express.json());
```

> 💡 **Pourquoi ce middleware est essentiel ?**
> Sans lui, `req.body` vaut `undefined`. Il faudrait alors lire le flux réseau manuellement par morceaux (*chunks*) avec `req.on('data')` et `req.on('end')` comme dans [`BIC1/scripts/server.js`](file:///Users/karl/projects/2026-2027/dev_web/BIC1/scripts/server.js).

---

### 3. Définition des routes & méthodes HTTP
Les routes associent une méthode HTTP (GET, POST, etc.) et un chemin d'URL à une fonction de traitement recevant les objets `request` (`req`) et `response` (`res`).

```javascript
// 🔹 Route GET : consultation / statut
app.get('/', (req, res) => {
  console.log({
    method: req.method,
    headers: req.headers,
    query: req.query, // Paramètres d'URL (?search=...)
    body: req.body
  });

  res.json({ success: true, method: 'GET' });
});

// 🔹 Route POST : réception de données via req.body
app.post('/', (req, res) => {
  console.log('Corps reçu :', req.body);
  res.json({ success: true, method: 'POST', data: req.body });
});

// 🔹 Route Healthcheck : surveillance de l'état du service
const uptime = Date.now();

app.get('/healthz', (req, res) => {
  res.json({
    uptime,
    status: 'OK'
  });
});
```

---

## 📦 Packages installés dans le projet

| Package | Rôle | Description |
| :--- | :--- | :--- |
| **`express`** | Framework Web | Serveur HTTP minimaliste, performant et système de routage robuste. |
| **`sequelize`** | ORM SQL | Modélisation objet relationnel (ORM), gestion des modèles, migrations et requêtes sans SQL brut. |
| **`pg`** | Driver Base de données | Client PostgreSQL officiel pour Node.js utilisé notamment par Sequelize. |
| **`bcrypt`** | Sécurité / Hashage | Hachage sécurisé et salage des mots de passe avant persistance en base. |
| **`jsonwebtoken`** | Authentification | Création, signature et vérification de tokens JWT (*JSON Web Tokens*). |

---

## 📖 Travaux Pratiques

Pour retrouver les sujets d'exercices et TP associés à ce dépôt :
👉 Consultez le fichier [TP.md](TP.md).
