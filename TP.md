# Recueil de Travaux Pratiques : Développement & Sécurité Web

Ce document regroupe une série de sujets de TP progressifs autour de l'application web, de son architecture backend et de sa sécurité.

---

## Sommaire
1. [TP 1 : Attaque par dictionnaire / Force Brute automatisée](#tp-1--attaque-par-dictionnaire--force-brute-automatisée)
2. [TP 2 : Scanner de ports & Détection de protocoles (SSH, HTTP, FTP)](#tp-2--scanner-de-ports--détection-de-protocoles-ssh-http-ftp)

---

## TP 1 : Attaque par dictionnaire / Force Brute automatisée

### Contexte
Une API d'authentification sans protection contre les requêtes répétées a été déployée. Un fichier de fuite de données contenant un million de mots de passe courants (`backend/passwords.txt`) est mis à votre disposition. L'objectif est de retrouver le mot de passe du compte `admin` en automatisant les tentatives de connexion.

### Objectifs pédagogiques
- Rétro-ingénierie et analyse manuelle d'un endpoint HTTP.
- Automatisation de requêtes réseau via un script (Python, Node.js ou Bash).
- Gestion de fichiers volumineux en flux (*streaming*).
- Gestion des codes de statut HTTP et des conditions d'arrêt.

---

## TP 2 : Scanner de ports & Détection de protocoles (SSH, HTTP, FTP)

### Contexte
La première étape d'un audit de sécurité ou d'une phase de reconnaissance consiste à cartographier la surface d'attaque d'un hôte en identifiant les services réseau actifs. Vous devez développer un outil en ligne de commande capable de scanner une machine (locale ou distante) afin de déterminer quels ports TCP sont ouverts et d'identifier automatiquement les protocoles standards qui y tournent (*banner grabbing*).

### Objectifs pédagogiques
- Comprendre le fonctionnement des sockets TCP (connexion, *three-way handshake*, gestion des délais d'attente / timeouts).
- Développer un scanner réseau asynchrone ou concurrentiel pour balayer efficacement une plage de ports.
- Implémenter des sondes d'identification de protocoles (*service detection*) via la lecture de bannières (*banner grabbing*).
- Formater et présenter les résultats d'audit sous une forme structurée et synthétique.

### Spécifications fonctionnelles

#### 1. Balayage des ports (Port Scanning)
- L'outil doit accepter en paramètre une cible (adresse IP ou nom d'hôte) et une plage de ports ou une liste de ports cibles (ex: `20-100` ou `21, 22, 80, 443, 3000`).
- Chaque tentative de connexion TCP (ex: module natif `net` en Node.js, `socket` en Python) doit être bornée par un timeout court (ex: 300 ms à 1 s) pour ne pas bloquer l'exécution lorsqu'un port est filtré ou silencieux.
- Gérer distinctement les états des ports : **Ouvert** (connexion acceptée) ou **Fermé / Filtré** (refus de connexion ou timeout).

#### 2. Détection des protocoles de base (*Banner Grabbing* & Sondes)
Pour chaque port détecté comme ouvert, le scanner tente d'identifier le protocole sous-jacent :
- **FTP (Port 21)** : Dès l'ouverture de la connexion, le serveur envoie spontanément un message d'accueil (bannière débutant généralement par le code `220`).
- **SSH (Port 22)** : Dès la poignée de main TCP, le serveur transmet sa version sous forme de chaîne d'identification (ex: `SSH-2.0-...`).
- **HTTP (Ports 80, 443, 3000, 8080...)** : Les serveurs HTTP étant silencieux à la connexion, le scanner doit envoyer une requête minimale (ex: `HEAD / HTTP/1.0\r\n\r\n` ou `GET / HTTP/1.1\r\nHost: <cible>\r\n\r\n`) et inspecter la réponse (`HTTP/1.x ...` et l'en-tête `Server:`).

#### 3. Restitution des résultats
Le programme doit afficher un tableau récapitulatif clair dans le terminal :

```text
PORT       ÉTAT     SERVICE     BANNIÈRE / VERSION DÉTECTÉE
21/tcp     OUVERT   FTP         220 ProFTPD 1.3.5 Server
22/tcp     OUVERT   SSH         SSH-2.0-OpenSSH_9.3p1
80/tcp     OUVERT   HTTP        nginx/1.24.0 (HTTP/1.1 200 OK)
3000/tcp   OUVERT   HTTP (Node) Express (HTTP/1.1 404 Not Found)
```

### Pistes d'approfondissement (Bonus)
- **Gestion de la concurrence** : Limiter le nombre de sockets ouvertes simultanément via un pool de workers ou une file d'attente pour éviter l'épuisement des descripteurs de fichiers (`EMFILE`).
- **Export JSON** : Ajouter une option `--json` pour exporter les résultats sous forme exploitable par d'autres scripts ou pipelines de sécurité.
