import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { DateString, TimeString } from 'global/type'
import { TaskCard } from 'domain/taskCard/taskCard.entity'

@Entity({ database: 'dev_wiki_db', name: 'task' })
export class Task {
  @PrimaryGeneratedColumn({ name: 'task_id' })
  id: number

  @Column({ length: 200, comment: 'task 내용' })
  content: string

  @Column({ type: 'date', nullable: true, comment: 'task 완료 목표 날짜' })
  date?: DateString

  @Column({ type: 'time', nullable: true, comment: 'task 완료 목표 시간' })
  time?: TimeString

  @Column({
    type: 'timestamp',
    nullable: true,
    comment: 'task 완료 시각, 값이 존재하면 완료한 task라는 의미',
  })
  completed_at?: Date

  @CreateDateColumn()
  created_at: Date

  @Column({ comment: 'task가 속한 card id' })
  task_card_id: number

  @ManyToOne(() => TaskCard, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'task_card_id' })
  task_card: TaskCard

  @Column({ nullable: true, comment: '상위 task id, null일 경우 최상위 task' })
  parent_task_id: number | null

  @ManyToOne(() => Task, (task) => task.sub_tasks, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'parent_task_id' })
  parent_task: Task

  @OneToMany(() => Task, (task) => task.parent_task)
  sub_tasks: Task[]
}
