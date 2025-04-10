import { AppsMedias } from '../entities/AppsMedias';
import { AppsMediasRepository } from '../repositories/AppsMediasRepository';

export class AppsMediasService {
  private repository: AppsMediasRepository;

  constructor() {
    this.repository = new AppsMediasRepository();
  }

  async getAllMedias(): Promise<AppsMedias[]> {
    return this.repository.findAll();
  }

  async getMediaByUuid(appMediaUuid: string): Promise<AppsMedias | null> {
    return this.repository.findByUuid(appMediaUuid);
  }

  async getMediasByAppUuid(appUuid: string): Promise<AppsMedias[]> {
    return this.repository.findByAppUuid(appUuid);
  }
  
  async createMedia(mediaData: Partial<AppsMedias>): Promise<AppsMedias> {
    if (!mediaData.assetId) {
      throw new Error('Asset ID is required');
    }
    if (!mediaData.appUuid) {
      throw new Error('App UUID is required');
    }
    return this.repository.create(mediaData);
  }
  

  async updateMedia(appMediaUuid: string, mediaData: Partial<AppsMedias>): Promise<AppsMedias | null> {
    const existingMedia = await this.repository.findByUuid(appMediaUuid);
    if (!existingMedia) {
      throw new Error('Media not found');
    }
    return this.repository.update(appMediaUuid, mediaData);
  }

  async deleteMedia(appMediaUuid: string): Promise<boolean> {
    const existingMedia = await this.repository.findByUuid(appMediaUuid);
    if (!existingMedia) {
      throw new Error('Media not found');
    }
    return this.repository.delete(appMediaUuid);
  }

  async updateMediaUpdatedAt(appMediaUuid: string): Promise<AppsMedias | null> {
    const existingMedia = await this.repository.findByUuid(appMediaUuid);
    if (!existingMedia) {
      throw new Error('Media not found');
    }
    return this.repository.updateUpdatedAt(appMediaUuid);
  }
}