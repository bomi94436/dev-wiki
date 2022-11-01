import UuidService from 'domain/uuidService'
import { RequestHandler } from 'express'
import { SESSION_KEY } from 'global/constant'
import UserRepositoryImpl from 'repository/user.repository.impl'
import AuthService from 'services/auth.service'

class AuthController {
  private authService: AuthService

  constructor() {
    const userRepository = new UserRepositoryImpl()
    const uuidService = new UuidService()
    this.authService = new AuthService({ userRepository, uuidService })
  }

  public signup: RequestHandler = async (req, res, next) => {
    const user = await this.authService.signup(req.body)

    res.status(200).json({
      message: 'success create user',
      user,
    })
  }

  public login: RequestHandler = async (req, res, next) => {
    const user = await this.authService.login(req.body)

    req.session.userid = user.id

    res.status(200).json({
      message: 'success login',
      user,
    })
  }

  public logout: RequestHandler = async (req, res, next) => {
    if (req.session.userid) {
      req.session.destroy(console.error)

      res.clearCookie(SESSION_KEY)
      res.status(200).json({
        message: 'success logout',
      })
    } else {
      res.status(404).json({
        message: 'not exist session',
      })
    }
  }
}

export default AuthController
