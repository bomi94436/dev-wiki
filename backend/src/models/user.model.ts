import { ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import getConnectionPool from './mysql'

const User = {
  create: async (user: {
    email: string
    password: string
    nickname: string
  }) => {
    const connection = await getConnectionPool()

    try {
      const [rows] = await connection.query(
        'INSERT INTO user (email, password, nickname, is_verificated) VALUES (?,?,?,?)',
        [user.email, user.password, user.nickname, 0]
      )

      return {
        id: (rows as ResultSetHeader).insertId,
        ...user,
      }
    } finally {
      connection.release()
    }
  },
  getUserByEmail: async ({ email }: { email: string }) => {
    const connection = await getConnectionPool()

    try {
      const [rows] = await connection.query(
        'SELECT id, email FROM user WHERE email = ?',
        email
      )

      return rows as RowDataPacket[]
    } finally {
      connection.release()
    }
  },
  getUserByNickname: async ({ nickname }: { nickname: string }) => {
    const connection = await getConnectionPool()

    try {
      const [rows] = await connection.query(
        'SELECT id, nickname FROM user WHERE nickname = ?',
        nickname
      )

      return rows as RowDataPacket[]
    } finally {
      connection.release()
    }
  },
}

export default User
