import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
    let token = req.header("Authorization");
    token = token?.replace("Bearer ", ""); // Eliminar "Bearer " del token

    // Verificar si el token está presente
    if (!token) {
        return res.status(401).json({ message: "Acceso denegado: No se proporcionó un token de autorización." });
    }

    try {
        
        console.log("Token recibido:", token);
        console.log(process.env.JWT_SECRET);
        // Verificar y decodificar el token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
        req.body.loggedUser = decoded; // Añadir info del usuario al body del request
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).json({ message: "Token expirado: Por favor inicia sesión nuevamente." });
        } else if (error instanceof JsonWebTokenError) {
            return res.status(401).json({ message: "Token inválido: La autorización ha sido denegada." });
        } else {
            return res.status(500).json({ message: "Error en la autenticación: Ha ocurrido un problema inesperado." });
        }
    }
};

export default auth;
