import { AppCategoryRelationshipsRepository } from '../repositories/AppCategoryRelationshipsRepository';
import { AppCategoryRelationships } from '../entities/AppCategoryRelationships';

export class AppCategoryRelationshipsService {
  private repository = new AppCategoryRelationshipsRepository();

  async getAll(): Promise<AppCategoryRelationships[]> {
    return this.repository.findAll();
  }

  async getById(appCategoryRelationshipUuid: string): Promise<AppCategoryRelationships | null> {
    return this.repository.findById(appCategoryRelationshipUuid);
  }

  async create(data: Partial<AppCategoryRelationships>): Promise<AppCategoryRelationships> {
    return this.repository.create(data);
  }

  async update(appCategoryRelationshipUuid: string, data: Partial<AppCategoryRelationships>): Promise<AppCategoryRelationships | null> {
    return this.repository.update(appCategoryRelationshipUuid, data);
  }

  async delete(appCategoryRelationshipUuid: string): Promise<boolean> {
    return this.repository.delete(appCategoryRelationshipUuid);
  }

  async getByAppUuid(appUuid: string): Promise<AppCategoryRelationships[]> {
    return this.repository.findByAppUuid(appUuid);
  }
}
