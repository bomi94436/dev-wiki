import { NextFunction, Request, Response } from 'express'
import AuthService from '../../application/services/auth.service'
import UserRepositoryImpl from '../repository/user.repository.impl'
import UuidService from '../../domain/uuidService'
import PasswordService from '../../domain/passwordService'

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

    // TODO: 이미 세션이 있다면 ?
    req.session.userid = user.id

    res.status(200).json({
      message: 'success login',
      user,
    })
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
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
  }
}

export default AuthController
