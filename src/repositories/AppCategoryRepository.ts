import { Repository } from 'typeorm';
import { AppCategories } from '../entities/AppCategories';
import { AppDataSource } from '../config/database';

export class AppCategoryRepository {
  private repository: Repository<AppCategories>;

  constructor() {
    this.repository = AppDataSource.getRepository(AppCategories);
  }

  async findAll(): Promise<AppCategories[]> {
    return this.repository.find();
  }

  
} 