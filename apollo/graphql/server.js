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
    console.log('cookie', req.cookies.auth)
    try {
      // const token = getToken(req.cookies.auth || req.headers.authorization)
      // const token = req.headers.authorization || '';
      const user = verifyToken(req.cookies.auth)

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
