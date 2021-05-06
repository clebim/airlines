import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createCompanysAirportsTable1620341996071
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'companies_airports',
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
            name: 'company_id',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'airport_id',
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
            name: 'airport',
            columnNames: ['airport_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'airports',
          },
          {
            name: 'company',
            columnNames: ['company_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'companies',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('companies_airports');
  }
}
