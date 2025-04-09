import { AppTags } from '../entities/AppTags';
import { AppTagsRepository } from '../repositories/AppTagsRepository';

export class AppTagsService {
  private repository: AppTagsRepository;

  constructor() {
    this.repository = new AppTagsRepository();
  }

  async getAllTags(): Promise<AppTags[]> {
    return this.repository.findAll();
  }

  async getTagById(id: number): Promise<AppTags | null> {
    return this.repository.findById(id);
  }

  async getTagsByName(name: string): Promise<AppTags[]> {
    return this.repository.findByName(name);
  }

  async getTagsByAppUuid(appUuid: string): Promise<AppTags[]> {
    return this.repository.findByAppUuid(appUuid);
  }

  async createTag(tagData: Partial<AppTags>): Promise<AppTags> {
    if (!tagData.name) {
      throw new Error('Name is required');
    }
    if (!tagData.appUuid || !tagData.appUuid.appUuid) {
      throw new Error('App UUID is required');
    }
    return this.repository.create(tagData);
  }

  async updateTag(id: number, tagData: Partial<AppTags>): Promise<AppTags | null> {
    const existingTag = await this.repository.findById(id);
    if (!existingTag) {
      throw new Error('Tag not found');
    }
    return this.repository.update(id, tagData);
  }

  async deleteTag(id: number): Promise<boolean> {
    const existingTag = await this.repository.findById(id);
    if (!existingTag) {
      throw new Error('Tag not found');
    }
    return this.repository.delete(id);
  }

  async updateTagUpdatedAt(id: number): Promise<AppTags | null> {
    const existingTag = await this.repository.findById(id);
    if (!existingTag) {
      throw new Error('Tag not found');
    }
    return this.repository.updateUpdatedAt(id);
  }
}