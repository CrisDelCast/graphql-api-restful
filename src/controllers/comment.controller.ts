import { Request, Response } from "express";
import {  UpdateCommentInput } from "../schemas/comment.schema"; // Usamos el tipo de esquema Zod
import { CommentInput } from "../models/commentModel";
import commentService from "../services/comment.service";

class CommentController {
  // Método para crear un comentario
  public create = async (req: Request, res: Response): Promise<void> => {
    const { content, parent } = req.body;
    const userId = req.body.loggedUser?.id; // Asegúrate de que `loggedUser.id` esté en el `req.body`

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    try {
      const commentData: CommentInput = { content, userId: userId }; // `user` es el ObjectId del usuario
      const comment = await commentService.create(commentData);

      res.status(201).json({
        message: "Comment created successfully",
        data: comment,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating comment",
        error: error instanceof Error ? error.message : error,
      });
    }
  };

  // Método para obtener todos los comentarios
  public getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const comments = await commentService.findAll();
      res.status(200).json({
        message: "Comments retrieved successfully",
        data: comments,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving comments",
        error: error instanceof Error ? error.message : error,
      });
    }
  };

  // Método para obtener un comentario por ID
  public get = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const comment = await commentService.findById(id);

      if (!comment) {
        res.status(404).json({ message: `Comment with ID ${id} not found` });
        return;
      }

      res.status(200).json({
        message: "Comment retrieved successfully",
        data: comment,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving comment",
        error: error instanceof Error ? error.message : error,
      });
    }
  };

  // Método para actualizar un comentario por ID
  public update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updateData: UpdateCommentInput = req.body; // Usamos el tipo Zod `UpdateCommentInput`

    try {
      const updatedComment = await commentService.update(id, updateData);

      if (!updatedComment) {
        res.status(404).json({ message: `Comment with ID ${id} not found` });
        return;
      }

      res.status(200).json({
        message: "Comment updated successfully",
        data: updatedComment,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating comment",
        error: error instanceof Error ? error.message : error,
      });
    }
  };

  // Método para eliminar un comentario por ID
  public delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const deletedComment = await commentService.delete(id);

      if (!deletedComment) {
        res.status(404).json({ message: `Comment with ID ${id} not found` });
        return;
      }

      res.status(200).json({
        message: "Comment deleted successfully",
        data: deletedComment,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting comment",
        error: error instanceof Error ? error.message : error,
      });
    }
  };
}

export default new CommentController();
