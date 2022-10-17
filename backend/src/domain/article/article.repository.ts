import { Article } from './article.entity'

export interface ArticleRepository {
  create(
    article: Pick<Article, 'title' | 'content' | 'thumbnail' | 'short_description' | 'writer_id'>
  ): Promise<Article>
  getList(
    option?: Partial<
      Pick<Article, 'id' | 'title' | 'content' | 'thumbnail' | 'short_description' | 'writer_id'>
    >
  ): Promise<Article[]>
  getOne(article: Pick<Article, 'id'>): Promise<Article | null>
  updateOne(articleId: number, article: Article): Promise<Article | null>
}
