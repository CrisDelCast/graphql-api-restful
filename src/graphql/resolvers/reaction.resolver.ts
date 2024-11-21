import Reaction, { ReactionDocument } from '../models/Reaction';

export const reactionResolvers = {
    Query: {
        async getReactions() {
            return await Reaction.find();
        },
        async getReactionById(_: any, { id }: { id: string }) {
            return await Reaction.findById(id);
        },
    },

    Mutation: {
        async createReaction(_: any, { input }: { input: ReactionDocument }) {
            const newReaction = new Reaction(input);
            await newReaction.save();
            return newReaction;
        },
        async updateReaction(_: any, { id, input }: { id: string; input: ReactionDocument }) {
            const updatedReaction = await Reaction.findByIdAndUpdate(id, input, { new: true });
            if (!updatedReaction) {
                throw new Error('Reaction not found');
            }
            return updatedReaction;
        },
        async deleteReaction(_: any, { id }: { id: string }) {
            const deletedReaction = await Reaction.findByIdAndDelete(id);
            if (!deletedReaction) {
                throw new Error('Reaction not found');
            }
            return `Reaction with ID ${id} was deleted successfully.`;
        },
    },
};
