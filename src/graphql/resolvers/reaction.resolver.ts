import Reaction, { ReactionDocument } from '../../models/reactionModel';
import { ApolloError } from 'apollo-server-express'; 

export const reactionResolvers = {
    Query: {
        async getReactions() {
            try {
                return await Reaction.find();
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new ApolloError('Error fetching reactions', 'FETCH_ERROR', { error: error.message });
                }
                throw new ApolloError('An unexpected error occurred', 'UNEXPECTED_ERROR');
            }
        },

        async getReactionById(_: any, { id }: { id: string }) {
            try {
                const reaction = await Reaction.findById(id);
                if (!reaction) {
                    throw new ApolloError('Reaction not found', 'REACTION_NOT_FOUND', { id });
                }
                return reaction;
            } catch (error: unknown) {
                if (error instanceof ApolloError) {
                    throw error; 
                }
                if (error instanceof Error) {
                    throw new ApolloError('Error fetching reaction by ID', 'FETCH_ERROR', { error: error.message });
                }
                throw new ApolloError('An unexpected error occurred', 'UNEXPECTED_ERROR');
            }
        },
    },

    Mutation: {
        async createReaction(_: any, { input }: { input: ReactionDocument }) {
            try {
                const newReaction = new Reaction(input);
                await newReaction.save();
                return newReaction;
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new ApolloError('Error creating reaction', 'CREATE_ERROR', { error: error.message });
                }
                throw new ApolloError('An unexpected error occurred', 'UNEXPECTED_ERROR');
            }
        },

        async updateReaction(_: any, { id, input }: { id: string; input: ReactionDocument }) {
            try {
                const updatedReaction = await Reaction.findByIdAndUpdate(id, input, { new: true });
                if (!updatedReaction) {
                    throw new ApolloError('Reaction not found', 'REACTION_NOT_FOUND', { id });
                }
                return updatedReaction;
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new ApolloError('Error updating reaction', 'UPDATE_ERROR', { error: error.message });
                }
                throw new ApolloError('An unexpected error occurred', 'UNEXPECTED_ERROR');
            }
        },

        async deleteReaction(_: any, { id }: { id: string }) {
            try {
                const deletedReaction = await Reaction.findByIdAndDelete(id);
                if (!deletedReaction) {
                    throw new ApolloError('Reaction not found', 'REACTION_NOT_FOUND', { id });
                }
                return `Reaction with ID ${id} was deleted successfully.`;
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new ApolloError('Error deleting reaction', 'DELETE_ERROR', { error: error.message });
                }
                throw new ApolloError('An unexpected error occurred', 'UNEXPECTED_ERROR');
            }
        },
    },
};
