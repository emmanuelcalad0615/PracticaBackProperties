
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extendemos el tipo Request de Express para agregarle 'user'
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
      };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Paso 1 — verificar que llegó el header Authorization
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ ok: false, error: 'Token no proporcionado' });
    return;
  }

  // Paso 2 — extraer el token del header
  const token = authHeader.split(' ')[1];

  // Paso 3 — verificar y decodificar el token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; email: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ ok: false, error: 'Token inválido o expirado' });
  }
};