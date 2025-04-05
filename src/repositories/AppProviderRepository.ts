import { Repository } from 'typeorm';
import { AppProvider } from '../entities/AppProvider';
import { AppDataSource } from '../config/database';

export class AppProviderRepository {
  private repository: Repository<AppProvider>;

  constructor() {
    this.repository = AppDataSource.getRepository(AppProvider);
  }

  async findAll(): Promise<AppProvider[]> {
    return this.repository.find({
      relations: ['apps', 'leisIncentivos'],
    });
  }

  async findByUuid(uuid: string): Promise<AppProvider | null> {
    return this.repository.findOne({
      where: { uuid },
      relations: ['apps', 'leisIncentivos'],
    });
  }

  async findByName(name: string): Promise<AppProvider[]> {
    return this.repository.find({
      where: { name },
      relations: ['apps', 'leisIncentivos'],
    });
  }

  async create(providerData: Partial<AppProvider>): Promise<AppProvider> {
    const provider = this.repository.create(providerData);
    return this.repository.save(provider);
  }

  async update(uuid: string, providerData: Partial<AppProvider>): Promise<AppProvider | null> {
    await this.repository.update(uuid, providerData);
    return this.findByUuid(uuid);
  }

  async delete(uuid: string): Promise<boolean> {
    const result = await this.repository.delete(uuid);
    return result.affected ? result.affected > 0 : false;
  }

  async updateUpdatedAt(uuid: string): Promise<AppProvider | null> {
    await this.repository.update(uuid, { updatedAt: new Date() });
    return this.findByUuid(uuid);
  }
}