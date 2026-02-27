import { CreateUserDTO } from '@/dtos/auth/create-user-dto';
import { AuthRepository } from '@/repositories/auth-repository';
import { AppError } from '@/utils/app-error';
import { generateJwt } from '@/utils/jwt-generator';
import { hash } from 'bcryptjs';

export class SignUpService {
  constructor(private authRepository: AuthRepository) {}

  async execute(
    data: CreateUserDTO,
  ): Promise<{ username: string; token: string }> {
    const userExists = await this.authRepository.findUserByEmail(data.email);

    if (userExists) {
      throw new AppError('E-mail já em uso.', 409);
    }

    const hashedPassword = await hash(data.password, 10);

    const user = await this.authRepository.createUser({
      email: data.email,
      name: data.name,
      password: hashedPassword,
    });

    if (!user) throw new AppError('Erro ao criar usuário.', 500);

    const token = generateJwt(user.id);

    return {
      username: user.name,
      token,
    };
  }
}
