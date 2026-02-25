import { SignInDTO } from '@/dtos/auth/sign-in-dto';
import { AuthRepository } from '@/repositories/auth-repository';
import { AppError } from '@/utils/app-error';
import { generateJwt } from '@/utils/jwt-generator';
import { compare } from 'bcryptjs';

export class SignInService {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: SignInDTO): Promise<{ username: string; token: string }> {
    const user = await this.authRepository.findUserByEmail(data.email);

    if (!user || !(await compare(data.password, user.password)))
      throw new AppError('Credenciais Inválidas.', 401);

    const token = generateJwt(user.id);

    return {
      username: user.name,
      token,
    };
  }
}
