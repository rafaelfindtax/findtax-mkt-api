import { IntegrationsMedias } from '../entities/IntegrationsMedias';
import { IntegrationsMediasRepository } from '../repositories/IntegrationsMediasRepository';

export class IntegrationsMediasService {
  private repository: IntegrationsMediasRepository;

  constructor() {
    this.repository = new IntegrationsMediasRepository();
  }

  async getAllMedias(): Promise<IntegrationsMedias[]> {
    return this.repository.findAll();
  }

  async getMediaByUuid(integrationMediaUuid: string): Promise<IntegrationsMedias | null> {
    return this.repository.findByUuid(integrationMediaUuid);
  }

  async getMediasByName(name: string): Promise<IntegrationsMedias[]> {
    return this.repository.findByName(name);
  }

  async createMedia(mediaData: Partial<IntegrationsMedias>): Promise<IntegrationsMedias> {
    if (!mediaData.assetId) {
      throw new Error('Asset ID is required');
    }
    return this.repository.create(mediaData);
  }

  async updateMedia(
    integrationMediaUuid: string,
    mediaData: Partial<IntegrationsMedias>
  ): Promise<IntegrationsMedias | null> {
    const existingMedia = await this.repository.findByUuid(integrationMediaUuid);
    if (!existingMedia) {
      throw new Error('Media not found');
    }
    return this.repository.update(integrationMediaUuid, mediaData);
  }

  async deleteMedia(integrationMediaUuid: string): Promise<boolean> {
    const existingMedia = await this.repository.findByUuid(integrationMediaUuid);
    if (!existingMedia) {
      throw new Error('Media not found');
    }
    return this.repository.delete(integrationMediaUuid);
  }

  async updateMediaUpdatedAt(integrationMediaUuid: string): Promise<IntegrationsMedias | null> {
    const existingMedia = await this.repository.findByUuid(integrationMediaUuid);
    if (!existingMedia) {
      throw new Error('Media not found');
    }
    return this.repository.updateUpdatedAt(integrationMediaUuid);
  }
}