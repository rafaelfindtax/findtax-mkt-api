import { AppProvider } from '../entities/AppProvider';
import { AppProviderRepository } from '../repositories/AppProviderRepository';

export class AppProviderService {
  private repository: AppProviderRepository;

  constructor() {
    this.repository = new AppProviderRepository();
  }

  async getAllProviders(): Promise<AppProvider[]> {
    return this.repository.findAll();
  }

  async getProviderByUuid(uuid: string): Promise<AppProvider | null> {
    return this.repository.findByUuid(uuid);
  }

  async getProvidersByName(name: string): Promise<AppProvider[]> {
    return this.repository.findByName(name);
  }

  async createProvider(providerData: Partial<AppProvider>): Promise<AppProvider> {
    if (!providerData.name) {
      throw new Error('Name is required');
    }
    if (!providerData.description) {
      throw new Error('Description is required');
    }
    if (!providerData.photo) {
      throw new Error('Photo is required');
    }
    return this.repository.create(providerData);
  }

  async updateProvider(uuid: string, providerData: Partial<AppProvider>): Promise<AppProvider | null> {
    const existingProvider = await this.repository.findByUuid(uuid);
    if (!existingProvider) {
      throw new Error('Provider not found');
    }
    return this.repository.update(uuid, providerData);
  }

  async deleteProvider(uuid: string): Promise<boolean> {
    const existingProvider = await this.repository.findByUuid(uuid);
    if (!existingProvider) {
      throw new Error('Provider not found');
    }
    return this.repository.delete(uuid);
  }

  async updateProviderUpdatedAt(uuid: string): Promise<AppProvider | null> {
    const existingProvider = await this.repository.findByUuid(uuid);
    if (!existingProvider) {
      throw new Error('Provider not found');
    }
    return this.repository.updateUpdatedAt(uuid);
  }
}