// Second part

const http = require('http');
const qs = require('querystring');
const fetch = require('node-fetch');

process.stdin.resume();

const server = http.createServer(function (req, res) {
  const params = qs.decode(req.url.split("?")[1]);
  if (params.mode) {
    res.writeHead(200);
    res.write(params.challenge);
    res.end();
    if (params.mode === 'unsubscribe') {
      server.close(function () {
        process.exit(0);
      });
    }
  } else {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
    });
    req.on("end", () => {
      console.log('event', JSON.parse(body))
      res.writeHead(200);
      res.end();
    });
  }
}).listen(9090, function (err) {
  console.log('listening http://localhost:9090/');
  console.log('pid is ' + process.pid);
  fetch('http://localhost:3000/webhook?mode=subscribe&callback=http://localhost:9090')
});

function handleExit() {
  console.log('Close my server properly')
  fetch('http://localhost:3000/webhook?mode=unsubscribe&callback=http://localhost:9090')
}

process.on('SIGINT', handleExit);
process.on('SIGTERM', () => handleExit)
process.on('SIGQUIT', () => handleExit)

/*
// First part

const http = require('http');

const server = http.createServer(function (req, res) {
  setTimeout(function () {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  }, 4000);
}).listen(9090, function (err) {
  console.log('listening http://localhost:9090/');
  console.log('pid is ' + process.pid);
});

function handleExit() {
  console.log('Close my server properly')
  server.close(function () {
    process.exit(0);
  });
}

process.on('SIGINT', handleExit);
process.on('SIGTERM', () => handleExit)
process.on('SIGQUIT', () => handleExit)
*/
