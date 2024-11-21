import { gql } from 'apollo-server-express';

export const reactionTypeDefs = gql`
    type Reaction {
        id: ID!
        type: String!
        userId: ID!
        commentId: ID!
        createdAt: String
        updatedAt: String
    }

    input ReactionInput {
        type: String!
        userId: ID!
        commentId: ID!
    }

    type Query {
        getReactions: [Reaction]
        getReactionById(id: ID!): Reaction
    }

    type Mutation {
        createReaction(input: ReactionInput!): Reaction
        updateReaction(id: ID!, input: ReactionInput!): Reaction
        deleteReaction(id: ID!): String
    }
`;
