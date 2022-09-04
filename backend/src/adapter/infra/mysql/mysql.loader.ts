import dataSource from './dataSource'
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

const getConnectionPool = async (callback: (conn: mysql.PoolConnection) => any) => {
  const connection = await pool.getConnection()

  try {
    callback(connection)
  } catch (err) {
    console.error(err)
  }

  connection.release()
}

const mysqlLoader = async () => {
  // TODO: migration 코드 작성 ?
  await getConnectionPool(async (conn) => {
    await conn.query('CREATE DATABASE IF NOT EXISTS dev_wiki_db default CHARACTER SET UTF8')
    await conn.query('USE dev_wiki_db')
  })

  await dataSource
    .initialize()
    .then(async () => {})
    .then(() => {
      console.log('typeorm app data source is ready')
    })
    .catch((error) => console.error(error))
}

export default mysqlLoader
