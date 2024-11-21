import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
  role?: string; // Puedes añadir más propiedades según tu esquema de usuario
}

export interface ApolloContext {
  req: Request;
  res: Response;
  user: UserPayload | null;
}

export const context = ({ req, res }: { req: Request; res: Response }): ApolloContext => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  let user: UserPayload | null = null;

  if (token) {
    try {
      // Verifica el token con tu clave secreta
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
      user = decoded;
    } catch (error) {
      console.error('Error al verificar el token:');
    }
  }

  return {
    req,
    res,
    user,
  };
};
