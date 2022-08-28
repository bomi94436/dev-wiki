import mysql from 'mysql2/promise'
import config from '../../config'

const pool = mysql.createPool({
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  timezone: '+09:00',
  connectionLimit: 10,
})

export const getConnectionPool = async (): Promise<mysql.PoolConnection> => {
  const connection = await pool.getConnection()

  return connection

  // connection.release()
}
