import { AppFunctionalities } from '../entities/AppFunctionalities'; // Ajuste o caminho conforme necessário
import { AppFunctionalitiesRepository } from '../repositories/AppFunctionalitiesRepository'; // Ajuste o caminho conforme necessário

export class AppFunctionalitiesService {
  private repository: AppFunctionalitiesRepository;

  constructor() {
    this.repository = new AppFunctionalitiesRepository();
  }

  // Obter todas as funcionalidades
  async getAllFunctionalities(): Promise<AppFunctionalities[]> {
    return this.repository.findAll();
  }

  // Obter uma funcionalidade por ID
  async getFunctionalityById(id: number): Promise<AppFunctionalities | null> {
    return this.repository.findById(id);
  }

  // Obter funcionalidades por nome
  async getFunctionalitiesByName(name: string): Promise<AppFunctionalities[]> {
    return this.repository.findByName(name);
  }

  // Obter funcionalidades por appUuid
  async getFunctionalitiesByAppUuid(appUuid: string): Promise<AppFunctionalities[]> {
    return this.repository.findByAppUuid(appUuid);
  }

  // Criar uma nova funcionalidade
  async createFunctionality(functionalityData: Partial<AppFunctionalities>): Promise<AppFunctionalities> {
    // Validações básicas
    if (!functionalityData.name) {
      throw new Error('Name is required');
    }
    if (!functionalityData.appUuid || !functionalityData.appUuid.appUuid) {
      throw new Error('App UUID is required');
    }
    return this.repository.create(functionalityData);
  }

  // Atualizar uma funcionalidade por ID
  async updateFunctionality(
    id: number,
    functionalityData: Partial<AppFunctionalities>
  ): Promise<AppFunctionalities | null> {
    const existingFunctionality = await this.repository.findById(id);
    if (!existingFunctionality) {
      throw new Error('Functionality not found');
    }
    return this.repository.update(id, functionalityData);
  }

  // Deletar uma funcionalidade por ID
  async deleteFunctionality(id: number): Promise<boolean> {
    const existingFunctionality = await this.repository.findById(id);
    if (!existingFunctionality) {
      throw new Error('Functionality not found');
    }
    return this.repository.delete(id);
  }

  // Atualizar a data de atualização (updatedAt)
  async updateFunctionalityUpdatedAt(id: number): Promise<AppFunctionalities | null> {
    const existingFunctionality = await this.repository.findById(id);
    if (!existingFunctionality) {
      throw new Error('Functionality not found');
    }
    return this.repository.updateUpdatedAt(id);
  }
}