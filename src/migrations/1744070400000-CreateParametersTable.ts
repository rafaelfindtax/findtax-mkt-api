import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateParametersTable1744070400000 implements MigrationInterface {
  name = "CreateParametersTable1744070400000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS public.parameters (
        uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        key VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        value BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS public.parameters`);
  }
}
