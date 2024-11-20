import { Request, Response } from "express";
import { UserDocument, UserInput } from "../models/userModel";
import userService from "../services/user.service";

class UserController {
    // Método para crear un nuevo usuario
    public async register(req: Request, res: Response) {
        const userData: UserInput = req.body;
        try {
            const newUser = await userService.register(userData);
            return res.status(201).json(newUser);
        } catch (err) {
            const error = err as Error; // Especificar explícitamente el tipo del error
            if (error.message === "User already exists") {
                return res.status(400).json({ message: "User already exists" });
            }
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Método para el login de usuario
    public async authenticate(req: Request, res: Response) {
        const credentials = req.body;
        try {
            const authResult = await userService.authenticate(credentials);
            return res.status(200).json(authResult);
        } catch (err) {
            const error = err as Error;
            if (error.message === "Unauthorized") {
                return res.status(401).json({ message: "Unauthorized access" });
            }
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Método para obtener un usuario por su perfil
    public async getUser(req: Request, res: Response) {
        const userId = req.params.profile;
        try {
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: `User with id ${userId} not found` });
            }
            return res.status(200).json(user);
        } catch (err) {
            const error = err as Error;
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Método para obtener todos los usuarios
    public async listUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            return res.status(200).json(users);
        } catch (err) {
            const error = err as Error;
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Método para actualizar un usuario
    public async modifyUser(req: Request, res: Response) {
        const loggedUser = req.body.loggedUser;
        const userId = req.params.profile;
        const userData: UserInput = req.body;
        try {
            if (loggedUser.role !== "superadmin") {
                return res.status(403).json({ message: "Permission denied: Only superadmins can modify users." });
            }

            const updatedUser = await userService.updateUser(userId, userData);
            if (!updatedUser) {
                return res.status(404).json({ message: `User with id ${userId} not found` });
            }
            return res.status(200).json(updatedUser);
        } catch (err) {
            const error = err as Error;
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Método para eliminar un usuario
    public async removeUser(req: Request, res: Response) {
        const userId = req.params.profile;
        const loggedUser = req.body.loggedUser;
        try {
            if (loggedUser.role !== "superadmin") {
                return res.status(403).json({ message: "Permission denied: Only superadmins can delete users." });
            }

            if (loggedUser.id === userId) {
                return res.status(403).json({ message: "Cannot delete your own account." });
            }

            const deletedUser = await userService.deleteUser(userId);
            if (!deletedUser) {
                return res.status(404).json({ message: `User with id ${userId} not found` });
            }

            return res.status(200).json({ message: `User with id ${userId} successfully deleted.` });
        } catch (err) {
            const error = err as Error;
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}

export default new UserController();
