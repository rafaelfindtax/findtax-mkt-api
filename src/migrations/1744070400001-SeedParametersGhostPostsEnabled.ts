import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedParametersGhostPostsEnabled1744070400001 implements MigrationInterface {
  name = "SeedParametersGhostPostsEnabled1744070400001";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO public.parameters (key, description, value)
      VALUES (
        'GHOST_POSTS_ENABLED',
        'Habilita/desabilita a leitura de posts do servidor Ghost Blog',
        TRUE
      )
      ON CONFLICT (key) DO NOTHING
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM public.parameters WHERE key = 'GHOST_POSTS_ENABLED'
    `);
  }
}
