import { AppMainFunctionalities } from '../entities/AppMainFunctionalities';
import { AppMainFunctionalitiesRepository } from '../repositories/AppMainFunctionalitiesRepository';
import { AppsRepository } from '../repositories/AppsRepository'; // Novo repositório para buscar Apps

export class AppMainFunctionalitiesService {
  private repository: AppMainFunctionalitiesRepository;
  private appsRepository: AppsRepository; // Repositório para lidar com Apps

  constructor() {
    this.repository = new AppMainFunctionalitiesRepository();
    this.appsRepository = new AppsRepository(); // Inicializa o repositório Apps
  }

  // Recupera todas as funcionalidades
  async getAllFunctionalities(): Promise<AppMainFunctionalities[]> {
    return this.repository.findAll();
  }

  // Recupera uma funcionalidade pelo ID
  async getFunctionalityById(id: number): Promise<AppMainFunctionalities | null> {
    return this.repository.findById(id);
  }

  // Recupera as funcionalidades associadas a um App usando seu UUID
  async getFunctionalitiesByAppUuid(appUuid: string): Promise<AppMainFunctionalities[]> {
    return this.repository.findByAppUuid(appUuid);
  }

  // Cria novas funcionalidades e associa ao App usando o appUuid
  async createFunctionalities(functionalityData: { description: string }[], appUuid: string) {
    // Busca o aplicativo usando o appUuid
    const app = await this.appsRepository.findByUuid(appUuid);
    if (!app) {
      throw new Error('App not found');
    }

    const createdFunctionalities = [];

    // Cria as funcionalidades e as associa ao aplicativo
    for (const data of functionalityData) {
      const newFunctionality = await this.repository.create({
        description: data.description,
        appUuid: app, // Associa o objeto App
      });
      createdFunctionalities.push(newFunctionality);
    }

    return createdFunctionalities;
  }

  // Atualiza a funcionalidade pelo ID
  async updateFunctionality(id: number, functionalityData: Partial<AppMainFunctionalities>): Promise<AppMainFunctionalities | null> {
    const existingFunctionality = await this.repository.findById(id);
    if (!existingFunctionality) {
      throw new Error('Functionality not found');
    }
    return this.repository.update(id, functionalityData);
  }

  // Deleta a funcionalidade pelo ID
  async deleteFunctionality(id: number): Promise<boolean> {
    const existingFunctionality = await this.repository.findById(id);
    if (!existingFunctionality) {
      throw new Error('Functionality not found');
    }
    return this.repository.delete(id);
  }

  // Atualiza o campo updatedAt de uma funcionalidade
  async updateFunctionalityUpdatedAt(id: number): Promise<AppMainFunctionalities | null> {
    const existingFunctionality = await this.repository.findById(id);
    if (!existingFunctionality) {
      throw new Error('Functionality not found');
    }
    return this.repository.updateUpdatedAt(id);
  }
}
