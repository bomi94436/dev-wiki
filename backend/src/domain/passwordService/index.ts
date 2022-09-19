import bcrypt from 'bcrypt'
const saltRounds = 10

class PasswordService {
  constructor() {}

  public encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync(saltRounds)

    return bcrypt.hashSync(password, salt)
  }

  public comparePassword(targetPassword: string, originPassword: string): boolean {
    return bcrypt.compareSync(targetPassword, originPassword)
  }
}

export default PasswordService
