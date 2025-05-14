const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = '';

    switch (req.url) {
    case '/':
      filePath = './home.html';
      break;
    case '/about':
      filePath = './about.html';
      break;
    case '/contact':
      filePath = './contact.html';
      break;

    default:
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>Página no encontrada</h1>');
      return;
  }

    fs.readFile(path.join(__dirname, filePath), 'utf-8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>Error al cargar la pagina</h1>');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});