import UserModel, { UserDocument, UserInput } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
    // Método para autenticar al usuario
    public async authenticate(userInput: UserInput) {
        try {
            // Buscar usuario por email
            const existingUser = await this.findUserByEmail(userInput.email);
            if (!existingUser) {
                throw new Error("User does not exist");
            }

            // Comparar la contraseña proporcionada con la almacenada
            const passwordMatches = await bcrypt.compare(userInput.password, existingUser.password);
            if (!passwordMatches) {
                throw new Error("Invalid credentials");
            }

            // Devolver un objeto con la información del usuario y un token generado
            return {
                email: existingUser.email,
                id: existingUser._id,
                token: this.createToken(existingUser),
            };
        } catch (error) {
            throw error;
        }
    }

    // Método para registrar un nuevo usuario
    public async register(userInput: UserInput): Promise<UserDocument> {
        try {
            // Comprobar si el usuario ya existe por email
            const existingUser = await this.findUserByEmail(userInput.email);
            if (existingUser) {
                throw new Error("User already exists");
            }

            // Hashear la contraseña antes de almacenar
            const hashedPassword = await bcrypt.hash(userInput.password, 10);
            const newUser = await UserModel.create({ ...userInput, password: hashedPassword });

            return newUser;
        } catch (error) {
            throw error;
        }
    }

    // Método para buscar un usuario por email
    public async findUserByEmail(email: string): Promise<UserDocument | null> {
        try {
            return await UserModel.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    // Método para obtener todos los usuarios
    public async getAllUsers(): Promise<UserDocument[]> {
        try {
            return await UserModel.find();
        } catch (error) {
            throw error;
        }
    }

    // Método para buscar un usuario por ID
    public async getUserById(id: string): Promise<UserDocument | null> {
        try {
            return await UserModel.findById(id);
        } catch (error) {
            throw error;
        }
    }

    // Método para actualizar un usuario
    public async updateUser(id: string, userInput: UserInput): Promise<UserDocument | null> {
        try {
            return await UserModel.findOneAndUpdate(
                { _id: id },
                userInput,
                { new: true } // Retorna el documento actualizado
            );
        } catch (error) {
            throw error;
        }
    }

    // Método para eliminar un usuario
    public async deleteUser(id: string): Promise<UserDocument | null> {
        try {
            return await UserModel.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

    // Método para generar un token JWT
    private createToken(user: UserDocument, deviceId: string = "default_device"): string {
        try {
            const payload = {
                id: user._id,       // ID del usuario
                email: user.email,  // Correo del usuario
                name: user.name,    // Nombre del usuario
                deviceId: deviceId  // Identificador único para la sesión o dispositivo
            };
            const secret = process.env.JWT_SECRET || "secret";  // Clave secreta
            const options = { expiresIn: "1h" };  // Puedes personalizar el tiempo de expiración aquí

            // Generar y devolver el token firmado
            return jwt.sign(payload, secret, options);
        } catch (error) {
            throw error;  // Si ocurre un error durante la firma del token, lo lanzamos
        }
    }
}

export default new UserService();
