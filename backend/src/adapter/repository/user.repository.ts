import dataSource from '../infra/mysql/dataSource'
import { User } from '../../domain/user/user.model'
import { IUserRepository } from '../../domain/user/user.repository.interface'

class UserRepository implements IUserRepository {
  constructor() {}

  public async create({
    email,
    password,
    nickname,
  }: {
    email: string
    password: string
    nickname: string
  }) {
    const user = new User({
      email,
      password,
      nickname,
    })

    return await dataSource.manager.save(user)
  }

  public async findOneByEmail({ email }: { email: string }) {
    return await dataSource.getRepository(User).findOneBy({ email })
  }

  public async findOneByNickname({ nickname }: { nickname: string }) {
    return await dataSource.getRepository(User).findOneBy({ nickname })
  }
}

export default UserRepository
