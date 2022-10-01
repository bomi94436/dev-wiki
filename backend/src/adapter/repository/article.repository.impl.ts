import dataSource from '../infra/mysql/dataSource'
import { ArticleRepository } from '../../domain/article/article.repository'
import { Article } from '../../domain/article/article.entity'

class ArticleRepositoryImpl implements ArticleRepository {
  constructor() {}

  public async create(article: Article) {
    return await dataSource.getRepository(Article).save(article)
  }

  public async getList(): Promise<Article[]> {
    return await dataSource.getRepository(Article).find()
  }
}

export default ArticleRepositoryImpl
