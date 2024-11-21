import { Request, Response } from "express";
import postService from "../services/post.service";
import authMiddleware from "../middlewares/auth"; // Importar el middleware de autenticación

class PostController {
  // Método para crear un post
  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const postData = req.body;
      const createdPost = await postService.create(postData);

      res.status(201).json({
        message: "Post created successfully",
        data: createdPost,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating post",
        error: error instanceof Error ? error.message : error,
      });
    }
  };

  // Método para obtener todos los posts
  public getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const posts = await postService.findAll();

      res.status(200).json({
        message: "Posts retrieved successfully",
        data: posts,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving posts",
        error: error instanceof Error ? error.message : error,
      });
    }
  };

  // Método para obtener un post por ID
  public get = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const post = await postService.findById(id);

      if (!post) {
        res.status(404).json({ message: `Post with ID ${id} not found` });
        return;
      }

      res.status(200).json({
        message: "Post retrieved successfully",
        data: post,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving post",
        error: error instanceof Error ? error.message : error,
      });
    }
  };

  // Método para actualizar un post por ID
  public update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const updatedPost = await postService.update(id, updateData);

      if (!updatedPost) {
        res.status(404).json({ message: `Post with ID ${id} not found` });
        return;
      }

      res.status(200).json({
        message: "Post updated successfully",
        data: updatedPost,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating post",
        error: error instanceof Error ? error.message : error,
      });
    }
  };

  // Método para eliminar un post por ID
  public delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const deleted = await postService.delete(id);

      if (!deleted) {
        res.status(404).json({ message: `Post with ID ${id} not found` });
        return;
      }

      res.status(200).json({
        message: "Post deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting post",
        error: error instanceof Error ? error.message : error,
      });
    }
  };
}

export default new PostController();
