const http = require('http');

const PORT = process.env.PORT || 3000;

// Identifiants de connexion
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'shaggy76';

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  console.log(Date.now(), req.method, url.pathname);
  // Route POST /login
  if (req.method === 'POST' && url.pathname === '/login') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      let username;
      let password;

      try {
        if (req.headers['content-type']?.includes('application/json')) {
          const parsed = JSON.parse(body);
          username = parsed.username;
          password = parsed.password;
        } else {
          const params = new URLSearchParams(body);
          username = params.get('username');
          password = params.get('password');
        }
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Format de requête invalide' }));
        return;
      }

      if (!username || !password) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Username et password requis' }));
        return;
      }

      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Connexion réussie' }));
      } else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Identifiants invalides' }));
      }
    });
    return;
  }

  // Route par défaut 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Route non trouvée' }));
});

server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
