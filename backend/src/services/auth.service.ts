import User from '../models/user.model'

const authService = {
  signup: async (user: {
    email: string
    password: string
    nickname: string
  }) => {
    const createdUser = await User.create(user)
    return createdUser
  },
}

export default authService
