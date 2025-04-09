import { LeisMedias } from '../entities/LeisMedias';
import { LeisMediasRepository } from '../repositories/LeisMediasRepository';

export class LeisMediasService {
  private repository: LeisMediasRepository;

  constructor() {
    this.repository = new LeisMediasRepository();
  }

  async getAllMedias(): Promise<LeisMedias[]> {
    return this.repository.findAll();
  }

  async getMediaByUuid(leiMediaUuid: string): Promise<LeisMedias | null> {
    return this.repository.findByUuid(leiMediaUuid);
  }

  async getMediasByLeiUuid(leiUuid: string): Promise<LeisMedias[]> {
    return this.repository.findByLeiUuid(leiUuid);
  }

  async createMedia(mediaData: Partial<LeisMedias>): Promise<LeisMedias> {
    if (!mediaData.assetId) {
      throw new Error('Asset ID is required');
    }
    if (!mediaData.leiUuid || !mediaData.leiUuid.leiUuid) {
      throw new Error('Lei UUID is required');
    }
    return this.repository.create(mediaData);
  }

  async updateMedia(leiMediaUuid: string, mediaData: Partial<LeisMedias>): Promise<LeisMedias | null> {
    const existingMedia = await this.repository.findByUuid(leiMediaUuid);
    if (!existingMedia) {
      throw new Error('Media not found');
    }
    return this.repository.update(leiMediaUuid, mediaData);
  }

  async deleteMedia(leiMediaUuid: string): Promise<boolean> {
    const existingMedia = await this.repository.findByUuid(leiMediaUuid);
    if (!existingMedia) {
      throw new Error('Media not found');
    }
    return this.repository.delete(leiMediaUuid);
  }

  async updateMediaUpdatedAt(leiMediaUuid: string): Promise<LeisMedias | null> {
    const existingMedia = await this.repository.findByUuid(leiMediaUuid);
    if (!existingMedia) {
      throw new Error('Media not found');
    }
    return this.repository.updateUpdatedAt(leiMediaUuid);
  }
}