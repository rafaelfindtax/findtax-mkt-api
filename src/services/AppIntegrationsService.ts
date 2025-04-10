import { AppIntegrations } from '../entities/AppIntegrations'; // Ajuste o caminho conforme necessário
import { AppIntegrationsRepository } from '../repositories/AppIntegrationsRepository'; // Ajuste o caminho conforme necessário

export class AppIntegrationsService {
  private repository: AppIntegrationsRepository;

  constructor() {
    this.repository = new AppIntegrationsRepository();
  }

  // Obter todas as integrações
  async getAllIntegrations(): Promise<AppIntegrations[]> {
    return this.repository.findAll();
  }

  // Obter uma integração por UUID
  async getIntegrationByUuid(integrationsUuid: string): Promise<AppIntegrations | null> {
    return this.repository.findByUuid(integrationsUuid);
  }

  // Obter integrações por nome
  async getIntegrationsByName(name: string): Promise<AppIntegrations[]> {
    return this.repository.findByName(name);
  }

  // Obter integrações por integrationsMediaUuidid
  async getIntegrationsByMediaUuid(integrationsMediaUuidid: string): Promise<AppIntegrations[]> {
    return this.repository.findByMediaUuid(integrationsMediaUuidid);
  }

  // Criar uma nova integração
  async createIntegration(integrationData: Partial<AppIntegrations>): Promise<AppIntegrations> {
    // Validações básicas
    if (!integrationData.name) {
      throw new Error('Name is required');
    }
    if (!integrationData.description) {
      throw new Error('Description is required');
    }
    if (!integrationData.assetId) {
      throw new Error('Asset ID is required');
    }
    return this.repository.create(integrationData);
  }

  // Atualizar uma integração por UUID
  async updateIntegration(
    integrationsUuid: string,
    integrationData: Partial<AppIntegrations>
  ): Promise<AppIntegrations | null> {
    const existingIntegration = await this.repository.findByUuid(integrationsUuid);
    if (!existingIntegration) {
      throw new Error('Integration not found');
    }
    return this.repository.update(integrationsUuid, integrationData);
  }

  // Deletar uma integração por UUID
  async deleteIntegration(integrationsUuid: string): Promise<boolean> {
    const existingIntegration = await this.repository.findByUuid(integrationsUuid);
    if (!existingIntegration) {
      throw new Error('Integration not found');
    }
    return this.repository.delete(integrationsUuid);
  }

  // Atualizar a data de atualização (updatedAt)
  async updateIntegrationUpdatedAt(integrationsUuid: string): Promise<AppIntegrations | null> {
    const existingIntegration = await this.repository.findByUuid(integrationsUuid);
    if (!existingIntegration) {
      throw new Error('Integration not found');
    }
    return this.repository.updateUpdatedAt(integrationsUuid);
  }
}