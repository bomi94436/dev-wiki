import { DataSource } from 'typeorm'
import config from '../../config'

import { Article } from 'domain/article/article.entity'
import { ArticleHistory } from 'domain/article/articleHistory.entity'
import { User } from 'domain/user/user.entity'

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
  entities: [User, Article, ArticleHistory],
  subscribers: [],
  migrations: [],
})

export default dataSource
