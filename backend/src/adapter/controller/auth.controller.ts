import { RequestHandler } from 'express'
import { authService } from '../../application/services'

type AuthControllerKeys = 'signup' | 'login' | 'logout'

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
  login: async (req, res, next) => {
    const user = await authService.login(req.body)

    // TODO: 이미 세션이 있다면 ?
    req.session.userid = user.id

    res.status(200).json({
      message: 'success login',
      user,
    })
  },
  logout: async (req, res, next) => {
    if (req.session.userid) {
      req.session.destroy(console.error)

      res.status(200).json({
        message: 'success logout',
        // sid: req.sessionID,
      })
    } else {
      res.status(404).json({
        message: 'not exist session',
      })
    }
  },
}

export default authController
