import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class AddSeriesTableAndSeriesIdFkInArticleAndArticleHistory1686406775100
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'series',
        columns: [
          {
            name: 'series_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            comment: '이름',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            comment: '생성일자',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            comment: '수정일자',
            isNullable: true,
          },
          {
            name: 'created_by_id',
            type: 'varbinary',
            length: '16',
          },
        ],
      }),
      true
    )

    await queryRunner.createForeignKey(
      'series',
      new TableForeignKey({
        columnNames: ['created_by_id'],
        referencedColumnNames: ['user_id'],
        referencedTableName: 'user',
      })
    )

    await queryRunner.addColumn(
      'article',
      new TableColumn({
        name: 'series_id',
        type: 'int',
        isNullable: true,
      })
    )

    await queryRunner.createForeignKey(
      'article',
      new TableForeignKey({
        columnNames: ['series_id'],
        referencedColumnNames: ['series_id'],
        referencedTableName: 'series',
      })
    )

    await queryRunner.addColumn(
      'article_history',
      new TableColumn({
        name: 'series_id',
        type: 'int',
        isNullable: true,
      })
    )

    await queryRunner.createForeignKey(
      'article_history',
      new TableForeignKey({
        columnNames: ['series_id'],
        referencedColumnNames: ['series_id'],
        referencedTableName: 'series',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const articleTable = await queryRunner.getTable('article')
    const articleForeignKey = articleTable?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('series_id') !== -1
    )
    if (articleForeignKey) {
      await queryRunner.dropForeignKey('article', articleForeignKey)
    }

    await queryRunner.dropColumn('article', 'series_id')

    const articleHistoryTable = await queryRunner.getTable('article_history')
    const articleHistoryForeignKey = articleHistoryTable?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('series_id') !== -1
    )
    if (articleHistoryForeignKey) {
      await queryRunner.dropForeignKey('article_history', articleHistoryForeignKey)
    }

    await queryRunner.dropColumn('article_history', 'series_id')

    await queryRunner.dropTable('series')
  }
}
