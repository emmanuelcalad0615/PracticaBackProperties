// src/application/usecases/LoginUser.ts

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

interface LoginUserInput {
  email: string;
  password: string;
}

export default class LoginUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ email, password }: LoginUserInput) {
    // Paso 1 — buscar el usuario por email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Paso 2 — comparar la contraseña con el hash
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Credenciales inválidas');
    }

    // Paso 3 — generar el JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    return { token };
  }
}