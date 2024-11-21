import Reaction, { ReactionDocument } from "../models/reactionModel";
import { CreateReactionInput } from "../schemas/reaction.schema";

class ReactionService {
    // Método para crear una nueva reacción
    public async create(data: CreateReactionInput & { userId: string }): Promise<ReactionDocument> {
        try {
            const reaction = await Reaction.create(data);
            return reaction;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating reaction: ${error.message}`);
            }
            throw new Error("Unknown error occurred while creating reaction");
        }
    }

    // Método para obtener todas las reacciones de un comentario
    public async getReactionsByComment(commentId: string): Promise<ReactionDocument[]> {
        try {
            const reactions = await Reaction.find({ commentId }).populate("userId", "name email");
            return reactions;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error retrieving reactions by comment: ${error.message}`);
            }
            throw new Error("Unknown error occurred while retrieving reactions by comment");
        }
    }

    // Método para obtener todas las reacciones de un usuario
    public async getReactionsByUser(userId: string): Promise<ReactionDocument[]> {
        try {
            const reactions = await Reaction.find({ userId }).populate("commentId", "content");
            return reactions;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error retrieving reactions by user: ${error.message}`);
            }
            throw new Error("Unknown error occurred while retrieving reactions by user");
        }
    }

    // Método para encontrar una reacción por ID
    public async findById(id: string): Promise<ReactionDocument | null> {
        try {
            return await Reaction.findById(id).populate("userId").populate("commentId");
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error finding reaction: ${error.message}`);
            }
            throw new Error("Unknown error occurred while finding reaction");
        }
    }

    // Método para eliminar una reacción por ID
    public async delete(id: string): Promise<ReactionDocument | null> {
        try {
            return await Reaction.findByIdAndDelete(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error deleting reaction: ${error.message}`);
            }
            throw new Error("Unknown error occurred while deleting reaction");
        }
    }
}

export default new ReactionService();
