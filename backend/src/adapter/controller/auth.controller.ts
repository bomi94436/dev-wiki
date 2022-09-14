import { NextFunction, Request, Response } from 'express'
import AuthService from '../../application/services/auth.service'
import UserRepositoryImpl from '../repository/user.repository.impl'
import UuidService from '../../domain/uuidService'
import PasswordService from '../../domain/passwordService'
import { SESSION_KEY } from '../../global/constant'

class AuthController {
  authService: AuthService

  constructor() {
    const userRepository = new UserRepositoryImpl()
    const uuidService = new UuidService()
    const passwordService = new PasswordService()
    this.authService = new AuthService({ userRepository, uuidService, passwordService })
  }

  public async signup(req: Request, res: Response, next: NextFunction) {
    const createdUser = await this.authService.signup(req.body)

    res.status(200).json({
      message: 'success create user',
      user: createdUser,
    })
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    const user = await this.authService.login(req.body)

    req.session.userid = user.id

    res.status(200).json({
      message: 'success login',
      user,
    })
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
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
