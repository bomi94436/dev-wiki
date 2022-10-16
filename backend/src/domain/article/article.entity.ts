import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
}
