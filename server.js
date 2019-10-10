const express = require('express');
const redis = require("redis");
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const client  = redis.createClient(process.env.REDIS_URL);
const app = express();

app.use(session({
  secret: 'dale',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
  store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
}))

app.get('/', (req, res) => {
  client.set('testing', 'set')
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
