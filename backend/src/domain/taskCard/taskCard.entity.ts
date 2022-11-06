import { AfterLoad, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Task } from './task.entity'

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

  @OneToMany(() => Task, (task) => task.task_card)
  tasks?: Task[]

  task_count: number

  @AfterLoad()
  getTasksCount() {
    this.task_count = this.tasks?.length || 0
    delete this.tasks
  }

  constructor() {}
}
