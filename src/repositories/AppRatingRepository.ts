import { Repository } from 'typeorm';
import { AppRating } from '../entities/AppRating';
import { AppDataSource } from '../config/database';

export class AppRatingRepository {
  private repository: Repository<AppRating>;

  constructor() {
    this.repository = AppDataSource.getRepository(AppRating);
  }

  async findAll(): Promise<AppRating[]> {
    return this.repository.find({
      relations: ['accountUuid', 'appUuid'],
    });
  }

  async findByUuid(uuid: string): Promise<AppRating | null> {
    return this.repository.findOne({
      where: { uuid },
      relations: ['accountUuid', 'appUuid'],
    });
  }

  async findByAccountUuid(accountUuid: string): Promise<AppRating[]> {
    return this.repository.find({
      where: { accountUuid: { uuid: accountUuid } },
      relations: ['accountUuid', 'appUuid'],
    });
  }

  async findByAppUuid(appUuid: string): Promise<AppRating[]> {
    return this.repository.find({
      where: { appUuid: { appUuid } },
      relations: ['accountUuid', 'appUuid'],
    });
  }

  async create(ratingData: Partial<AppRating>): Promise<AppRating> {
    const rating = this.repository.create(ratingData);
    return this.repository.save(rating);
  }

  async update(uuid: string, ratingData: Partial<AppRating>): Promise<AppRating | null> {
    await this.repository.update(uuid, ratingData);
    return this.findByUuid(uuid);
  }

  async delete(uuid: string): Promise<boolean> {
    const result = await this.repository.delete(uuid);
    return result.affected ? result.affected > 0 : false;
  }

  async updateUpdatedAt(uuid: string): Promise<AppRating | null> {
    await this.repository.update(uuid, { updatedAt: new Date() });
    return this.findByUuid(uuid);
  }
}