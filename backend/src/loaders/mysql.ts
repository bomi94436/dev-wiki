import mysql from 'mysql2/promise'
import config from '../config'

export const mysqlLoader = async () => {
  try {
    const connection = await mysql.createConnection({
      host: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      timezone: '+09:00',
    })

    await connection.query(
      'CREATE DATABASE IF NOT EXISTS dev_wiki_db default CHARACTER SET UTF8'
    )
    await connection.query('USE dev_wiki_db')
  } catch (err) {
    console.error(err)
  }
}
