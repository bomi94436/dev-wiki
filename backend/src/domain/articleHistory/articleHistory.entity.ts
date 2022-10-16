import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Article } from '../article/article.entity'

@Entity({ database: 'dev_wiki_db', name: 'article_history' })
export class ArticleHistory {
  @PrimaryGeneratedColumn({
    name: 'article_history_id',
  })
  id: number

  @Column({
    length: 100,
  })
  title: string

  @Column({
    length: 2000,
  })
  thumbnail: string

  @Column({
    length: 150,
  })
  short_description: string

  @Column({
    type: 'text',
  })
  content: string

  @CreateDateColumn()
  created_at: Date

  @Column({ name: 'article_id' })
  article_id: number

  @ManyToOne(() => Article)
  @JoinColumn({
    name: 'article_id',
  })
  article: Article
}
