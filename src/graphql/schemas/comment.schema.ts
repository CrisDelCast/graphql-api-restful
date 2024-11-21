import { gql } from 'apollo-server-express';

export const commentTypeDefs = gql`

type Comment {
    id: ID!
    content: String!
    userId: ID!
    parentId: ID
    createdAt: String!
    updatedAt: String!
}

input CommentInput {
    content: String!
    userId: ID!
    parentId: ID
}

type Query {
    getComments: [Comment]
    getCommentById(id: ID!): Comment
}

type Mutation {
    createComment(input: CommentInput): Comment
    updateComment(id: ID!, input: CommentInput): Comment
    deleteComment(id: ID!): String
}
`;
