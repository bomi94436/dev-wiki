import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Task } from '../task/task.entity'
import UuidService from 'domain/uuidService'
import { User } from 'domain/user/user.entity'

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

  total_task_count: number = 0
  completed_task_count: number = 0

  getTotalTaskCount() {
    this.total_task_count = this.tasks?.length || 0
  }
  getCompletedTaskCount() {
    this.completed_task_count = this.tasks?.filter((task) => task.completed_at).length || 0
  }

  @AfterLoad()
  afterLoad() {
    this.getTotalTaskCount()
    this.getCompletedTaskCount()
    delete this.tasks
  }

  constructor() {}
}
