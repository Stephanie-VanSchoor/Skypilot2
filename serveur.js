// ===========================================================
// SERVEUR SKY PILOT – VERSION VIREMENT BANCAIRE
// ===========================================================
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = 3001;

const server = http.createServer((req, res) => {
    try {
        const url = new URL(req.url, `http://${req.headers.host}`);

        // Servir index.html
        if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
            const filePath = path.join(__dirname, 'index.html');
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath);
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(content);
            } else {
                res.writeHead(404);
                res.end('index.html not found');
            }
            return;
        }

        // 404 pour tout le reste
        res.writeHead(404);
        res.end('Not found');

    } catch (error) {
        console.error('Erreur serveur:', error);
        res.writeHead(500);
        res.end('Erreur interne');
    }
});

server.listen(PORT, () => {
    console.log('');
    console.log('✈️  SKY PILOT (virement bancaire)');
    console.log('=================================');
    console.log(`🌐 Serveur lancé sur http://localhost:${PORT}`);
    console.log(`🏦 IBAN : BE80 9733 8252 3877`);
    console.log('');
});