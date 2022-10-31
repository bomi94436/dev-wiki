import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ database: 'dev_wiki_db', name: 'task_card' })
export class TaskCard {
  @PrimaryGeneratedColumn({ name: 'task_card_id' })
  id: number

  @Column({ length: 200 })
  name: string

  @Column({ nullable: true, length: 500 })
  description?: string

  @Column({ type: 'boolean', default: false })
  is_closed: boolean

  constructor() {}
}
