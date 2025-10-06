# TPs

## TP 1 - Express.js Basics

À partir du code de base dans le dossier `backend`, implémentez les fonctionnalités suivantes :
- Créer une route PATCH permettant de mettre à jour un utilisateur existant.  
- Créer une route DELETE permettant de supprimer un utilisateur existant.
- Modifier la route POST et ajouter à la route PATCH une validation des données reçues (par exemple, vérifier que le nom et l'âge sont présents).

**Attention** à bien respecter la norme RESTFUL, à savoir le contenu de la réponse, le respect des codes HTTP, le respect des méthodes HTTP (GET, POST, PUT, DELETE).

## TP 2 - Sequelize ORM
À partir du code de base dans le dossier `backend`, implémentez les fonctionnalités suivantes :
- Mettre en place l'encryptage du mot de passe lors de la création d'un utilisateur (utilisez la bibliothèque `bcrypt`).
- Mettre en place l'encryptage du mot de passe lors de la mise à jour d'un utilisateur (utilisez la bibliothèque `bcrypt`).