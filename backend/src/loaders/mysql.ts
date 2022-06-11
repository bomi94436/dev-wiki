import getConnectionPool from '../models/mysql'
import { CreateUserTable, DropUserTable } from './initMySQLQuery'

export const mysqlLoader = async () => {
  await getConnectionPool(async (conn) => {
    await conn.query(
      'CREATE DATABASE IF NOT EXISTS dev_wiki_db default CHARACTER SET UTF8;'
    )
    await conn.query('USE dev_wiki_db;')

    await conn.query(DropUserTable)
    await conn.query(CreateUserTable)
  })
}
