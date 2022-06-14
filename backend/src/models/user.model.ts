import { ResultSetHeader } from 'mysql2/promise'
import getConnectionPool from './mysql'

const User = {
  create: async (user: {
    email: string
    password: string
    nickname: string
  }) => {
    const connection = await getConnectionPool()

    try {
      const [rows, fields] = await connection.query(
        'INSERT INTO user (email, password, nickname, is_verificated) VALUES (?,?,?,?)',
        [user.email, user.password, user.nickname, 0]
      )

      console.log('rows ', rows)

      return {
        id: (rows as ResultSetHeader).insertId,
        ...user,
      }
    } finally {
      connection.release()
    }
  },
}

export default User
