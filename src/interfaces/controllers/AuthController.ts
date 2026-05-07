import { Request, Response, NextFunction } from 'express';
import RegisterUser from '../../application/usecases/RegisterUser';
import LoginUser from '../../application/usecases/LoginUser';
import PrismaUserRepository from '../../infrastructure/db/PrismaUserRepository';

const repository    = new PrismaUserRepository();
const registerUser  = new RegisterUser(repository);
const loginUser     = new LoginUser(repository);

export class AuthController {

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await registerUser.execute(req.body);
      res.status(201).json({ ok: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await loginUser.execute(req.body);
      res.status(200).json({ ok: true, ...result });
    } catch (error) {
      next(error);
    }
  }
}