import { CustomError } from '../../global/utils'
import { UserRepository } from '../../domain/user/user.repository'
import { User } from '../../domain/user/user.entity'
import UuidService from '../../domain/uuidService'
import PasswordService from '../../domain/passwordService'

class AuthService {
  private userRepository: UserRepository
  private uuidService: UuidService
  private passwordService: PasswordService

  constructor({
    userRepository,
    uuidService,
    passwordService,
  }: {
    userRepository: UserRepository
    uuidService: UuidService
    passwordService: PasswordService
  }) {
    this.userRepository = userRepository
    this.uuidService = uuidService
    this.passwordService = passwordService
  }

  public async findDuplicateEmailUser({ email }: { email: string }) {
    return await this.userRepository.findOneBy({
      email,
    })
  }

  public async findDuplicateNicknameUser({ nickname }: { nickname: string }) {
    return await this.userRepository.findOneBy({
      nickname,
    })
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
    const duplicateEmailUser = await this.findDuplicateEmailUser({
      email,
    })

    if (duplicateEmailUser) {
      throw new CustomError(409, 'already exist same email user')
    }

    const duplicateNicknameUsers = await this.findDuplicateNicknameUser({
      nickname,
    })
    if (duplicateNicknameUsers) {
      throw new CustomError(409, 'already exist same nickname user')
    }

    const userId = this.uuidService.generateUuid()
    const hashedPassword = this.passwordService.encryptPassword(password)
    const user = new User({ id: userId, email, password: hashedPassword, nickname })

    return await this.userRepository.create(user)
  }

  public async login({ email, password }: { email: string; password: string }) {
    const user = await this.userRepository.findOneBy({
      email,
    })

    if (!user) {
      throw new CustomError(404, 'not exist user with matching email')
    }

    if (!user.checkIsMatchPassword(password)) {
      throw new CustomError(404, "doesn't not match password")
    }

    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    }
  }
}

export default AuthService
