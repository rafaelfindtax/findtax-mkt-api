import { Repository } from 'typeorm';
import { AppSubCategories } from '../entities/AppSubCategories';
import { AppDataSource } from '../config/database';

export class AppSubCategoryRepository {
  private repository: Repository<AppSubCategories>;

  constructor() {
    this.repository = AppDataSource.getRepository(AppSubCategories);
  }

  async findAll(): Promise<AppSubCategories[]> {
    return this.repository.find({
      relations: ['appCategoryUuid'],
    });
  }

  async findById(appSubCategoryUuid: string): Promise<AppSubCategories | null> {
    return this.repository.findOne({
      where: { appSubCategoryUuid },
      relations: ['appCategoryUuid'],
    });
  }

  async findByCategoryId(appCategoryUuid: string): Promise<AppSubCategories[]> {
    return this.repository.find({
      where: { appCategoryUuid: { appCategoriesUuid: appCategoryUuid } },
      relations: ['appCategoryUuid'],
    });
  }

  async create(subCategoryData: Partial<AppSubCategories>): Promise<AppSubCategories> {
    const subCategory = this.repository.create(subCategoryData);
    return this.repository.save(subCategory);
  }

  async update(appSubCategoryUuid: string, subCategoryData: Partial<AppSubCategories>): Promise<AppSubCategories | null> {
    await this.repository.update(appSubCategoryUuid, subCategoryData);
    return this.findById(appSubCategoryUuid);
  }

  async delete(appSubCategoryUuid: string): Promise<boolean> {
    const result = await this.repository.delete(appSubCategoryUuid);
    return result.affected ? result.affected > 0 : false;
  }
}
