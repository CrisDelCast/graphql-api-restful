import express, { Router } from "express";
import ReactionController from "../controllers/reaction.controllers";
import validateSchema from "../middlewares/validateSchema";
import auth from "../middlewares/auth";
import {
  createReactionSchema,
  deleteReactionSchema,
} from "../schemas/reaction.schema";

class ReactionRouter {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/",
      auth,
      validateSchema(createReactionSchema),
      ReactionController.create
    );

    this.router.delete(
      "/:id",
      auth,
      validateSchema(deleteReactionSchema),
      ReactionController.delete
    );

    this.router.get(
      "/:id",
      auth,
      ReactionController.get
    );
  }
}

// Crear y exportar la instancia del enrutador
const reactionRouterInstance = new ReactionRouter();
export const router = reactionRouterInstance.router;
export default router;
