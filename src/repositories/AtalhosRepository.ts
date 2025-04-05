import { Repository } from 'typeorm';
import { Atalhos } from '../entities/Atalhos';
import { AppDataSource } from '../config/database';

export class AtalhosRepository {
  private repository: Repository<Atalhos>;

  constructor() {
    this.repository = AppDataSource.getRepository(Atalhos);
  }

  async findAll(): Promise<Atalhos[]> {
    return this.repository.find();
  }

  async findByUuid(atalhoUuid: string): Promise<Atalhos | null> {
    return this.repository.findOne({
      where: { atalhoUuid },
    });
  }

  async findById(id: number): Promise<Atalhos | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async findByAccountUuid(accountUuid: string): Promise<Atalhos[]> {
    return this.repository.find({
      where: { accountUuid },
    });
  }

  async create(atalhoData: Partial<Atalhos>): Promise<Atalhos> {
    const atalho = this.repository.create(atalhoData);
    return this.repository.save(atalho);
  }

  async update(atalhoUuid: string, atalhoData: Partial<Atalhos>): Promise<Atalhos | null> {
    await this.repository.update(atalhoUuid, atalhoData);
    return this.findByUuid(atalhoUuid);
  }

  async delete(atalhoUuid: string): Promise<boolean> {
    const result = await this.repository.delete(atalhoUuid);
    return result.affected ? result.affected > 0 : false;
  }

  async updateUpdatedAt(atalhoUuid: string): Promise<Atalhos | null> {
    await this.repository.update(atalhoUuid, { updatedAt: new Date() });
    return this.findByUuid(atalhoUuid);
  }
}