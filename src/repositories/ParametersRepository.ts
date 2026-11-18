import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Parameters } from "../entities/Parameters";

export class ParametersRepository {
  private repository: Repository<Parameters>;

  constructor() {
    this.repository = AppDataSource.getRepository(Parameters);
  }

  async findAll(): Promise<Parameters[]> {
    return this.repository.find();
  }

  async findByKey(key: string): Promise<Parameters | null> {
    return this.repository.findOne({ where: { key } });
  }

  async update(key: string, data: Partial<Parameters>): Promise<Parameters | null> {
    await this.repository.update({ key }, data);
    return this.findByKey(key);
  }
}
