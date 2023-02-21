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

/**
 * @swagger
 *  components:
 *  schemas:
 *    Task:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 10
 *        content:
 *          type: string
 *          example: 태스크 내용
 *        date:
 *          type: string
 *          nullable: true
 *        time:
 *          type: string
 *          nullable: true
 *        completed_at:
 *          type: string
 *          format: date-time
 *          nullable: true
 *          example: 2023-02-21T07:54:39.312Z
 *        created_at:
 *          type: string
 *          format: date-time
 *          example: 2023-02-21T07:54:39.312Z
 *        task_card_id:
 *          type: integer
 *          example: 10
 *        parent_task_id:
 *          type: integer
 *          example: 10
 *          nullable: true
 *        sub_tasks:
 *          type: array
 *          xml:
 *            name: sub tasks
 *            wrapped: true
 *          items:
 *            $ref: '#/components/schemas/Task'
 */
@Entity({ database: 'dev_wiki_db', name: 'task' })
export class Task {
  @PrimaryGeneratedColumn({ name: 'task_id' })
  id: number

  @Column({ length: 200, comment: 'task 내용' })
  content: string

  // FIXME: 타임존 정보 주입가능 여부
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
