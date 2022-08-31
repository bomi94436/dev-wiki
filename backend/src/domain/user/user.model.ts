import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { parseUuidToBinary } from '../../utils'
import { stringify as uuidStringify, v4 as uuidv4 } from 'uuid'

@Entity({ database: 'dev_wiki_db', name: 'user' })
export class User {
  @PrimaryColumn({
    type: 'binary',
    length: 20,
    unique: true,
    transformer: {
      // TODO: 구현 기술이 드러나지 않도록 응집화할 것
      from: (value: Buffer) => uuidStringify(value),
      to: (value: string) => parseUuidToBinary(value),
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
      email,
      password,
      nickname,
    }: {
      email: string
      password: string
      nickname: string
    } = {
      email: '',
      password: '',
      nickname: '',
    }
  ) {
    this.id = uuidv4()
    this.email = email
    this.password = password
    this.nickname = nickname
  }
}
