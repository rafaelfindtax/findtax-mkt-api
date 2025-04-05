import { Repository } from 'typeorm';
import { AtalhosMedias } from '../entities/AtalhosMedias';
import { AppDataSource } from '../config/database';

export class AtalhosMediasRepository {
  private repository: Repository<AtalhosMedias>;

  constructor() {
    this.repository = AppDataSource.getRepository(AtalhosMedias);
  }

  async findAll(): Promise<AtalhosMedias[]> {
    return this.repository.find({
      relations: ['accountAtalhos'],
    });
  }

  async findByUuid(atalhoMediaUuid: string): Promise<AtalhosMedias | null> {
    return this.repository.findOne({
      where: { atalhoMediaUuid },
      relations: ['accountAtalhos'],
    });
  }

  async findByName(name: string): Promise<AtalhosMedias[]> {
    return this.repository.find({
      where: { name },
      relations: ['accountAtalhos'],
    });
  }

  async create(mediaData: Partial<AtalhosMedias>): Promise<AtalhosMedias> {
    const media = this.repository.create(mediaData);
    return this.repository.save(media);
  }

  async update(atalhoMediaUuid: string, mediaData: Partial<AtalhosMedias>): Promise<AtalhosMedias | null> {
    await this.repository.update(atalhoMediaUuid, mediaData);
    return this.findByUuid(atalhoMediaUuid);
  }

  async delete(atalhoMediaUuid: string): Promise<boolean> {
    const result = await this.repository.delete(atalhoMediaUuid);
    return result.affected ? result.affected > 0 : false;
  }

  async updateUpdatedAt(atalhoMediaUuid: string): Promise<AtalhosMedias | null> {
    await this.repository.update(atalhoMediaUuid, { updatedAt: new Date() });
    return this.findByUuid(atalhoMediaUuid);
  }
}