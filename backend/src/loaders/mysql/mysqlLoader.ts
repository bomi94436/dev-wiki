import getConnectionPool from '../../repositories/mysql'
import { CreateUserTable, DropUserTable } from './initQuery'

const mysqlLoader = async () => {
  const connection = await getConnectionPool()

  await connection.query(
    'CREATE DATABASE IF NOT EXISTS dev_wiki_db default CHARACTER SET UTF8;'
  )
  await connection.query('USE dev_wiki_db;')

  await connection.query(DropUserTable)
  await connection.query(CreateUserTable)

  connection.release()
}

export default mysqlLoader
