import express, { Router } from "express";
import userController from "../controllers/user.controller";
import commentController from "../controllers/comment.controller";
import validateSchema from "../middlewares/validateSchema";
import auth from "../middlewares/auth";
import userSchema from "../schemas/user.schema";
import loginSchema from "../schemas/login.schema";

class UserRouter {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Rutas de usuarios
    this.router.post("/", validateSchema(userSchema), userController.register); // Registro no requiere autenticación
    this.router.post("/login", validateSchema(loginSchema), userController.authenticate); // Login no requiere autenticación
    this.router.get("/all", userController.listUsers); // Listar usuarios no requiere autenticación

    // Ruta para obtener el perfil de un usuario (requiere autenticación)
    this.router.get("/:profile", auth, userController.getUser);

    // Ruta para obtener un usuario por ID (no requiere autenticación)
    this.router.get("/:id", userController.getUser); 

    // Ruta para modificar un usuario por ID (requiere autenticación)
    this.router.put("/:id", auth, userController.modifyUser);

    // Ruta para eliminar un usuario por ID (requiere autenticación)
    this.router.delete("/:id", auth, userController.removeUser);

    // Rutas relacionadas con comentarios (requiere autenticación para crear un comentario)
    this.router.post("/comments", auth, commentController.create);
  }
}

// Crear y exportar la instancia del enrutador
const userRouterInstance = new UserRouter();
export const router = userRouterInstance.router;
export default router;
