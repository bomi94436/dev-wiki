import { User } from './user.model'

export interface UserRepositoryImpl {
  create(user: Pick<User, 'email' | 'password' | 'nickname'>): Promise<Partial<User>>
  getUserByEmail(email: Pick<User, 'email'>): Promise<User | null>
  getUserByNickname(email: Pick<User, 'nickname'>): Promise<User | null>
}
