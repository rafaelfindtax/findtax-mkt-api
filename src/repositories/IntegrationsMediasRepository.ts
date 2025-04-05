import { Repository } from 'typeorm';
import { IntegrationsMedias } from '../entities/IntegrationsMedias';
import { AppDataSource } from '../config/database';

export class IntegrationsMediasRepository {
  private repository: Repository<IntegrationsMedias>;

  constructor() {
    this.repository = AppDataSource.getRepository(IntegrationsMedias);
  }

  async findAll(): Promise<IntegrationsMedias[]> {
    return this.repository.find({
      relations: ['appIntegrations'],
    });
  }

  async findByUuid(integrationMediaUuid: string): Promise<IntegrationsMedias | null> {
    return this.repository.findOne({
      where: { integrationMediaUuid },
      relations: ['appIntegrations'],
    });
  }

  async findByName(name: string): Promise<IntegrationsMedias[]> {
    return this.repository.find({
      where: { name },
      relations: ['appIntegrations'],
    });
  }

  async create(mediaData: Partial<IntegrationsMedias>): Promise<IntegrationsMedias> {
    const media = this.repository.create(mediaData);
    return this.repository.save(media);
  }

  async update(
    integrationMediaUuid: string,
    mediaData: Partial<IntegrationsMedias>
  ): Promise<IntegrationsMedias | null> {
    await this.repository.update(integrationMediaUuid, mediaData);
    return this.findByUuid(integrationMediaUuid);
  }

  async delete(integrationMediaUuid: string): Promise<boolean> {
    const result = await this.repository.delete(integrationMediaUuid);
    return result.affected ? result.affected > 0 : false;
  }

  async updateUpdatedAt(integrationMediaUuid: string): Promise<IntegrationsMedias | null> {
    await this.repository.update(integrationMediaUuid, { updatedAt: new Date() });
    return this.findByUuid(integrationMediaUuid);
  }
}