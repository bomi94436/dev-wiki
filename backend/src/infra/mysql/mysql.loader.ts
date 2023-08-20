import dataSource from './dataSource'
import mysql from 'mysql2/promise'
import config from '../../config'

const pool = mysql.createPool({
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  timezone: '+00:00',
  connectionLimit: 10,
})

const getConnectionPool = async (callback: (conn: mysql.PoolConnection) => any) => {
  try {
    const connection = await pool.getConnection()
    callback(connection)

    connection.release()
  } catch (err) {
    console.error(err)
    throw err
  }
}

const mysqlLoader = async () => {
  try {
    // TODO: migration 코드 작성 ?
    await getConnectionPool(async (conn) => {
      await conn.query('CREATE DATABASE IF NOT EXISTS dev_wiki_db default CHARACTER SET UTF8')
      await conn.query('USE dev_wiki_db')
    })

    await dataSource.initialize()
  } catch (err) {
    setTimeout(mysqlLoader, 2000)
  }
}

export default mysqlLoader
