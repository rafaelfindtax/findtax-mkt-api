import { AppProviderRepository } from '../repositories/AppProviderRepository';
import { AppProvider } from '../entities/AppProvider';

export class AppProviderService {
  private repository = new AppProviderRepository();

  getAll(): Promise<AppProvider[]> {
    return this.repository.findAll();
  }

  getByUuid(uuid: string): Promise<AppProvider | null> {
    return this.repository.findByUuid(uuid);
  }

  create(data: Partial<AppProvider>): Promise<AppProvider> {
    return this.repository.create(data);
  }

  update(uuid: string, data: Partial<AppProvider>): Promise<AppProvider | null> {
    return this.repository.update(uuid, data);
  }

  delete(uuid: string): Promise<boolean> {
    return this.repository.delete(uuid);
  }
}
