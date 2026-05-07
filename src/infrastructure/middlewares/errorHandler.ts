

import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('[ERROR]', error);

  // Errores de negocio conocidos
  if (error.message === 'Propiedad no encontrada') {
    res.status(404).json({ ok: false, error: error.message });
    return;
  }

  if (error.message === 'Ya existe un usuario con ese email') {
    res.status(400).json({ ok: false, error: error.message });
    return;
  }

  if (error.message === 'Credenciales inválidas') {
    res.status(401).json({ ok: false, error: error.message });
    return;
  }

  // Error genérico — algo inesperado
  res.status(500).json({ ok: false, error: 'Error interno del servidor' });
};