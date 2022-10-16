import { Article } from './article.entity'

export interface ArticleRepository {
  create(article: Pick<Article, 'title' | 'content' | 'writer_id'>): Promise<Article>
  getList(option?: Partial<Omit<Article, 'writer'>>): Promise<Article[]>
  getOne(article: Pick<Article, 'id'>): Promise<Article | null>
  updateOne(
    articleId: number,
    data: Pick<Article, 'title' | 'thumbnail' | 'short_description' | 'content'>
  ): Promise<Article | null>
}
