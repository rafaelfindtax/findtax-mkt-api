import { LeisIncentivo } from '../entities/LeisIncentivo';
import { LeisIncentivoRepository } from '../repositories/LeisIncentivoRepository';

export class LeisIncentivoService {
  private repository: LeisIncentivoRepository;

  constructor() {
    this.repository = new LeisIncentivoRepository();
  }

  async getAllLeis(): Promise<LeisIncentivo[]> {
    return this.repository.findAll();
  }

  async getLeiByUuid(leiUuid: string): Promise<LeisIncentivo | null> {
    return this.repository.findByUuid(leiUuid);
  }

  async getLeisByProviderUuid(appProviderUuidid: string): Promise<LeisIncentivo[]> {
    return this.repository.findByProviderUuid(appProviderUuidid);
  }

  async createLei(leiData: Partial<LeisIncentivo>): Promise<LeisIncentivo> {
    if (!leiData.appProviderUuid || !leiData.appProviderUuid.uuid) {
      throw new Error('App Provider UUID is required');
    }
    return this.repository.create(leiData);
  }

  async updateLei(leiUuid: string, leiData: Partial<LeisIncentivo>): Promise<LeisIncentivo | null> {
    const existingLei = await this.repository.findByUuid(leiUuid);
    if (!existingLei) {
      throw new Error('Lei not found');
    }
    return this.repository.update(leiUuid, leiData);
  }

  async deleteLei(leiUuid: string): Promise<boolean> {
    const existingLei = await this.repository.findByUuid(leiUuid);
    if (!existingLei) {
      throw new Error('Lei not found');
    }
    return this.repository.delete(leiUuid);
  }

  async updateLeiUpdatedAt(leiUuid: string): Promise<LeisIncentivo | null> {
    const existingLei = await this.repository.findByUuid(leiUuid);
    if (!existingLei) {
      throw new Error('Lei not found');
    }
    return this.repository.updateUpdatedAt(leiUuid);
  }
}