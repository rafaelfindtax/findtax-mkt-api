import { Repository } from 'typeorm';
import { Apps } from '../entities/Apps';
import { AppDataSource } from '../config/database';

export class AppsRepository {
  private repository: Repository<Apps>;

  constructor() {
    this.repository = AppDataSource.getRepository(Apps);
  }

  async findAll(): Promise<Apps[]> {
    return this.repository.find({
      relations: [
        'appFunctionalities',
        'appMainFunctionalities',
        'appRatings',
        'appTags',
        'appProviderUuid',
        'appsMedias',
      ],
    });
  }

  async findByUuid(appUuid: string): Promise<Apps | null> {
    return this.repository.findOne({
      where: { appUuid },
      relations: [
        'appFunctionalities',
        'appMainFunctionalities',
        'appRatings',
        'appTags',
        'appProviderUuid',
        'appsMedias',
      ],
    });
  }

  async findByName(name: string): Promise<Apps[]> {
    return this.repository.find({
      where: { name },
      relations: [
        'appFunctionalities',
        'appMainFunctionalities',
        'appRatings',
        'appTags',
        'appProviderUuid',
        'appsMedias',
      ],
    });
  }

  async findByProviderUuid(appProviderUuidid: string): Promise<Apps[]> {
    return this.repository.find({
      where: { appProviderUuid: { uuid: appProviderUuidid } },
      relations: [
        'appFunctionalities',
        'appMainFunctionalities',
        'appRatings',
        'appTags',
        'appProviderUuid',
        'appsMedias',
      ],
    });
  }

  async create(appData: Partial<Apps>): Promise<Apps> {
    const app = this.repository.create(appData);
    return this.repository.save(app);
  }

  async update(appUuid: string, appData: Partial<Apps>): Promise<Apps | null> {
    await this.repository.update(appUuid, appData);
    return this.findByUuid(appUuid);
  }

  async delete(appUuid: string): Promise<boolean> {
    const result = await this.repository.delete(appUuid);
    return result.affected ? result.affected > 0 : false;
  }

  async updateUpdatedAt(appUuid: string): Promise<Apps | null> {
    await this.repository.update(appUuid, { updatedAt: new Date() });
    return this.findByUuid(appUuid);
  }
}