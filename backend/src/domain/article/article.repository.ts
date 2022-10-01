import { Article } from './article.entity'

export interface ArticleRepository {
  create(article: Pick<Article, 'title' | 'content' | 'writer_id'>): Promise<Article>
  getList(): Promise<Article[]>
}
