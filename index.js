var http = require('http');
var fs = require('fs');
var path = require('path');

var PORT = 3002;

var server = http.createServer((req, res) => {
  if (req.url === '/') {
    return fs.readFile(path.resolve(`${__dirname}/public/index.html`), (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }

      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.end(data);
    });
  }

  if (
    req.url === '/api/SpiceUp.Ax-js-api.js' ||
    req.url === '/public/app.js'
  ) {
    return fs.readFile(path.resolve(`${__dirname}${req.url}`), function(
      err,
      data
    ) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }

      res.setHeader('Content-Type', 'application/javascript');
      res.writeHead(200);
      res.end(data);
    });
  }

  res.writeHead(404);
  res.end('Path not found');
});

server.listen(PORT, () => {
  console.log(`-- ${new Date().toISOString()}`);
  console.log(`-- server running at http://localhost:${PORT}`);
});
