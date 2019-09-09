const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// ------- Graphql
// const bodyParser = require('body-parser');
const { ApolloServer, gql } = require('apollo-server-express');
// const { createServer } = require('http');
// const { execute, subscribe } = require('graphql');
// const { PubSub } = require('graphql-subscriptions');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const schema = require('../apollo/tools/schema');
const resolvers = require('../apollo/tools/resolvers');

const apollo = new ApolloServer({ typeDefs: schema, resolvers });
apollo.applyMiddleware({ app })
// const server = createServer(app)
// apollo.installSubscriptionHandlers(server)
// -------

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
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port} and graphql path is ${apollo.graphqlPath}`,
    badge: true
  })
}
start()
