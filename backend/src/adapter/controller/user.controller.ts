import { NextFunction, Request, Response } from 'express'
import UserRepositoryImpl from '../repository/user.repository.impl'
import UserService from '../../application/services/user.service'

class UserController {
  private userService: UserService

  constructor() {
    const userRepository = new UserRepositoryImpl()
    this.userService = new UserService({ userRepository })
  }

  public async me(req: Request, res: Response, next: NextFunction) {
    if (req.session.userid) {
      const user = await this.userService.findme({
        id: req.session.userid,
      })

      res.status(200).json({
        message: 'success find user',
        user,
      })
      return
    }

    res.status(404).json({
      message: 'not found user',
    })
  }
}

export default UserController