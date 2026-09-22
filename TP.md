# Recueil de Travaux Pratiques : Développement & Sécurité Web

Ce document regroupe une série de sujets de TP progressifs autour de l'application web, de son architecture backend et de sa sécurité.

---

## Sommaire
1. [TP 1 : Attaque par dictionnaire / Force Brute automatisée](#tp-1--attaque-par-dictionnaire--force-brute-automatisée)

---

## TP 1 : Attaque par dictionnaire / Force Brute automatisée

### Contexte
Une API d'authentification sans protection contre les requêtes répétées a été déployée. Un fichier de fuite de données contenant un million de mots de passe courants (`backend/passwords.txt`) est mis à votre disposition. L'objectif est de retrouver le mot de passe du compte `admin` en automatisant les tentatives de connexion.

### Objectifs pédagogiques
- Rétro-ingénierie et analyse manuelle d'un endpoint HTTP.
- Automatisation de requêtes réseau via un script (Python, Node.js ou Bash).
- Gestion de fichiers volumineux en flux (*streaming*).
- Gestion des codes de statut HTTP et des conditions d'arrêt.
