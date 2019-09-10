import { gql } from 'apollo-server-express';

const schema = gql`

  type Query {
    hello: String
  }

  type Mutation {
    signup(email: String!, password: String!, username: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }

  type AuthPayload {
  token: String
  user: User
}

type User {
  id: ID!
  username: String!
  email: String!
  # links: [Link!]!
}

`;

module.exports = schema
