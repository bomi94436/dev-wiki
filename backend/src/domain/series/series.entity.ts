import { Article } from 'domain/article/article.entity'
import { User } from 'domain/user/user.entity'
import UuidService from 'domain/uuidService'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ database: 'dev_wiki_db', name: 'series' })
export class Series {
  @PrimaryGeneratedColumn({ name: 'series_id' })
  id: number

  @Column({ length: 100, comment: '이름' })
  name: string

  @CreateDateColumn({ comment: '생성일자' })
  created_at: Date

  @UpdateDateColumn({ comment: '수정일자' })
  updated_at?: Date

  @Column(
    new UuidService().uuidColumnOptions({
      name: 'created_by_id',
    })
  )
  created_by_id: string

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'created_by_id',
  })
  created_by: User

  @OneToMany(() => Article, (article) => article.series)
  articles?: Article[]
}
