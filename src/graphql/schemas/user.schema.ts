import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
type Query {
  getUserById(id: ID!): User
  getUsers: [User]
}

type Mutation {
  createUser(input: UserInput): User
}

type User {
  id: ID!
  name: String!
  email: String!
  role: String!
  createdAt: String!
  updatedAt: String!
}

input UserInput {
  name: String!
  email: String!
  password: String!
  role: String
}

type AuthPayload {
  token: String!
  user: User!
}

input LoginInput {
  email: String!
  password: String!
}

type Mutation {
  login(input: LoginInput!): AuthPayload
}

`;
