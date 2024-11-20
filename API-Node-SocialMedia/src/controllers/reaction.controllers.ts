import { Request, Response } from 'express';
import ReactionService from '../services/reaction.service';
import Reaction, { ReactionDocument } from '../models/reactionModel';
import { CreateReactionInput } from '../schemas/reaction.schema';

class ReactionController {
    
    public async create(data: CreateReactionInput & { userId: string }): Promise<ReactionDocument> {
        try {
            // Ajustar la estructura para que coincida con el esquema del modelo
            const reactionData = {
                ...data,
                user: data.userId, // Cambiar userId a user para cumplir con el esquema
            };
            const reaction = await Reaction.create(reactionData);
            return reaction;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating reaction: ${error.message}`);
            }
            throw new Error("Unknown error occurred while creating reaction");
        }
    }

    public async get(req: Request, res: Response) {
        try {
            const reactionId = req.params.id;
            const reaction = await ReactionService.findById(reactionId);
            if (!reaction) {
                return res.status(404).json({ message: `Reaction with id: ${reactionId} not found` });
            }
            res.json(reaction);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving reaction", error });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const reactionId = req.params.id;
            const userId = req.body.loggedUser.id;

            // Lógica para verificar si el usuario puede eliminar esta reacción
            const reaction = await ReactionService.findById(reactionId);
            if (!reaction) {
                return res.status(404).json({ message: `Reaction with id: ${reactionId} not found` });
            }

            if (reaction.userId.toString() !== userId.toString()){
                return res.status(403).json({ message: "You are not authorized to delete this reaction" });
            }

            await ReactionService.delete(reactionId);
            res.json({ message: `Reaction with id: ${reactionId} deleted successfully` });
        } catch (error) {
            res.status(500).json({ message: "Error deleting reaction", error });
        }
    }
}

export default new ReactionController();