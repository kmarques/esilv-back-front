# Node.js — Présentation rapide

[Node.js](https://nodejs.org/) est un environnement d'exécution JavaScript côté serveur. Il permet d'exécuter du JavaScript en dehors d'un navigateur pour construire des serveurs, des outils en ligne de commande et des applications réseau.

- [Moteur V8](https://v8.dev/)  
  Le moteur V8 (développé par Google) exécute le JavaScript sur machine.

- [Bibliothèque d'API (core)](https://nodejs.org/api/)  
  Node fournit une bibliothèque d'API standard (I/O non bloquante, gestion de fichiers, gestion des chemins, accès au processus, etc.). Exemples d'API courantes :

Exemples d'utilisation :

```js
// fs : accéder au système de fichiers
const fs = require('fs');
console.log(fs.readdirSync('.')); // liste les fichiers du répertoire courant

// path : manipulation de chemins de fichiers
const path = require('path');
console.log(path.join(__dirname, 'src', 'index.js'));
console.log(path.basename('/foo/bar/baz.txt')); // 'baz.txt'

// process : infos sur le processus et variables d'environnement
console.log(process.pid);
console.log(process.env.NODE_ENV || 'development');
```

## Packages installés
Voici une liste des packages Node.js installés dans ce projet, avec une brève description de chacun :

  - [express](https://expressjs.com/) — serveur HTTP minimal et Router
  - [sequelize](https://sequelize.org/) — ORM pour bases de données SQL, permet de définir des modèles et d'interagir avec la base de données sans écrire de SQL brut
  - [pg](https://node-postgres.com/) — pilote PostgreSQL pour Node.js
  - [bcrypt](https://www.npmjs.com/package/bcrypt) — pour le hachage sécurisé des mots de passe
  - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) — pour la gestion des tokens JWT, permet de créer et vérifier des tokens pour l'authentification

