import dataSource from '../infra/mysql/dataSource'
import { ArticleRepository } from '../../domain/article/article.repository'
import { Article } from '../../domain/article/article.entity'
import { FindManyOptions, Repository } from 'typeorm'

class ArticleRepositoryImpl implements ArticleRepository {
  private repository: Repository<Article>

  constructor() {
    this.repository = dataSource.getRepository(Article)
  }

  public async create(article: Article) {
    return await this.repository.save(article)
  }

  public async getList(option?: Partial<Omit<Article, 'writer'>>): Promise<Article[]> {
    return await this.repository.find({
      where: option,
    })
  }

  public async getOne({ id }: Article): Promise<Article | null> {
    return await this.repository.findOneBy({
      id,
    })
  }

  public async updateOne(
    articleId: number,
    data: Pick<Article, 'title' | 'thumbnail' | 'short_description' | 'content'>
  ) {
    const result = await this.repository.update(articleId, {
      title: data.title,
      thumbnail: data.thumbnail,
      short_description: data.short_description,
      content: data.content,
    })

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
