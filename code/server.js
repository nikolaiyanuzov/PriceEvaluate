const http = require('http');
const url = require('url');

const API_KEY = "pricesapi_F7wh32vHQzY51QPNmCUq9zIMDirAiqs";
const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/api/products' && req.method === 'GET') {
        try {
            const apiUrl = `https://api.pricesapi.io/api/v1/products/search?q=laptop&limit=10&api_key=${API_KEY}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            res.writeHead(200);
            res.end(JSON.stringify(data));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: error.message }));
        }
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});