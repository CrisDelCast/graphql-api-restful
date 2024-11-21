import express, { Router } from "express";
import CommentController from "../controllers/comment.controller";
import validateSchema from "../middlewares/validateSchema";
import authMiddleware from "../middlewares/auth";
import {
  createCommentSchema,
  updateCommentSchema,
} from "../schemas/comment.schema";

class CommentRouter {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/",
      authMiddleware,
      validateSchema(createCommentSchema),
      CommentController.create
    );

    this.router.get(
      "/",
      authMiddleware,
      CommentController.getAll
    );

    this.router.put(
      "/:id",
      authMiddleware,
      validateSchema(updateCommentSchema),
      CommentController.update
    );

    this.router.delete(
      "/:id",
      authMiddleware,
      CommentController.delete
    );
  }
}

// Crear y exportar la instancia del enrutador
const commentRouterInstance = new CommentRouter();
export const router = commentRouterInstance.router;
export default router;
