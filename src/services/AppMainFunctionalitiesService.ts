import { AppMainFunctionalities } from '../entities/AppMainFunctionalities';
import { AppMainFunctionalitiesRepository } from '../repositories/AppMainFunctionalitiesRepository';

export class AppMainFunctionalitiesService {
  private repository: AppMainFunctionalitiesRepository;

  constructor() {
    this.repository = new AppMainFunctionalitiesRepository();
  }

  async getAll(): Promise<AppMainFunctionalities[]> {
    return this.repository.findAll();
  }

  async getById(id: number): Promise<AppMainFunctionalities | null> {
    return this.repository.findById(id);
  }

  async getByAppUuid(appUuid: string): Promise<AppMainFunctionalities[]> {
    return this.repository.findByAppUuid(appUuid);
  }

  async create(functionality: Partial<AppMainFunctionalities>): Promise<AppMainFunctionalities> {
    const { description, appUuid, createdAt, updatedAt } = functionality;

    if (!description) throw new Error('Description is required');
    if (!appUuid || !appUuid) throw new Error('App UUID is required');

    return this.repository.create({
      description,
      appUuid,
      createdAt: createdAt ?? new Date(),
      updatedAt: updatedAt ?? new Date()
    });
  }

  async update(id: number, data: Partial<AppMainFunctionalities>): Promise<AppMainFunctionalities | null> {
    const existing = await this.repository.findById(id);
    if (!existing) return null;

    return this.repository.update(id, {
      ...data,
      updatedAt: new Date()
    });
  }

  async delete(id: number): Promise<boolean> {
    const existing = await this.repository.findById(id);
    if (!existing) return false;

    return this.repository.delete(id);
  }

  async updateUpdatedAt(id: number): Promise<AppMainFunctionalities | null> {
    const existing = await this.repository.findById(id);
    if (!existing) return null;

    return this.repository.updateUpdatedAt(id);
  }
}
