import { MigrationInterface, QueryRunner } from 'typeorm';

export class DevelopmentBuild1619716965015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(``);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
