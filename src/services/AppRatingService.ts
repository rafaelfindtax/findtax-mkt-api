import { AppRating } from '../entities/AppRating';
import { AppRatingRepository } from '../repositories/AppRatingRepository';

export class AppRatingService {
  private repository: AppRatingRepository;

  constructor() {
    this.repository = new AppRatingRepository();
  }

  async getAllRatings(): Promise<AppRating[]> {
    return this.repository.findAll();
  }

  async getRatingByUuid(uuid: string): Promise<AppRating | null> {
    return this.repository.findByUuid(uuid);
  }

  async getRatingsByAccountUuid(accountUuid: string): Promise<AppRating[]> {
    return this.repository.findByAccountUuid(accountUuid);
  }

  async getRatingsByAppUuid(appUuid: string): Promise<AppRating[]> {
    return this.repository.findByAppUuid(appUuid);
  }

  async createRating(ratingData: Partial<AppRating>): Promise<AppRating> {
    if (!ratingData.comment) {
      throw new Error('Comment is required');
    }
    if (ratingData.stars === undefined || ratingData.stars < 0 || ratingData.stars > 5) {
      throw new Error('Stars must be between 0 and 5');
    }
    if (!ratingData.accountUuid || !ratingData.accountUuid.uuid) {
      throw new Error('Account UUID is required');
    }
    if (!ratingData.appUuid || !ratingData.appUuid.appUuid) {
      throw new Error('App UUID is required');
    }
    return this.repository.create(ratingData);
  }

  async updateRating(uuid: string, ratingData: Partial<AppRating>): Promise<AppRating | null> {
    const existingRating = await this.repository.findByUuid(uuid);
    if (!existingRating) {
      throw new Error('Rating not found');
    }
    return this.repository.update(uuid, ratingData);
  }

  async deleteRating(uuid: string): Promise<boolean> {
    const existingRating = await this.repository.findByUuid(uuid);
    if (!existingRating) {
      throw new Error('Rating not found');
    }
    return this.repository.delete(uuid);
  }

  async updateRatingUpdatedAt(uuid: string): Promise<AppRating | null> {
    const existingRating = await this.repository.findByUuid(uuid);
    if (!existingRating) {
      throw new Error('Rating not found');
    }
    return this.repository.updateUpdatedAt(uuid);
  }
}