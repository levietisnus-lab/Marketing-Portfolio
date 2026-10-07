const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3456;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

// Helper to read JSON request body
function readJsonBody(req, callback) {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
    if (body.length > 25 * 1024 * 1024) { // Max 25MB for high-res images
      req.destroy();
    }
  });
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      callback(null, data);
    } catch (err) {
      callback(err);
    }
  });
}

const server = http.createServer((req, res) => {
  // Enable CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const urlPath = req.url.split('?')[0];

  // API 1: Lưu toàn bộ dữ liệu PORTFOLIO_DATA vào tệp js/data.js
  if (req.method === 'POST' && urlPath === '/api/save-content') {
    readJsonBody(req, (err, payload) => {
      if (err || !payload || !payload.portfolioData) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Dữ liệu không hợp lệ' }));
        return;
      }

      const dataFilePath = path.join(__dirname, 'js', 'data.js');
      const fileHeader = `/**\n * Portfolio Data & Internationalization (VI & EN)\n * Lê Đức Việt - Digital Marketing / Content Creator / Multi-disciplinary\n * (Updated via Live Visual Editor)\n */\n\nconst PORTFOLIO_DATA = `;
      const fileContent = fileHeader + JSON.stringify(payload.portfolioData, null, 2) + ';\n';

      fs.writeFile(dataFilePath, fileContent, 'utf8', (writeErr) => {
        if (writeErr) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Không thể ghi tệp: ' + writeErr.message }));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Đã lưu vĩnh viễn vào js/data.js' }));
      });
    });
    return;
  }

  // API 2: Nhận tải ảnh trực tiếp và lưu vào thư mục assets/images
  if (req.method === 'POST' && urlPath === '/api/upload-image') {
    readJsonBody(req, (err, payload) => {
      if (err || !payload || !payload.data) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Dữ liệu ảnh không hợp lệ' }));
        return;
      }

      const matches = payload.data.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
      if (!matches) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Định dạng ảnh Base64 không hợp lệ' }));
        return;
      }

      const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
      const rawName = (payload.filename || 'custom_upload').replace(/[^a-zA-Z0-9_-]/g, '_');
      const filename = `${rawName}_${Date.now()}.${ext}`;
      const savePath = path.join(__dirname, 'assets', 'images', filename);

      const buffer = Buffer.from(matches[2], 'base64');
      fs.writeFile(savePath, buffer, (writeErr) => {
        if (writeErr) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Lỗi ghi ảnh: ' + writeErr.message }));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          url: `assets/images/${filename}`,
          filename: filename
        }));
      });
    });
    return;
  }

  // Static File Serving
  let reqPath = decodeURI(urlPath);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }
  const filePath = path.join(__dirname, reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: ' + reqPath);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
