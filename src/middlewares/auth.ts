import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
    let token = req.header("Authorization");
    token = req.header("Authorization")?.replace("Bearer ", "").trim(); // Reemplaza "Bearer" y elimina espacios


    // Verificar si el token está presente
    if (!token) {
        return res.status(401).json({ message: "Acceso denegado: No se proporcionó un token de autorización." });
    }

    try {
        console.log("Token recibido para decodificar:", token);
        console.log("Usando clave secreta:", process.env.JWT_SECRET || "secret");
    
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
        
        console.log("Token decodificado con éxito:", decoded);
    
        req.body.loggedUser = decoded; // Agregar datos decodificados al request
        next();
    } catch (error) {
        console.error("Error al verificar el token:");
    
        if (error instanceof TokenExpiredError) {
            console.error("El token ha expirado.");
            return res.status(401).json({ message: "Token expirado: Por favor inicia sesión nuevamente." });
        } else if (error instanceof JsonWebTokenError) {
            console.error("El token no es válido.");
            return res.status(401).json({ message: "Token inválido: La autorización ha sido denegada." });
        } else {
            console.error("Error inesperado:", error);
            return res.status(500).json({ message: "Error en la autenticación: Ha ocurrido un problema inesperado." });
        }
    }
    
};

export default auth;
