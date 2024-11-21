import User, { UserDocument, UserInput } from '../../models/userModel';

export const userResolvers = {
  Query: {
    // Resolver para obtener un usuario por ID
    async getUserById(_: any, { id }: { id: string }) {
      return await User.findById(id);
    },
    // Resolver para obtener todos los usuarios
    async getUsers() {
      return await User.find();
    },
  },

  Mutation: {
    // Resolver para crear un nuevo usuario
    async createUser(_: any, { input }: { input: UserInput }) {
      const newUser = new User(input);
      await newUser.save();
      return newUser;
    },
  },
};
