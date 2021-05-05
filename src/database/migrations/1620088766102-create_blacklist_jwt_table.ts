import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createBlacklistJwtTable1620088766102
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'blacklist_jwt',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            unsigned: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'token_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'company_id',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'company',
            columnNames: ['company_id'],
            referencedTableName: 'companies',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('blacklist_jwt');
  }
}
