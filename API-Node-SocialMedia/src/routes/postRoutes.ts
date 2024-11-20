import express, { Router } from "express";
import PostController from "../controllers/post.controller";
import authMiddleware from "../middlewares/auth"; // Importar el middleware de autenticación

class PostRouter {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Ruta para crear un post (requiere autenticación)
    this.router.post(
      "/",
      authMiddleware, // Middleware de autenticación
      PostController.create
    );

    // Ruta para obtener todos los posts (puede no requerir autenticación)
    this.router.get(
      "/",
      PostController.getAll
    );

    // Ruta para obtener un post por ID (puede no requerir autenticación)
    this.router.get(
      "/:id",
      PostController.get
    );

    // Ruta para actualizar un post por ID (requiere autenticación)
    this.router.put(
      "/:id",
      authMiddleware, // Middleware de autenticación
      PostController.update
    );

    // Ruta para eliminar un post por ID (requiere autenticación)
    this.router.delete(
      "/:id",
      authMiddleware, // Middleware de autenticación
      PostController.delete
    );
  }
}

// Crear y exportar la instancia del enrutador
const postRouterInstance = new PostRouter();
export const router = postRouterInstance.router;
export default router;
