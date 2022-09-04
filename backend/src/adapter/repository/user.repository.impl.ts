import dataSource from '../infra/mysql/dataSource'
import { User } from '../../domain/user/user.entity'
import { UserRepository } from '../../domain/user/user.repository'

class UserRepositoryImpl implements UserRepository {
  constructor() {}

  public async create(user: User) {
    return await dataSource.manager.save(user)
  }

  public async findOneBy(user: Pick<User, 'email'> | Pick<User, 'nickname'>) {
    return await dataSource.getRepository(User).findOneBy(user)
  }
}

export default UserRepositoryImpl
