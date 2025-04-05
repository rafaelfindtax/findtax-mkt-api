import { AccountAtalhos } from '../entities/AccountAtalhos'; 
import { AccountAtalhosRepository } from '../repositories/AccountAtalhosRepository';

export class AccountAtalhosService {
  private repository: AccountAtalhosRepository;

  constructor() {
    this.repository = new AccountAtalhosRepository();
  }

  // Obter todos os atalhos
  async getAllAtalhos(): Promise<AccountAtalhos[]> {
    return this.repository.findAll();
  }

  // Obter um atalho por UUID
  async getAtalhoByUuid(atalhoUuid: string): Promise<AccountAtalhos | null> {
    return this.repository.findByUuid(atalhoUuid);
  }

  // Obter atalhos por nome
  async getAtalhosByName(name: string): Promise<AccountAtalhos[]> {
    return this.repository.findByName(name);
  }

  // Obter atalhos por atalhoMediaUuid
  async getAtalhosByMediaUuid(atalhoMediaUuid: string): Promise<AccountAtalhos[]> {
    return this.repository.findByAtalhoMediaUuid(atalhoMediaUuid);
  }

  // Criar um novo atalho
  async createAtalho(atalhoData: Partial<AccountAtalhos>): Promise<AccountAtalhos> {
    // Aqui você pode adicionar validações adicionais, se necessário
    if (!atalhoData.name || !atalhoData.atalhoUrl) {
      throw new Error('Name and URL are required');
    }
    return this.repository.create(atalhoData);
  }

  // Atualizar um atalho por UUID
  async updateAtalho(
    atalhoUuid: string,
    atalhoData: Partial<AccountAtalhos>
  ): Promise<AccountAtalhos | null> {
    const existingAtalho = await this.repository.findByUuid(atalhoUuid);
    if (!existingAtalho) {
      throw new Error('Atalho not found');
    }
    return this.repository.update(atalhoUuid, atalhoData);
  }

  // Deletar um atalho por UUID
  async deleteAtalho(atalhoUuid: string): Promise<boolean> {
    const existingAtalho = await this.repository.findByUuid(atalhoUuid);
    if (!existingAtalho) {
      throw new Error('Atalho not found');
    }
    return this.repository.delete(atalhoUuid);
  }

  // Atualizar a data de atualização (updatedAt)
  async updateAtalhoUpdatedAt(atalhoUuid: string): Promise<AccountAtalhos | null> {
    const existingAtalho = await this.repository.findByUuid(atalhoUuid);
    if (!existingAtalho) {
      throw new Error('Atalho not found');
    }
    return this.repository.updateUpdatedAt(atalhoUuid);
  }
}