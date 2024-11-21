import User, { UserDocument, UserInput } from '../../models/userModel';
import { ApolloError } from 'apollo-server-express'; 

export const userResolvers = {
  Query: {
    async getUserById(_: any, { id }: { id: string }) {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new ApolloError('User not found', 'USER_NOT_FOUND', { id });
        }
        return user;
      } catch (error: unknown) {
        if (error instanceof ApolloError) {
          throw error; 
        }
        if (error instanceof Error) {
          throw new ApolloError('Error fetching user by ID', 'FETCH_USER_ERROR', { error: error.message });
        }
        throw new ApolloError('An unexpected error occurred', 'UNEXPECTED_ERROR');
      }
    },

    async getUsers() {
      try {
        return await User.find();
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new ApolloError('Error fetching users', 'FETCH_USERS_ERROR', { error: error.message });
        }
        throw new ApolloError('An unexpected error occurred', 'UNEXPECTED_ERROR');
      }
    },
  },

  Mutation: {
    async createUser(_: any, { input }: { input: UserInput }) {
      try {
        const newUser = new User(input);
        await newUser.save();
        return newUser;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new ApolloError('Error creating user', 'CREATE_USER_ERROR', { error: error.message });
        }
        throw new ApolloError('An unexpected error occurred', 'UNEXPECTED_ERROR');
      }
    },
  },
};
