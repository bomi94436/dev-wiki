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

@Entity({ database: 'dev_wiki_db', name: 'series' })
export class Series {
  @PrimaryGeneratedColumn({ name: 'series_id' })
  id: number

  @Column({ length: 100 })
  name: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

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
}
