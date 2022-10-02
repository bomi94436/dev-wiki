import { Column } from 'typeorm'
import bcrypt from 'bcrypt'
const saltRounds = 10

export class Password {
  @Column({
    length: 200,
  })
  value: string

  constructor(password: string) {
    this.value = this.encryptPassword(password)
  }

  public encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync(saltRounds)

    return bcrypt.hashSync(password, salt)
  }

  public comparePassword(targetPassword: string): boolean {
    return bcrypt.compareSync(targetPassword, this.value)
  }
}
