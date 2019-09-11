import { gql } from 'apollo-server-express';

const schema = gql`

  type Query {
    hello: String
  }

  type Mutation {
    signup(email: String!, password: String!, username: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }

  # Article: https://medium.com/@itReverie/subscriptions-in-graphql-with-apollo-2-0-6db44401f009
  type Subscription {
    userCreated: AuthPayload
    # messageUpdated(id: Int!): Message
  }

  type AuthPayload {
  token: String
  user: User
}

type User {
  id: ID!
  username: String!
  email: String!
}

`;

module.exports = schema
