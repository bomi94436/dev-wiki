import dataSource from '../infra/mysql/dataSource'
import { ArticleRepository } from '../../domain/article/article.repository'
import { Article } from '../../domain/article/article.entity'
import { FindOptionsWhere, Repository } from 'typeorm'

class ArticleRepositoryImpl implements ArticleRepository {
  private repository: Repository<Article>

  constructor() {
    this.repository = dataSource.getRepository(Article)
  }

  public async create(article: Article) {
    return await this.repository.save(article)
  }

  public async getList(option?: FindOptionsWhere<Article>): Promise<Article[]> {
    return await this.repository.find({
      where: option,
    })
  }

  public async getOne({ id }: Article): Promise<Article | null> {
    return await this.repository.findOneBy({
      id,
    })
  }

  public async updateOne(articleId: number, article: Article) {
    const result = await this.repository.update(articleId, article)

    if (result) {
      return await this.repository.findOneBy({
        id: articleId,
      })
    } else {
      return null
    }
  }
}

export default ArticleRepositoryImpl
