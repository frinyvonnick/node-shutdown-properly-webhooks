const http = require('http');
const qs = require('querystring')
const fetch = require('node-fetch')

let subscribers = []

const server = http.createServer(function (req, res) {
  const params = qs.decode(req.url.split("?")[1]);
  if (params.mode === 'subscribe') {
    console.log('SUBSCRIBE ', params.callback)
    fetch(`${params.callback}?challenge=carotte&mode=subscribe`)
      .then(res => res.text())
      .then(challenge => {
        if (challenge === 'carotte') {
          console.log('SUCESSFULLY SUBSCRIBE')
          subscribers.push(params.callback)
        }
      })
  } else {
    console.log('UNSUBSCRIBE ', params.callback)
    fetch(`${params.callback}?challenge=chips&mode=unsubscribe`)
      .then(res => res.text())
      .then(challenge => {
        if (challenge === 'chips') {
          console.log('SUCESSFULLY UNSUBSCRIBE')
          const index = subscribers.findIndex(s => s === params.callback)
          subscribers.splice(index, 1)
        }
      })
      .catch(e => console.error("Subscriber is not available anymore..."))
  }
  res.writeHead(200)
  res.end()
}).listen(3000, function (err) {
  console.log('listening http://localhost:3000/');
  console.log('pid is ' + process.pid);
  setInterval(function () {
    console.log('SUBSCRIBERS', subscribers)
    subscribers.forEach(subscriber => {
      fetch(subscriber, { method: 'POST', body: JSON.stringify({ data: 'Hello' }) })
        .catch(e => console.error('Fail to send event to subscriber ' + subscriber))
    })
  }, 1000);
});

