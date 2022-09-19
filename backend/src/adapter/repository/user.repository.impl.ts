import dataSource from '../infra/mysql/dataSource'
import { User } from '../../domain/user/user.entity'
import { UserRepository } from '../../domain/user/user.repository'
import UuidService from '../../domain/uuidService'

class UserRepositoryImpl implements UserRepository {
  private uuidService: UuidService

  constructor() {
    this.uuidService = new UuidService()
  }

  public async create(user: User) {
    return await dataSource.manager.save(user)
  }

  public async findOneBy(user: Pick<User, 'email'> | Pick<User, 'nickname'> | Pick<User, 'id'>) {
    return await dataSource.getRepository(User).findOneBy(user)
  }

  public async findOneById(user: Pick<User, 'id'>): Promise<User | null> {
    return await dataSource
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where(`id = ${this.uuidService.parseStringForFind(user.id)}`)
      .getOne()
  }
}

export default UserRepositoryImpl
