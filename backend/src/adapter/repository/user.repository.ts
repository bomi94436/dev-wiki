import { ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { stringify as uuidStringify, v4 as uuidv4 } from 'uuid'

import { getConnectionPool } from '../infra/mysql/usecase'
import { parseUuidToBinary } from '../../utils'

import { User } from '../../domain/user/user.model'
import { UserRepositoryImpl } from '../../domain/user/user.repository.impl'

class UserRepository implements UserRepositoryImpl {
  constructor() {}

  public async create(user: {
    email: string
    password: string
    nickname: string
  }): Promise<Partial<User>> {
    const connection = await getConnectionPool()
    const id = uuidv4()

    try {
      await connection.query<ResultSetHeader>(
        'INSERT INTO user (id, email, password, nickname, is_verificated) VALUES (?,?,?,?,?)',
        [parseUuidToBinary(id), user.email, user.password, user.nickname, false]
      )

      return {
        id,
        email: user.email,
        nickname: user.nickname,
      }
    } finally {
      connection.release()
    }
  }

  public async getUserByEmail({ email }: { email: string }): Promise<User | null> {
    const connection = await getConnectionPool()

    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        'SELECT * FROM user WHERE email = ?',
        email
      )

      if (rows.length) {
        return {
          ...rows[0],
          id: uuidStringify(rows[0].id),
        } as User
      } else {
        return null
      }
    } finally {
      connection.release()
    }
  }

  public async getUserByNickname({ nickname }: { nickname: string }): Promise<User | null> {
    const connection = await getConnectionPool()

    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        'SELECT id, nickname FROM user WHERE nickname = ?',
        nickname
      )

      if (rows.length) {
        return {
          ...rows[0],
          id: uuidStringify(rows[0].id),
        } as User
      } else {
        return null
      }
    } finally {
      connection.release()
    }
  }
}

export default UserRepository
