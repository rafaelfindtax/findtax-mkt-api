import { Atalhos } from '../entities/Atalhos';
import { AtalhosRepository } from '../repositories/AtalhosRepository';

export class AtalhosService {
  private repository: AtalhosRepository;

  constructor() {
    this.repository = new AtalhosRepository();
  }

  async getAllAtalhos(): Promise<Atalhos[]> {
    return this.repository.findAll();
  }

  async getAtalhoByUuid(atalhoUuid: string): Promise<Atalhos | null> {
    return this.repository.findByUuid(atalhoUuid);
  }

  async getAtalhoById(id: number): Promise<Atalhos | null> {
    return this.repository.findById(id);
  }

  async getAtalhosByAccountUuid(accountUuid: string): Promise<Atalhos[]> {
    return this.repository.findByAccountUuid(accountUuid);
  }

  async createAtalho(atalhoData: Partial<Atalhos>): Promise<Atalhos> {
    if (!atalhoData.name) {
      throw new Error('Name is required');
    }
    return this.repository.create(atalhoData);
  }

  async updateAtalho(atalhoUuid: string, atalhoData: Partial<Atalhos>): Promise<Atalhos | null> {
    const existingAtalho = await this.repository.findByUuid(atalhoUuid);
    if (!existingAtalho) {
      throw new Error('Atalho not found');
    }
    return this.repository.update(atalhoUuid, atalhoData);
  }

  async deleteAtalho(atalhoUuid: string): Promise<boolean> {
    const existingAtalho = await this.repository.findByUuid(atalhoUuid);
    if (!existingAtalho) {
      throw new Error('Atalho not found');
    }
    return this.repository.delete(atalhoUuid);
  }

  async updateAtalhoUpdatedAt(atalhoUuid: string): Promise<Atalhos | null> {
    const existingAtalho = await this.repository.findByUuid(atalhoUuid);
    if (!existingAtalho) {
      throw new Error('Atalho not found');
    }
    return this.repository.updateUpdatedAt(atalhoUuid);
  }
}