import { AppMainFunctionalities } from '../entities/AppMainFunctionalities';
import { AppMainFunctionalitiesRepository } from '../repositories/AppMainFunctionalitiesRepository';

export class AppMainFunctionalitiesService {
  private repository: AppMainFunctionalitiesRepository;

  constructor() {
    this.repository = new AppMainFunctionalitiesRepository();
  }

  async getAllFunctionalities(): Promise<AppMainFunctionalities[]> {
    return this.repository.findAll();
  }

  async getFunctionalityById(id: number): Promise<AppMainFunctionalities | null> {
    return this.repository.findById(id);
  }

  async getFunctionalitiesByAppUuid(appUuid: string): Promise<AppMainFunctionalities[]> {
    return this.repository.findByAppUuid(appUuid);
  }

  async createFunctionality(functionalityData: Partial<AppMainFunctionalities>): Promise<AppMainFunctionalities> {
    if (!functionalityData.description) {
      throw new Error('Description is required');
    }
    if (!functionalityData.appUu || !functionalityData.appUu.appUuid) {
      throw new Error('App UUID is required');
    }
    return this.repository.create(functionalityData);
  }

  async updateFunctionality(
    id: number,
    functionalityData: Partial<AppMainFunctionalities>
  ): Promise<AppMainFunctionalities | null> {
    const existingFunctionality = await this.repository.findById(id);
    if (!existingFunctionality) {
      throw new Error('Functionality not found');
    }
    return this.repository.update(id, functionalityData);
  }

  async deleteFunctionality(id: number): Promise<boolean> {
    const existingFunctionality = await this.repository.findById(id);
    if (!existingFunctionality) {
      throw new Error('Functionality not found');
    }
    return this.repository.delete(id);
  }

  async updateFunctionalityUpdatedAt(id: number): Promise<AppMainFunctionalities | null> {
    const existingFunctionality = await this.repository.findById(id);
    if (!existingFunctionality) {
      throw new Error('Functionality not found');
    }
    return this.repository.updateUpdatedAt(id);
  }
}