import { Repository } from 'typeorm'
import { ArticleHistory } from 'domain/article/articleHistory.entity'
import { ArticleHistoryRepository } from 'domain/article/articleHistory.repository'
import dataSource from 'infra/mysql/dataSource'

class ArticleHistoryRepositoryImpl implements ArticleHistoryRepository {
  private repository: Repository<ArticleHistory>

  constructor() {
    this.repository = dataSource.getRepository(ArticleHistory)
  }

  public async create(
    articleHistory: Pick<
      ArticleHistory,
      'title' | 'thumbnail' | 'short_description' | 'content' | 'article_id'
    >
  ) {
    return await this.repository.save(articleHistory)
  }
}

export default ArticleHistoryRepositoryImpl
