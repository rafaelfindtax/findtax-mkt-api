import { AppSubCategories } from '../entities/AppSubCategories';
import { AppSubCategoryRepository } from '../repositories/AppSubCategoryRepository';

export class AppSubCategoryService {
  private repository: AppSubCategoryRepository;

  constructor() {
    this.repository = new AppSubCategoryRepository();
  }

  async getAll(): Promise<AppSubCategories[]> {
    return this.repository.findAll();
  }

  async getById(uuid: string): Promise<AppSubCategories | null> {
    return this.repository.findById(uuid);
  }

  async getByCategory(appCategoryUuid: string): Promise<AppSubCategories[]> {
    return this.repository.findByCategoryId(appCategoryUuid);
  }

  async create(data: Partial<AppSubCategories>): Promise<AppSubCategories> {
    if (!data.name || !data.appCategoryUuid) {
      throw new Error('Name and Category are required');
    }
    return this.repository.create(data);
  }

  async update(uuid: string, data: Partial<AppSubCategories>): Promise<AppSubCategories | null> {
    return this.repository.update(uuid, data);
  }

  async delete(uuid: string): Promise<boolean> {
    return this.repository.delete(uuid);
  }
}
