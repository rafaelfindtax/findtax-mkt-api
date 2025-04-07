import { ProviderTypeRepository } from '../repositories/ProviderTypeRepository';

export class ProviderTypeService {
  private repository = new ProviderTypeRepository();

  async getAllProviderTypes() {
    return this.repository.findAll();
  }

  async getProviderTypeByUuid(uuid: string) {
    return this.repository.findByUuid(uuid);
  }

  async createProviderType(data: any) {
    return this.repository.create(data);
  }

  async updateProviderType(uuid: string, data: any) {
    return this.repository.update(uuid, data);
  }

  async deleteProviderType(uuid: string) {
    return this.repository.delete(uuid);
  }
}
