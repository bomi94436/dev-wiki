import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from '../user/user.entity'
import UuidService from '../uuidService'

@Entity({ database: 'dev_wiki_db', name: 'article' })
export class Article {
  @PrimaryGeneratedColumn({
    name: 'article_id',
  })
  id: number

  @Column({
    length: 100,
  })
  title: string

  @Column({
    type: 'text',
  })
  content: string

  @CreateDateColumn()
  created_at: Date

  @Column({ nullable: true })
  next_article_id: number

  @OneToOne(() => Article)
  @JoinColumn({
    name: 'next_article_id',
  })
  article: Article

  @Column(
    new UuidService().uuidColumnOptions({
      name: 'writer_id',
    })
  )
  writer_id: string

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'writer_id',
  })
  writer: User
}
