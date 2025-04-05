import { SchemaMigrations } from '../entities/SchemaMigrations';
import { SchemaMigrationsRepository } from '../repositories/SchemaMigrationsRepository';

export class SchemaMigrationsService {
  private repository: SchemaMigrationsRepository;

  constructor() {
    this.repository = new SchemaMigrationsRepository();
  }

  async getAllMigrations(): Promise<SchemaMigrations[]> {
    return this.repository.findAll();
  }

  async getMigrationByVersion(version: string): Promise<SchemaMigrations | null> {
    return this.repository.findByVersion(version);
  }

  async createMigration(migrationData: Partial<SchemaMigrations>): Promise<SchemaMigrations> {
    if (!migrationData.version) {
      throw new Error('Version is required');
    }
    if (migrationData.dirty === undefined) {
      throw new Error('Dirty status is required');
    }
    return this.repository.create(migrationData);
  }

  async updateMigration(version: string, migrationData: Partial<SchemaMigrations>): Promise<SchemaMigrations | null> {
    const existingMigration = await this.repository.findByVersion(version);
    if (!existingMigration) {
      throw new Error('Migration not found');
    }
    return this.repository.update(version, migrationData);
  }

  async deleteMigration(version: string): Promise<boolean> {
    const existingMigration = await this.repository.findByVersion(version);
    if (!existingMigration) {
      throw new Error('Migration not found');
    }
    return this.repository.delete(version);
  }
}