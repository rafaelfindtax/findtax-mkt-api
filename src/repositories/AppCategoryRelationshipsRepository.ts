import { Repository } from 'typeorm';
import { AppCategoryRelationships } from '../entities/AppCategoryRelationships';
import { AppDataSource } from '../config/database';

export class AppCategoryRelationshipsRepository {
  private repository: Repository<AppCategoryRelationships>;

  constructor() {
    this.repository = AppDataSource.getRepository(AppCategoryRelationships);
  }

  async findAll(): Promise<AppCategoryRelationships[]> {
    return this.repository.find({
      relations: ['app', 'category', 'subCategory'],
    });
  }

  async findById(appCategoryRelationshipUuid: string): Promise<AppCategoryRelationships | null> {
    return this.repository.findOne({
      where: { appCategoryRelationshipUuid },
      relations: ['app', 'category', 'subCategory'],
    });
  }

  async create(data: Partial<AppCategoryRelationships>): Promise<AppCategoryRelationships> {
    const relationship = this.repository.create(data);
    return this.repository.save(relationship);
  }

  async update(appCategoryRelationshipUuid: string, data: Partial<AppCategoryRelationships>): Promise<AppCategoryRelationships | null> {
    await this.repository.update(appCategoryRelationshipUuid, data);
    return this.findById(appCategoryRelationshipUuid);
  }

  async delete(appCategoryRelationshipUuid: string): Promise<boolean> {
    const result = await this.repository.delete(appCategoryRelationshipUuid);
    return result.affected ? result.affected > 0 : false;
  }

  async findByAppUuid(appUuid: string): Promise<AppCategoryRelationships[]> {
    return this.repository.find({
      where: { app: { appUuid } },
      relations: ['app', 'category', 'subCategory'],
    });
  }
}
