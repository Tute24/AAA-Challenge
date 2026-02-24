import { CreateUserDTO } from '@/dtos/auth/create-user-dto';
import { AuthRepository } from '../auth-repository';
import prisma from '@/lib/prisma';

export class PrismaAuthRepository implements AuthRepository {
  async createUser(data: CreateUserDTO) {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user || null;
  }
}
