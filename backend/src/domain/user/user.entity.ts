import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import uuidService from '../uuidService'
import PasswordService from '../passwordService'

@Entity({ database: 'dev_wiki_db', name: 'user' })
export class User {
  @PrimaryColumn({
    name: 'user_id',
    type: 'varbinary',
    length: 16,
    unique: true,
    transformer: {
      from: (value: Buffer) => {
        if (typeof value === 'string') return value
        else return new uuidService().parseBufferToString(value)
      },
      to: (value: string) => new uuidService().parseStringToBuffer(value),
    },
  })
  id: string

  @Column({
    length: 50,
    unique: true,
  })
  email: string

  @Column({
    length: 200,
  })
  password: string

  @Column({
    length: 20,
    unique: true,
  })
  nickname: string

  @Column({
    type: 'bool',
    width: 1,
    comment: '인증된 유저인지 체크',
    default: false,
  })
  is_verificated: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor(
    {
      id,
      email,
      password,
      nickname,
    }: {
      id: string
      email: string
      password: string
      nickname: string
    } = {
      id: '',
      email: '',
      password: '',
      nickname: '',
    }
  ) {
    this.id = id
    this.email = email
    this.password = password
    this.nickname = nickname
  }

  public checkIsMatchPassword(password: string): boolean {
    const passwordService = new PasswordService()
    return passwordService.comparePassword(password, this.password)
  }
}
