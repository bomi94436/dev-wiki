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

/**
 * @swagger
 *  components:
 *  schemas:
 *    Article:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 10
 *        title:
 *          type: string
 *          example: 아티클 제목
 *        thumbnail:
 *          type: string
 *          nullable: true
 *          example: http://localhost:5001/static/uploads/image-1676914393377.png
 *        short_description:
 *          type: string
 *          nullable: true
 *          example: 아티클 설명
 *        content:
 *          type: string
 *          example: 아티클 내용
 *        my_views:
 *          type: integer
 *          example: 300
 *        created_at:
 *          type: string
 *          format: date-time
 *          example: 2023-02-21T07:54:39.312Z
 *        updated_at:
 *          type: string
 *          format: date-time
 *          example: 2023-02-21T07:54:39.312Z
 *        writer_id:
 *          type: string
 *          format: uuid
 *          example: f1b00933-e51d-4f7f-bdf1-03016f3dd96b
 */
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
