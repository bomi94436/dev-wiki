import { ArticleHistory } from './articleHistory.entity'

export interface ArticleHistoryRepository {
  create(
    article: Pick<
      ArticleHistory,
      'title' | 'thumbnail' | 'short_description' | 'content' | 'article_id'
    >
  ): Promise<ArticleHistory>
}
