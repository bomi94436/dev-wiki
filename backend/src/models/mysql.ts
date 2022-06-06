import mysql from 'mysql2/promise'
import config from '../config'

const pool = mysql.createPool({
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  timezone: '+09:00',
  connectionLimit: 10,
})

const getConnectionPool = async (
  callback: (conn: mysql.PoolConnection) => any
) => {
  const connection = await pool.getConnection()

  try {
    callback(connection)
  } catch (err) {
    console.error(err)
  }

  connection.release()
}

export default getConnectionPool
