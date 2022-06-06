import getConnectionPool from '../models/mysql'

export const mysqlLoader = async () => {
  await getConnectionPool(async (conn) => {
    await conn.query(
      'CREATE DATABASE IF NOT EXISTS dev_wiki_db default CHARACTER SET UTF8'
    )
    await conn.query('USE dev_wiki_db')
  })
}
