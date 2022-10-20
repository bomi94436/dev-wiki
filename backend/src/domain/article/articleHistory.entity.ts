import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Article } from './article.entity'

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
    nullable: true,
  })
  thumbnail?: string

  @Column({
    length: 150,
    nullable: true,
  })
  short_description?: string

  @Column({
    type: 'text',
  })
  content: string

  @CreateDateColumn()
  created_at: Date

  @Column({ name: 'article_id', comment: '원본 아티클 id' })
  article_id: number

  @ManyToOne(() => Article, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'article_id',
  })
  article: Article

  constructor(
    {
      title,
      thumbnail,
      short_description,
      content,
      article_id,
    }: {
      title: string
      content: string
      thumbnail?: string
      short_description?: string
      article_id?: number
    } = {
      title: '',
      content: '',
    }
  ) {
    this.title = title
    this.content = content

    this.thumbnail = thumbnail
    this.short_description = short_description

    if (article_id) this.article_id = article_id
  }
}
