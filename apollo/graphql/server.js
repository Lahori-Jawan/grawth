const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('apollo-server');
// const Cookie = require('cookieparser');
// const jwtAuth = require('../jwt/auth');
const { getToken, verifyToken } = require('../jwt/token')
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const SERVER = new ApolloServer({
  schema: makeExecutableSchema({typeDefs, resolvers}),
  playground: process.env.NODE_ENV !== 'production',
  context: async ({ req }) => {

    if(!req) return {}
    console.log('req, path', req.path)
    try {

      const token = req.cookies.token || req.headers.authorization || '';

      const user = token.length ? verifyToken(token) : null

      if (!user) throw new Error('Not Authenticated')

      // const user = await getUser(payload.tenant)

      return { user }

    } catch (err) {

      console.log('token verification catch', err)
      return {}

    }
  }
});

module.exports = SERVER
