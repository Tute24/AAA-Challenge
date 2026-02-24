import { CreateUserDTO } from '@/dtos/auth/create-user-dto';
import { User } from '@/types/user/user-type';

export interface AuthRepository {
  createUser: (data: CreateUserDTO) => Promise<User>;
  findUserByEmail: (email: string) => Promise<User | null>;
}
