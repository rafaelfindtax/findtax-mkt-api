import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { ProviderTypes } from '../entities/ProviderTypes';

export class ProviderTypeRepository {
  private repository: Repository<ProviderTypes>;

  constructor() {
    this.repository = AppDataSource.getRepository(ProviderTypes);
  }

  async findAll(): Promise<ProviderTypes[]> {
    return this.repository.find({
      relations: ['appProviders'],
    });
  }

  async findByUuid(uuid: string): Promise<ProviderTypes | null> {
    return this.repository.findOne({
      where: { providerTypeUuid: uuid },
      relations: ['appProviders'],
    });
  }

  async create(data: Partial<ProviderTypes>): Promise<ProviderTypes> {
    const newType = this.repository.create(data);
    return this.repository.save(newType);
  }

  async update(uuid: string, data: Partial<ProviderTypes>): Promise<ProviderTypes | null> {
    await this.repository.update(uuid, data);
    return this.findByUuid(uuid);
  }

  async delete(uuid: string): Promise<boolean> {
    const result = await this.repository.delete(uuid);
    return result.affected ? result.affected > 0 : false;
  }
}
