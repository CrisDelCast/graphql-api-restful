import { gql } from 'apollo-server-express';

export const postTypeDefs = gql`

type Post {
    id: ID!
    title: String!
    content: String!
    author: String!  # Relación con el modelo User
    createdAt: String!
    updatedAt: String!
}


input PostInput {
    title: String!
    content: String!
    author: ID! 
}

type Query {
    getPosts: [Post]
    getPostById(id: ID!): Post
}

type Mutation {
    createPost(input: PostInput): Post
    updatePost(id: ID!, input: PostInput): Post
    deletePost(id: ID!): String
}
`;
