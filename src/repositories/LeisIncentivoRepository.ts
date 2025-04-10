import { Repository } from 'typeorm';
import { LeisIncentivo } from '../entities/LeisIncentivo';
import { AppDataSource } from '../config/database';

export class LeisIncentivoRepository {
  private repository: Repository<LeisIncentivo>;

  constructor() {
    this.repository = AppDataSource.getRepository(LeisIncentivo);
  }

  async findAll(): Promise<LeisIncentivo[]> {
    return this.repository.find({
      relations: ['appProviderUuid', 'leisMedias'],
    });
  }

  async findByUuid(leiUuid: string): Promise<LeisIncentivo | null> {
    return this.repository.findOne({
      where: { leiUuid },
      relations: ['appProviderUuid', 'leisMedias'],
    });
  }

  async findByProviderUuid(appProviderUuidid: string): Promise<LeisIncentivo[]> {
    return this.repository.find({
      where: { appProviderUuid: { uuid: appProviderUuidid } },
      relations: ['appProviderUuid', 'leisMedias'],
    });
  }

  async create(leiData: Partial<LeisIncentivo>): Promise<LeisIncentivo> {
    const lei = this.repository.create(leiData);
    return this.repository.save(lei);
  }

  async update(leiUuid: string, leiData: Partial<LeisIncentivo>): Promise<LeisIncentivo | null> {
    await this.repository.update(leiUuid, leiData);
    return this.findByUuid(leiUuid);
  }

  async delete(leiUuid: string): Promise<boolean> {
    const result = await this.repository.delete(leiUuid);
    return result.affected ? result.affected > 0 : false;
  }

  async updateUpdatedAt(leiUuid: string): Promise<LeisIncentivo | null> {
    await this.repository.update(leiUuid, { updatedAt: new Date() });
    return this.findByUuid(leiUuid);
  }
}