// src/application/usecases/RegisterUser.ts

import bcrypt from 'bcryptjs';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

interface RegisterUserInput {
  email: string;
  password: string;
}

export default class RegisterUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ email, password }: RegisterUserInput) {
    // Paso 1 — verificar que el email no exista ya
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error('Ya existe un usuario con ese email');
    }

    // Paso 2 — hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Paso 3 — guardar el usuario con la contraseña hasheada
    const user = await this.userRepository.save({
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    // Paso 4 — devolver el usuario sin la contraseña
    return { id: user.id, email: user.email };
  }
}