import { CustomError } from '../../global/utils'
import { UserRepository } from '../../domain/user/user.repository'

class UserService {
  private userRepository: UserRepository

  constructor({ userRepository }: { userRepository: UserRepository }) {
    this.userRepository = userRepository
  }

  public async findme({ id }: { id: string }) {
    const user = await this.userRepository.findOneById({
      id,
    })

    if (!user) {
      throw new CustomError(404, 'not found user')
    }

    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    }
  }
}

export default UserService
