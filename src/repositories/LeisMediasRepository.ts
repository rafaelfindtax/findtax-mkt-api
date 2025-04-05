import { Repository } from 'typeorm';
import { LeisMedias } from '../entities/LeisMedias';
import { AppDataSource } from '../config/database';

export class LeisMediasRepository {
  private repository: Repository<LeisMedias>;

  constructor() {
    this.repository = AppDataSource.getRepository(LeisMedias);
  }

  async findAll(): Promise<LeisMedias[]> {
    return this.repository.find({
      relations: ['leiUu'],
    });
  }

  async findByUuid(leiMediaUuid: string): Promise<LeisMedias | null> {
    return this.repository.findOne({
      where: { leiMediaUuid },
      relations: ['leiUu'],
    });
  }

  async findByLeiUuid(leiUuid: string): Promise<LeisMedias[]> {
    return this.repository.find({
      where: { leiUu: { leiUuid } },
      relations: ['leiUu'],
    });
  }

  async create(mediaData: Partial<LeisMedias>): Promise<LeisMedias> {
    const media = this.repository.create(mediaData);
    return this.repository.save(media);
  }

  async update(leiMediaUuid: string, mediaData: Partial<LeisMedias>): Promise<LeisMedias | null> {
    await this.repository.update(leiMediaUuid, mediaData);
    return this.findByUuid(leiMediaUuid);
  }

  async delete(leiMediaUuid: string): Promise<boolean> {
    const result = await this.repository.delete(leiMediaUuid);
    return result.affected ? result.affected > 0 : false;
  }

  async updateUpdatedAt(leiMediaUuid: string): Promise<LeisMedias | null> {
    await this.repository.update(leiMediaUuid, { updatedAt: new Date() });
    return this.findByUuid(leiMediaUuid);
  }
}