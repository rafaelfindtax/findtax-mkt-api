import { Repository } from 'typeorm';
import { SchemaMigrations } from '../entities/SchemaMigrations';
import { AppDataSource } from '../config/database';

export class SchemaMigrationsRepository {
  private repository: Repository<SchemaMigrations>;

  constructor() {
    this.repository = AppDataSource.getRepository(SchemaMigrations);
  }

  async findAll(): Promise<SchemaMigrations[]> {
    return this.repository.find();
  }

  async findByVersion(version: string): Promise<SchemaMigrations | null> {
    return this.repository.findOne({
      where: { version },
    });
  }

  async create(migrationData: Partial<SchemaMigrations>): Promise<SchemaMigrations> {
    const migration = this.repository.create(migrationData);
    return this.repository.save(migration);
  }

  async update(version: string, migrationData: Partial<SchemaMigrations>): Promise<SchemaMigrations | null> {
    await this.repository.update(version, migrationData);
    return this.findByVersion(version);
  }

  async delete(version: string): Promise<boolean> {
    const result = await this.repository.delete(version);
    return result.affected ? result.affected > 0 : false;
  }
}