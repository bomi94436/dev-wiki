import { User } from 'domain/user/user.entity'
import UuidService from 'domain/uuidService'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ database: 'dev_wiki_db', name: 'article' })
export class Article {
  @PrimaryGeneratedColumn({ name: 'article_id' })
  id: number

  @Column({ length: 100 })
  title: string

  @Column({ length: 2000, nullable: true })
  thumbnail?: string

  @Column({ length: 150, nullable: true })
  short_description?: string

  @Column({ type: 'text' })
  content: string

  @Column({ type: 'int', default: 0 })
  my_views: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

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

  constructor(
    {
      id,
      title,
      thumbnail,
      short_description,
      content,
      writer_id,
    }: {
      title: string
      content: string
      id?: number
      thumbnail?: string
      short_description?: string
      writer_id?: string
    } = {
      title: '',
      content: '',
    }
  ) {
    this.title = title
    this.content = content

    this.thumbnail = thumbnail
    this.short_description = short_description

    if (id) this.id = id
    if (writer_id) this.writer_id = writer_id
  }

  public increaseMyViews(): void {
    this.my_views += 1
  }
}
