import { ArticleRepository } from '../../domain/article/article.repository'

class ArticleService {
  constructor(private articleRepository: ArticleRepository) {}

  public async createArticle({
    title,
    content,
    writerId,
  }: {
    title: string
    content: string
    writerId: string
  }) {
    return await this.articleRepository.create({ title, content, writer_id: writerId })
  }

  public async getArticles() {
    return await this.articleRepository.getList()
  }

  public async getArticle(id: number) {
    return await this.articleRepository.getOne({ id })
  }
}

export default ArticleService
