const http = require('http');
const fs = require('fs');
const path = require('path');

const API_KEY = "pricesapi_F7wh32vHQzY51QPNmCUq9zIMDirAiqs";
const PORT = process.env.PORT || 3000;

function sendFile(res, filePath, contentType = 'text/html') {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  // Add CORS headers for all responses (allows browser fetch)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = req.url;

  // API route
  if (url.startsWith('/api/products') && req.method === 'GET') {
  try {
    // Parse query string safely (need a base for the URL constructor)
    const parsed = new URL(req.url, `http://${req.headers.host}`);
    const qParam = (parsed.searchParams.get('q') || '').trim();

    if (!qParam) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing query parameter: q' }));
      return;
    }

    // Basic sanitization / limit length
    const qSafe = qParam.slice(0, 100);
    const apiUrl = `https://api.pricesapi.io/api/v1/products/search?q=${encodeURIComponent(qSafe)}&limit=10&api_key=${API_KEY}`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
  return;
}

  // Serve static files under /assets, /code, /structure
  // Map incoming path directly to repo folder (security: simple, for demo)
  const possiblePrefixes = ['/assets/', '/code/', '/structure/'];
  for (const prefix of possiblePrefixes) {
    if (url.startsWith(prefix)) {
      const filePath = path.join(__dirname, '..', url);
      // Infer content type
      const ext = path.extname(filePath).toLowerCase();
      const mime = ext === '.js' ? 'application/javascript'
                : ext === '.css' ? 'text/css'
                : ext === '.json' ? 'application/json'
                : ext === '.png' ? 'image/png'
                : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg'
                : 'text/plain';
      sendFile(res, filePath, mime);
      return;
    }
  }

  // Not found
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});