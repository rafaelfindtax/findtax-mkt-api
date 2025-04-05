import { Repository } from 'typeorm';
import { AppIntegrations } from '../entities/AppIntegrations'; // Ajuste o caminho conforme necessário
import { AppDataSource } from '../config/database'; // Ajuste o caminho conforme necessário

export class AppIntegrationsRepository {
  private repository: Repository<AppIntegrations>;

  constructor() {
    this.repository = AppDataSource.getRepository(AppIntegrations);
  }

  // Buscar todos os registros
  async findAll(): Promise<AppIntegrations[]> {
    return this.repository.find({
      relations: ['integrationsMediaUu'], // Inclui a relação com IntegrationsMedias
    });
  }

  // Buscar por UUID
  async findByUuid(integrationsUuid: string): Promise<AppIntegrations | null> {
    return this.repository.findOne({
      where: { integrationsUuid },
      relations: ['integrationsMediaUu'],
    });
  }

  // Buscar por nome
  async findByName(name: string): Promise<AppIntegrations[]> {
    return this.repository.find({
      where: { name },
      relations: ['integrationsMediaUu'],
    });
  }

  // Buscar por integrationsMediaUuid (relação)
  async findByMediaUuid(integrationsMediaUuid: string): Promise<AppIntegrations[]> {
    return this.repository.find({
      where: { integrationsMediaUu: { integrationMediaUuid: integrationsMediaUuid } },
      relations: ['integrationsMediaUu'],
    });
  }

  // Criar um novo registro
  async create(integrationData: Partial<AppIntegrations>): Promise<AppIntegrations> {
    const integration = this.repository.create({
      ...integrationData,
      // O integrationsUuid será gerado automaticamente pelo banco devido ao default: gen_random_uuid()
    });
    return this.repository.save(integration);
  }

  // Atualizar um registro por UUID
  async update(
    integrationsUuid: string,
    integrationData: Partial<AppIntegrations>
  ): Promise<AppIntegrations | null> {
    await this.repository.update(integrationsUuid, integrationData);
    return this.findByUuid(integrationsUuid);
  }

  // Deletar um registro por UUID
  async delete(integrationsUuid: string): Promise<boolean> {
    const result = await this.repository.delete(integrationsUuid);
    return result.affected ? result.affected > 0 : false;
  }

  // Atualizar a data de atualização (updatedAt)
  async updateUpdatedAt(integrationsUuid: string): Promise<AppIntegrations | null> {
    await this.repository.update(integrationsUuid, { updatedAt: new Date() });
    return this.findByUuid(integrationsUuid);
  }
}