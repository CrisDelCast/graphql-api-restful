import CommentModel, { CommentDocument } from "../models/commentModel";
import { CreateCommentInput, UpdateCommentInput } from "../schemas/comment.schema";  // Importamos los tipos del esquema

class CommentService {
    // Método para crear un comentario
    public async create(commentInput: CreateCommentInput): Promise<CommentDocument> {
        try {
            const comment = await CommentModel.create(commentInput);
            return comment;
        } catch (error) {
            throw new Error("Error creating comment: " + (error instanceof Error ? error.message : error));
        }
    }

    // Método para obtener todos los comentarios
    public async findAll(): Promise<CommentDocument[]> {
        try {
            const comments = await CommentModel.find();
            return comments;
        } catch (error) {
            throw new Error("Error retrieving comments: " + (error instanceof Error ? error.message : error));
        }
    }

    // Método para encontrar un comentario por ID
    public async findById(id: string): Promise<CommentDocument | null> {
        try {
            const comment = await CommentModel.findById(id);
            return comment;
        } catch (error) {
            throw new Error("Error retrieving comment by ID: " + (error instanceof Error ? error.message : error));
        }
    }

    // Método para actualizar un comentario
    public async update(id: string, commentInput: UpdateCommentInput): Promise<CommentDocument | null> {
        try {
            const updatedComment = await CommentModel.findOneAndUpdate(
                { _id: id },
                commentInput,
                { new: true }  // Retorna el documento actualizado
            );
            return updatedComment;
        } catch (error) {
            throw new Error("Error updating comment: " + (error instanceof Error ? error.message : error));
        }
    }

    // Método para eliminar un comentario
    public async delete(id: string): Promise<CommentDocument | null> {
        try {
            const deletedComment = await CommentModel.findOneAndDelete({ _id: id });
            return deletedComment;
        } catch (error) {
            throw new Error("Error deleting comment: " + (error instanceof Error ? error.message : error));
        }
    }
}

export default new CommentService();
