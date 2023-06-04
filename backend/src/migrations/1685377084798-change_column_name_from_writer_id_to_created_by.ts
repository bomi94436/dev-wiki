import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeColumnNameFromWriterIdToCreatedBy1685377084798 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE article RENAME COLUMN writer_id TO created_by_id;`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE article RENAME COLUMN created_by_id TO writer_id;`)
  }
}
