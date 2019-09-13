const { PubSub, withFilter } = require('apollo-server');
const { createTokens } = require('../jwt/token');
// example data
const me = 'Nasir Khan';
const users = [
  { id: 1, username: 'lahori', email: 'virgo@mail.com', password: '123'},
  { id: 2, username: 'lahori-buddha', email: 'buddha@mail.com', password: '123'},
  { id: 3, username: 'lahori-lahori', email: 'lahori@mail.com', password: '123'},
]
// for subscriptions
const USER_CREATED = 'USER_CREATED';
// const USER_UPDATED = 'MESSAGE_UPDATED';
const pubsub = new PubSub();

const resolvers = {
  Query: {
    hello: () => me,
  },

  Mutation: {
    async signup(parent, args, context, info) {
      // 1
      // const password = await bcrypt.hash(args.password, 10)
      // 2
      // const user = await createUser({ ...args, password })
      const index = users.push({id: users.length+1, ...args})
      const user = users[index - 1]

      // 3
      const token = createTokens({ userId: user.id })[0]
      await pubsub.publish(USER_CREATED, { userCreated: {user, token} });
      // console.log({user, token, args})
      // 4
      return {
        token,
        user,
      }
    },

    async login(parent, args, context, info) {
      // 1
      // const user = await context.prisma.user({ email: args.email })
      let user = null
      users.some(usr => user = usr.email === args.email && usr.password === args.password ? usr : null )
      if (!user) {
        throw new Error('No such user found')
      }

      // 2
      // const valid = await bcrypt.compare(args.password, user.password)
      // if (!valid) {
      //   throw new Error('Invalid password')
      // }

      const token = createTokens({ userId: user.id })[0]
      console.log({token, user})
      // 3
      return {
        token,
        user,
      }
    }
  },

  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterator([USER_CREATED]),
    },
    // messageUpdated: {
    //   subscribe: withFilter(
    //     () => pubsub.asyncIterator('MESSAGE_UPDATED'),
    //       (payload, variables) => {
    //         return payload.messageUpdated.id === variables.id;
    //       },
    //     ),
    // },
  }

};

module.exports = resolvers
