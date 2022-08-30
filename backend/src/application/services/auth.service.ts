import UserRepository from '../../adapter/repository/user.repository'
import { CustomError } from '../../utils'

const authService = {
  signup: async (user: { email: string; password: string; nickname: string }) => {
    const userRepository = new UserRepository()

    const duplicateEmailUsers = await userRepository.getUserByEmail({
      email: user.email,
    })

    if (duplicateEmailUsers) {
      throw new CustomError(409, 'already exist same email user')
    }

    const duplicateNicknameUsers = await userRepository.getUserByNickname({
      nickname: user.nickname,
    })
    if (duplicateNicknameUsers) {
      throw new CustomError(409, 'already exist same nickname user')
    }

    const createdUser = await userRepository.create(user)
    return createdUser
  },

  login: async ({ email, password }: { email: string; password: string }) => {
    const userRepository = new UserRepository()

    const user = await userRepository.getUserByEmail({
      email,
    })

    if (!user) {
      throw new CustomError(404, 'not exist user with matching email')
    }

    // TODO: password 복호화
    if (user.password !== password) {
      throw new CustomError(404, "doesn't not match password")
    }

    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    }
  },
}

export default authService
