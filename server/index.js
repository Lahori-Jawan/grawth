const { createServer } = require('http')
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const apollo = require('../apollo/graphql/server.js');
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const app = express()

app.use(bodyParser.urlencoded({ extended:  false }));
app.use(bodyParser.json());
app.use(cookieParser());  /* JSON.parse(req.cookies).auth -> req.cookies.auth */

apollo.applyMiddleware({ app })

const httpServer = createServer(app);
apollo.installSubscriptionHandlers(httpServer)

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)


  // Listen the server
  httpServer.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port} and
      graphql path for http is ${apollo.graphqlPath} and subscriptions path is ws://${host}:${port}${apollo.subscriptionsPath}`,
    badge: true
  })
}
start()
