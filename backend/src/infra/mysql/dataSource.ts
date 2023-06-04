import { DataSource } from 'typeorm'
import config from 'config'

const dataSource = new DataSource({
  type: 'mysql',
  host: config.mysql.host,
  port: config.mysql.port,
  username: config.mysql.user,
  password: config.mysql.password,
  database: 'dev_wiki_db',
  timezone: '+09:00',
  synchronize: true,
  logging: true,
  entities: ['../**/*.entity.ts'],
  migrationsTableName: 'migrations',
  migrations: ['../**/migrations/*.ts'],
})

export default dataSource
