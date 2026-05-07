import prisma from './prismaClient';
import { IUserRepository, UserData } from '../../domain/repositories/IUserRepository';

class PrismaUserRepository implements IUserRepository {

  async save(user: { email: string; password: string }): Promise<UserData> {
    return prisma.user.create({
      data: {
        email:    user.email,
        password: user.password,
      }
    });
  }

  async findByEmail(email: string): Promise<UserData | null> {
    return prisma.user.findUnique({
      where: { email }
    });
  }

}

export default PrismaUserRepository;