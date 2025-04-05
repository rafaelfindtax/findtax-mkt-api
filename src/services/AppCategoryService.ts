import { AppCategories } from '../entities/AppCategories';
import { AppCategoryRepository } from '../repositories/AppCategoryRepository';

export class AppCategoryService {
  private repository: AppCategoryRepository;

  constructor() {
    this.repository = new AppCategoryRepository();
  }

  async getAllCategories(): Promise<AppCategories[]> {
    return this.repository.findAll();
  }

 
} 