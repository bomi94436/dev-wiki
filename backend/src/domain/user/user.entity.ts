import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import UuidService from '../uuidService'
import { Password } from './password'

@Entity({ database: 'dev_wiki_db', name: 'user' })
export class User {
  @PrimaryColumn(
    new UuidService().uuidColumnOptions({
      name: 'user_id',
      unique: true,
    })
  )
  id: string

  @Column({
    length: 50,
    unique: true,
  })
  email: string

  @Column(() => Password, {
    prefix: false,
  })
  password: Password

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
    this.password = new Password(password)
    this.nickname = nickname
  }

  public checkIsMatchPassword(password: string): boolean {
    return this.password.comparePassword(password)
  }
}
