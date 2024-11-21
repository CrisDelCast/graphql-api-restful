import Comment, { CommentDocument } from '../../models/commentModel';
import { ApolloError } from 'apollo-server-express'; 

export const commentResolvers = {
    Query: {
        async getComments() {
            try {
                return await Comment.find();
            } catch (error: unknown) {
                if (error instanceof ApolloError) {
                    throw new ApolloError('Error fetching comments', 'FETCH_ERROR', { error });
                }
                throw new Error('An unexpected error occurred');
            }
        },

        async getCommentById(_: any, { id }: { id: string }) {
            try {
                const comment = await Comment.findById(id);
                if (!comment) {
                    throw new ApolloError('Comment not found', 'COMMENT_NOT_FOUND', { id });
                }
                return comment;
            } catch (error: unknown) {
                if (error instanceof ApolloError) {
                    throw error; // Si es un ApolloError, lo volvemos a lanzar
                }
                if (error instanceof Error) {
                    throw new ApolloError('Error fetching comment by ID', 'FETCH_ERROR', { error: error.message });
                }
                throw new ApolloError('An unexpected error occurred', 'UNEXPECTED_ERROR');
            }
        },
    },

    Mutation: {
        async createComment(_: any, { input }: { input: CommentDocument }) {
            try {
                const newComment = new Comment(input);
                await newComment.save();
                return newComment;
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new ApolloError('Error creating comment', 'CREATE_ERROR', { error: error.message });
                }
                throw new ApolloError('An unexpected error occurred', 'UNEXPECTED_ERROR');
            }
        },

        async updateComment(_: any, { id, input }: { id: string; input: CommentDocument }) {
            try {
                const updatedComment = await Comment.findByIdAndUpdate(id, input, { new: true });
                if (!updatedComment) {
                    throw new ApolloError('Comment not found', 'COMMENT_NOT_FOUND', { id });
                }
                return updatedComment;
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new ApolloError('Error updating comment', 'UPDATE_ERROR', { error: error.message });
                }
                throw new ApolloError('An unexpected error occurred', 'UNEXPECTED_ERROR');
            }
        },

        async deleteComment(_: any, { id }: { id: string }) {
            try {
                const deletedComment = await Comment.findByIdAndDelete(id);
                if (!deletedComment) {
                    throw new ApolloError('Comment not found', 'COMMENT_NOT_FOUND', { id });
                }
                return `Comment with ID ${id} was deleted successfully.`;
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new ApolloError('Error deleting comment', 'DELETE_ERROR', { error: error.message });
                }
                throw new ApolloError('An unexpected error occurred', 'UNEXPECTED_ERROR');
            }
        },
    },
};
