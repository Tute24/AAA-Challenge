import { ValidateDTO } from '@/dtos/auth/validate-dto';
import { AuthRepository } from '@/repositories/auth-repository';
import { AppError } from '@/utils/app-error';

export class ValidateService {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: ValidateDTO): Promise<void> {
    const user = await this.authRepository.findUserById(data.id);

    if (!user) throw new AppError('Credenciais inválidas.', 401);
  }
}
