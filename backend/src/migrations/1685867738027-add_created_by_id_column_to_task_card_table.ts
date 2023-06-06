import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddCreatedByIdColumnToTaskCardTable1685867738027 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE task_card ADD created_by_id VARBINARY(16);')
    await queryRunner.query(
      'ALTER TABLE task_card ADD CONSTRAINT FK_TaskCardCreatedById FOREIGN KEY (created_by_id) REFERENCES user (user_id);'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE article DROP COLUMN created_by_id;')
    await queryRunner.query('ALTER TABLE task_card DROP FOREIGN KEY FK_TaskCardCreatedById;')
  }
}
