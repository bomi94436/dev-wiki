import { RequestHandler } from 'express'
import { authService } from '../services'

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
    req.session.userid = 'hi2'
    res.status(200).json({
      message: 'login router',
      sid: req.sessionID,
      sess: req.session,
    })
  },
  logout: async (req, res, next) => {
    res.status(200).json({
      message: 'logout router',
      sid: req.sessionID,
      userid: req.session.userid,
    })
  },
}

export default authController
