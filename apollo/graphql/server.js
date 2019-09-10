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
    try {
      const token = req.cookies.token || req.headers.authorization || '';
      console.log('length', token.length, req.cookies.token, req.headers.authorization)
      const user = token.length ? verifyToken(token) : null

      if (!user)
        throw new Error('No User')

      // const user = await getUser(payload.tenant)

      return { user }
    } catch (err) {
      console.log(err)
      return {}
    }
  }
});

module.exports = SERVER
