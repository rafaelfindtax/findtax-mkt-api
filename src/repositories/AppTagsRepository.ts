import { Repository } from 'typeorm';
import { AppTags } from '../entities/AppTags';
import { AppDataSource } from '../config/database';

export class AppTagsRepository {
  private repository: Repository<AppTags>;

  constructor() {
    this.repository = AppDataSource.getRepository(AppTags);
  }

  async findAll(): Promise<AppTags[]> {
    return this.repository.find({
      relations: ['appUuid'],
    });
  }

  async findById(id: number): Promise<AppTags | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['appUuid'],
    });
  }

  async findByName(name: string): Promise<AppTags[]> {
    return this.repository.find({
      where: { name },
      relations: ['appUuid'],
    });
  }

  async findByAppUuid(appUuid: string): Promise<AppTags[]> {
    return this.repository.find({
      where: { appUuid: { appUuid } },
      relations: ['appUuid'],
    });
  }

  async create(tagData: Partial<AppTags>): Promise<AppTags> {
    const tag = this.repository.create(tagData);
    return this.repository.save(tag);
  }

  async update(id: number, tagData: Partial<AppTags>): Promise<AppTags | null> {
    await this.repository.update(id, tagData);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  async updateUpdatedAt(id: number): Promise<AppTags | null> {
    await this.repository.update(id, { updatedAt: new Date() });
    return this.findById(id);
  }
}