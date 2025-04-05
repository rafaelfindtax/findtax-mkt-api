import { Repository } from 'typeorm';
import { AppsMedias } from '../entities/AppsMedias';
import { AppDataSource } from '../config/database';

export class AppsMediasRepository {
  private repository: Repository<AppsMedias>;

  constructor() {
    this.repository = AppDataSource.getRepository(AppsMedias);
  }

  async findAll(): Promise<AppsMedias[]> {
    return this.repository.find({
      relations: ['appUu'],
    });
  }

  async findByUuid(appMediaUuid: string): Promise<AppsMedias | null> {
    return this.repository.findOne({
      where: { appMediaUuid },
      relations: ['appUu'],
    });
  }

  async findByAppUuid(appUuid: string): Promise<AppsMedias[]> {
    return this.repository.find({
      where: { appUu: { appUuid } },
      relations: ['appUu'],
    });
  }

  async create(mediaData: Partial<AppsMedias>): Promise<AppsMedias> {
    const media = this.repository.create(mediaData);
    return this.repository.save(media);
  }

  async update(appMediaUuid: string, mediaData: Partial<AppsMedias>): Promise<AppsMedias | null> {
    await this.repository.update(appMediaUuid, mediaData);
    return this.findByUuid(appMediaUuid);
  }

  async delete(appMediaUuid: string): Promise<boolean> {
    const result = await this.repository.delete(appMediaUuid);
    return result.affected ? result.affected > 0 : false;
  }

  async updateUpdatedAt(appMediaUuid: string): Promise<AppsMedias | null> {
    await this.repository.update(appMediaUuid, { updatedAt: new Date() });
    return this.findByUuid(appMediaUuid);
  }
}