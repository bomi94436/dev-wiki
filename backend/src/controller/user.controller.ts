import { RequestHandler } from 'express'
import UserRepositoryImpl from 'repository/user.repository.impl'
import UserService from 'services/user.service'
import { ItemResponse } from './types'
import { User } from 'domain/user/user.entity'

class UserController {
  private userService: UserService

  constructor() {
    const userRepository = new UserRepositoryImpl()
    this.userService = new UserService({ userRepository })
  }

  public me: RequestHandler<
    {},
    ItemResponse<{
      id: string
      email: string
      nickname: string
    }>
  > = async (req, res, next) => {
    if (req.session.userid) {
      const user = await this.userService.findme({
        id: req.session.userid,
      })

      res.status(200).json(user)
      return
    }

    res.status(404).json({
      message: 'not found user',
    })
  }
}

export default UserController
