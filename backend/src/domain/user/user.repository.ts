import { User } from './user.entity'

export interface UserRepository {
  create(user: User): Promise<User>
  findOneBy(
    user: Pick<User, 'email'> | Pick<User, 'nickname'> | Pick<User, 'id'>
  ): Promise<User | null>
}
