import User from '../repositories/user.repository'
import { CustomError } from '../utils'

const authService = {
  signup: async (user: {
    email: string
    password: string
    nickname: string
  }) => {
    const duplicateEmailUsers = await User.getUserByEmail({
      email: user.email,
    })
    if (duplicateEmailUsers.length) {
      throw new CustomError(409, 'already exist same email user')
    }

    const duplicateNicknameUsers = await User.getUserByNickname({
      nickname: user.nickname,
    })
    if (duplicateNicknameUsers.length) {
      throw new CustomError(409, 'already exist same nickname user')
    }

    const createdUser = await User.create(user)
    return createdUser
  },
}

export default authService
