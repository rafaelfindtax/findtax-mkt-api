import { Repository } from 'typeorm';
import { AppMainFunctionalities } from '../entities/AppMainFunctionalities';
import { AppDataSource } from '../config/database';

export class AppMainFunctionalitiesRepository {
  private repository: Repository<AppMainFunctionalities>;

  constructor() {
    this.repository = AppDataSource.getRepository(AppMainFunctionalities);
  }

  async findAll(): Promise<AppMainFunctionalities[]> {
    return this.repository.find({
      relations: ['appUu'],
    });
  }

  async findById(id: number): Promise<AppMainFunctionalities | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['appUu'],
    });
  }

  async findByAppUuid(appUuid: string): Promise<AppMainFunctionalities[]> {
    return this.repository.find({
      where: { appUu: { appUuid } },
      relations: ['appUu'],
    });
  }

  async create(functionalityData: Partial<AppMainFunctionalities>): Promise<AppMainFunctionalities> {
    const functionality = this.repository.create(functionalityData);
    return this.repository.save(functionality);
  }

  async update(id: number, functionalityData: Partial<AppMainFunctionalities>): Promise<AppMainFunctionalities | null> {
    await this.repository.update(id, functionalityData);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  async updateUpdatedAt(id: number): Promise<AppMainFunctionalities | null> {
    await this.repository.update(id, { updatedAt: new Date() });
    return this.findById(id);
  }
}