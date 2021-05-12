import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTicketsTable1620609112485 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tickets',
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
            name: 'ticket_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'passenger_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'birth_date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'flight_id',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'flight_date',
            type: 'date',
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
            name: 'flight',
            columnNames: ['flight_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'flights',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tickets');
  }
}
