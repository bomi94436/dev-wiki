import { ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { v4 as uuidv4 } from 'uuid'
import { User } from '../models/user.model'
import { parseUuidToBinary } from '../utils'
import getConnectionPool from './mysql'

const UserModel = {
  create: async (user: {
    email: string
    password: string
    nickname: string
  }): Promise<Partial<User>> => {
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
  },
  getUserByEmail: async ({ email }: { email: string }) => {
    const connection = await getConnectionPool()

    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        'SELECT * FROM user WHERE email = ?',
        email
      )

      return rows
    } finally {
      connection.release()
    }
  },
  getUserByNickname: async ({ nickname }: { nickname: string }) => {
    const connection = await getConnectionPool()

    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        'SELECT id, nickname FROM user WHERE nickname = ?',
        nickname
      )

      return rows
    } finally {
      connection.release()
    }
  },
}

export default UserModel
