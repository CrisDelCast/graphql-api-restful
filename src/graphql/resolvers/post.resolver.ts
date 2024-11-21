import { ApolloError } from 'apollo-server-errors';
import Post, { PostDocument, PostInput } from '../../models/postModel';

export const postResolvers = {
  Query: {
    async getPosts() {
      try {
        return await Post.find().populate('author'); 
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new ApolloError('Error fetching posts', 'POST_FETCH_ERROR', {
            message: error.message,
          });
        } else {
          throw new ApolloError('Unknown error occurred while fetching posts', 'POST_FETCH_UNKNOWN_ERROR');
        }
      }
    },
    async getPostById(_: any, { id }: { id: string }) {
      try {
        const post = await Post.findById(id).populate('author'); 
        if (!post) {
          throw new ApolloError('Post not found', 'POST_NOT_FOUND', {
            id,
          });
        }
        return post;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new ApolloError('Error fetching post by ID', 'POST_FETCH_ERROR', {
            message: error.message,
            id,
          });
        } else {
          throw new ApolloError('Unknown error occurred while fetching post by ID', 'POST_FETCH_UNKNOWN_ERROR');
        }
      }
    },
  },

  Mutation: {
    async createPost(_: any, { input }: { input: PostInput }) {
      try {
        const newPost = new Post(input);
        await newPost.save();
        return newPost;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new ApolloError('Error creating post', 'POST_CREATE_ERROR', {
            message: error.message,
          });
        } else {
          throw new ApolloError('Unknown error occurred while creating post', 'POST_CREATE_UNKNOWN_ERROR');
        }
      }
    },

    async updatePost(_: any, { id, input }: { id: string; input: PostInput }) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(id, input, { new: true });
        if (!updatedPost) {
          throw new ApolloError('Post not found for update', 'POST_NOT_FOUND', {
            id,
          });
        }
        return updatedPost;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new ApolloError('Error updating post', 'POST_UPDATE_ERROR', {
            message: error.message,
            id,
          });
        } else {
          throw new ApolloError('Unknown error occurred while updating post', 'POST_UPDATE_UNKNOWN_ERROR');
        }
      }
    },

    async deletePost(_: any, { id }: { id: string }) {
      try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
          throw new ApolloError('Post not found for deletion', 'POST_NOT_FOUND', {
            id,
          });
        }
        return `Post with ID ${id} was deleted successfully.`;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new ApolloError('Error deleting post', 'POST_DELETE_ERROR', {
            message: error.message,
            id,
          });
        } else {
          throw new ApolloError('Unknown error occurred while deleting post', 'POST_DELETE_UNKNOWN_ERROR');
        }
      }
    },
  },
};
