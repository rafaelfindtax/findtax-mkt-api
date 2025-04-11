import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { AppProvider } from '../entities/AppProvider';

export class AppProviderRepository {
  private repository: Repository<AppProvider>;

  constructor() {
    this.repository = AppDataSource.getRepository(AppProvider);
  }

  async findAll(): Promise<AppProvider[]> {
    return this.repository.find({
      relations: ['apps', 'leisIncentivos', 'providerTypeUuid', 'accounts'],
    });
    console.log("")
  }

  async findByUuid(uuid: string): Promise<AppProvider | null> {
    return this.repository.findOne({
      where: { uuid },
      relations: ['apps', 'leisIncentivos', 'providerTypeUuid', 'accounts'],
    });
  }

  async create(data: Partial<AppProvider>): Promise<AppProvider> {
    const provider = this.repository.create(data);
    return this.repository.save(provider);
  }

  async update(uuid: string, data: Partial<AppProvider>): Promise<AppProvider | null> {
    await this.repository.update(uuid, data);
    return this.findByUuid(uuid);
  }

  async delete(uuid: string): Promise<boolean> {
    const result = await this.repository.delete(uuid);
    return result.affected !== 0;
  }

  async findByName(name: string): Promise<AppProvider[]> {
    return this.repository.find({
      where: { name },
      relations: ['apps', 'leisIncentivos', 'accounts'],
    });
  }

  async updateUpdatedAt(uuid: string): Promise<AppProvider | null> {
    await this.repository.update(uuid, { updatedAt: new Date() });
    return this.findByUuid(uuid);
  }
}
