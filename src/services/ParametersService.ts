import { Parameters } from "../entities/Parameters";
import { ParametersRepository } from "../repositories/ParametersRepository";

export class ParametersService {
  private repository = new ParametersRepository();

  async getAllParameters(): Promise<Parameters[]> {
    return this.repository.findAll();
  }

  async getParameterByKey(key: string): Promise<Parameters | null> {
    return this.repository.findByKey(key);
  }

  async toggleParameter(key: string): Promise<Parameters> {
    const existing = await this.repository.findByKey(key);
    if (!existing) {
      throw new Error(`Parameter with key '${key}' not found`);
    }
    const updated = await this.repository.update(key, {
      value: !existing.value,
      updatedAt: new Date(),
    });
    if (!updated) {
      throw new Error(`Failed to toggle parameter '${key}'`);
    }
    return updated;
  }
}
