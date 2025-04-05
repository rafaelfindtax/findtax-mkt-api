import { AtalhosMedias } from '../entities/AtalhosMedias';
import { AtalhosMediasRepository } from '../repositories/AtalhosMediasRepository';

export class AtalhosMediasService {
  private repository: AtalhosMediasRepository;

  constructor() {
    this.repository = new AtalhosMediasRepository();
  }

  async getAllMedias(): Promise<AtalhosMedias[]> {
    return this.repository.findAll();
  }

  async getMediaByUuid(atalhoMediaUuid: string): Promise<AtalhosMedias | null> {
    return this.repository.findByUuid(atalhoMediaUuid);
  }

  async getMediasByName(name: string): Promise<AtalhosMedias[]> {
    return this.repository.findByName(name);
  }

  async createMedia(mediaData: Partial<AtalhosMedias>): Promise<AtalhosMedias> {
    if (!mediaData.name) {
      throw new Error('Name is required');
    }
    if (!mediaData.assetId) {
      throw new Error('Asset ID is required');
    }
    return this.repository.create(mediaData);
  }

  async updateMedia(atalhoMediaUuid: string, mediaData: Partial<AtalhosMedias>): Promise<AtalhosMedias | null> {
    const existingMedia = await this.repository.findByUuid(atalhoMediaUuid);
    if (!existingMedia) {
      throw new Error('Media not found');
    }
    return this.repository.update(atalhoMediaUuid, mediaData);
  }

  async deleteMedia(atalhoMediaUuid: string): Promise<boolean> {
    const existingMedia = await this.repository.findByUuid(atalhoMediaUuid);
    if (!existingMedia) {
      throw new Error('Media not found');
    }
    return this.repository.delete(atalhoMediaUuid);
  }

  async updateMediaUpdatedAt(atalhoMediaUuid: string): Promise<AtalhosMedias | null> {
    const existingMedia = await this.repository.findByUuid(atalhoMediaUuid);
    if (!existingMedia) {
      throw new Error('Media not found');
    }
    return this.repository.updateUpdatedAt(atalhoMediaUuid);
  }
}