import { CustomError } from 'global/utils'
import { UserRepository } from 'domain/user/user.repository'
import { User } from 'domain/user/user.entity'
import UuidService from 'domain/uuidService'

class AuthService {
  private userRepository: UserRepository
  private uuidService: UuidService

  constructor({
    userRepository,
    uuidService,
  }: {
    userRepository: UserRepository
    uuidService: UuidService
  }) {
    this.userRepository = userRepository
    this.uuidService = uuidService
  }

  public async signup({
    email,
    password,
    nickname,
  }: {
    email: string
    password: string
    nickname: string
  }) {
    const duplicateEmailUser = await this.userRepository.findOneBy({
      email,
    })

    if (duplicateEmailUser) {
      throw new CustomError(409, 'Already exist same email user')
    }

    const duplicateNicknameUsers = await this.userRepository.findOneBy({
      nickname,
    })
    if (duplicateNicknameUsers) {
      throw new CustomError(409, 'Already exist same nickname user')
    }

    const userId = this.uuidService.generateUuid()
    const user = new User({ id: userId, email, password, nickname })

    return await this.userRepository.create(user)
  }

  public async login({ email, password }: { email: string; password: string }) {
    const user = await this.userRepository.findOneBy({
      email,
    })

    if (!user) {
      throw new CustomError(404, 'Not exist user with matching email')
    }

    if (!user.checkIsMatchPassword(password)) {
      throw new CustomError(404, "Doesn't not match password")
    }

    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    }
  }
}

export default AuthService
