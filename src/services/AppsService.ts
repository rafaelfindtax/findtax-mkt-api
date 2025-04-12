import { Apps } from '../entities/Apps';
import { AppsRepository } from '../repositories/AppsRepository';

export class AppsService {
  private repository: AppsRepository;

  constructor() {
    this.repository = new AppsRepository();
  }

  async getAllApps(): Promise<Apps[]> {
    return this.repository.findAll();
  }

  async getAppByUuid(appUuid: string): Promise<Apps | null> {
    return this.repository.findByUuid(appUuid);
  }

  async getAppsByName(name: string): Promise<Apps[]> {
    return this.repository.findByName(name);
  }

  async getAppsByProviderUuid(appProviderUuidid: string): Promise<Apps[]> {
    return this.repository.findByProviderUuid(appProviderUuidid);
  }

  async createApp(appData: Partial<Apps>): Promise<Apps> {
    if (!appData.name) {
      throw new Error('Name is required');
    }
    if (!appData.description) {
      throw new Error('Description is required');
    }
    if (!appData.appProviderUuid || !appData.appProviderUuid.uuid) {
      throw new Error('App Provider UUID is required');
    }
    return this.repository.create(appData);
  }

  async updateApp(appUuid: string, appData: Partial<Apps>): Promise<Apps | null> {
    const existingApp = await this.repository.findByUuid(appUuid);
    if (!existingApp) {
      throw new Error('App not found');
    }
    return this.repository.update(appUuid, appData);
  }

  async deleteApp(appUuid: string): Promise<boolean> {
    const existingApp = await this.repository.findByUuid(appUuid);
    if (!existingApp) {
      throw new Error('App not found');
    }
    return this.repository.delete(appUuid);
  }

  async updateAppUpdatedAt(appUuid: string): Promise<Apps | null> {
    const existingApp = await this.repository.findByUuid(appUuid);
    if (!existingApp) {
      throw new Error('App not found');
    }
    return this.repository.updateUpdatedAt(appUuid);
  }

  async updateAppPhoto(uuid: string, appPhoto: string) {
    const result = await this.repository.update(
      uuid,
      {
        appPhoto: appPhoto,
        updatedAt: new Date()
      }
    );
    if (!result) {
      throw new Error('Update operation failed');
    }
    return result ? { success: true } : null;
  }

    // 🔍 Novo método: Buscar apps por e-mail do account
    async getAppsByAccountEmail(email: string): Promise<Apps[]> {
      return this.repository.findAppsByAccountEmail(email);
    }
  
    // 🔍 Novo método: Buscar apps por UUID do account
    async getAppsByAccountUuid(uuid: string): Promise<Apps[]> {
      return this.repository.findAppsByAccountUuid(uuid);
    }
  
}