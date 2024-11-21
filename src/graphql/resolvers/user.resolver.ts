import User, { UserDocument, UserInput } from '../../models/userModel';
import { ApolloError } from 'apollo-server-express'; 
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';


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
    async login(_: any, { input }: { input: { email: string, password: string } }) {
      try {
        const { email, password } = input;

        // Buscar al usuario en la base de datos
        const user = await User.findOne({ email });
        if (!user) {
          throw new ApolloError('Email or password is incorrect', 'USER_NOT_FOUND');
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new ApolloError('Email or password is incorrect', 'INVALID_CREDENTIALS');
        }

        // Generar un token JWT para el usuario autenticado
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

        // Retornar el token y los detalles del usuario
        return {
          token,
          user,
        };
      } catch (error) {
        console.error(error);
        throw new ApolloError('Error logging in', 'LOGIN_ERROR');
      }
    },
  }
};
