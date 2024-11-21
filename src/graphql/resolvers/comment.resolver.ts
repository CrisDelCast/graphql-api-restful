import Comment, { CommentDocument } from '../../models/commentModel';

export const commentResolvers = {
    Query: {
        async getComments() {
            return await Comment.find();
        },
        async getCommentById(_: any, { id }: { id: string }) {
            return await Comment.findById(id);
        },
    },

    Mutation: {
        async createComment(_: any, { input }: { input: CommentDocument }) {
            const newComment = new Comment(input);
            await newComment.save();
            return newComment;
        },
        async updateComment(_: any, { id, input }: { id: string; input: CommentDocument }) {
            const updatedComment = await Comment.findByIdAndUpdate(id, input, { new: true });
            if (!updatedComment) {
                throw new Error('Comment not found');
            }
            return updatedComment;
        },
        async deleteComment(_: any, { id }: { id: string }) {
            const deletedComment = await Comment.findByIdAndDelete(id);
            if (!deletedComment) {
                throw new Error('Comment not found');
            }
            return `Comment with ID ${id} was deleted successfully.`;
        },
    },
};
