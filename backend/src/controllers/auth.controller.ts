import { RequestHandler } from 'express'
import { authService } from '../services'

type AuthControllerKeys = 'signup'

const authController: {
  [key in AuthControllerKeys]: RequestHandler
} = {
  signup: async (req, res, next) => {
    const createdUser = await authService.signup(req.body)
    res.status(200).json({
      message: 'success create user',
      user: createdUser,
    })
  },
}

export default authController
