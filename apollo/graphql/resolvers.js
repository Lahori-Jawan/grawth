
// example data
const me = 'Nasir Khan';

const resolvers = {
  Query: {
    hello: () => me,
  },
};

module.exports = resolvers
