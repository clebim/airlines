import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createFlightsTable1620425111000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'flights',
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
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'company_id',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'airport_origin_id',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'airport_destiny_id',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'day_week',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'exit_at',
            type: 'time',
            isNullable: false,
          },
          {
            name: 'airplane_model',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'capacity',
            type: 'int',
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
            name: 'airport_origin',
            columnNames: ['airport_origin_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'airports',
          },
          {
            name: 'airport_destiny',
            columnNames: ['airport_destiny_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'airports',
          },
          {
            name: 'airline',
            columnNames: ['company_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'companies',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('flights');
  }
}
