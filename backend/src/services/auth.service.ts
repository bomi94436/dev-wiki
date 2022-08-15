import User from '../repositories/user.repository'
import { CustomError } from '../utils'
import { stringify as uuidStringify } from 'uuid'

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

  login: async ({ email, password }: { email: string; password: string }) => {
    const users = await User.getUserByEmail({
      email,
    })

    if (!users.length) {
      throw new CustomError(404, 'not exist user with matching email')
    }

    const user = users[0]

    // TODO: password 복호화
    if (user.password !== password) {
      throw new CustomError(404, "doesn't not match password")
    }

    return {
      id: uuidStringify(user.id),
      email: user.email,
      nickname: user.nickname,
    }
  },
}

export default authService
