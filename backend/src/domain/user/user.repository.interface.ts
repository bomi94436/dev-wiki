import { User } from './user.model'

export interface IUserRepository {
  create({
    email,
    password,
    nickname,
  }: Pick<User, 'email' | 'password' | 'nickname'>): Promise<User>
  findOneByEmail({ email }: Pick<User, 'email'>): Promise<User | null>
  findOneByNickname({ nickname }: Pick<User, 'nickname'>): Promise<User | null>
}
