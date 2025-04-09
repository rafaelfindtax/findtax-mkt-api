import { Repository } from 'typeorm';
import { AccountAtalhos } from '../entities/AccountAtalhos'; // Ajuste o caminho conforme necessário
import { AppDataSource } from '../config/database'; // Ajuste o caminho conforme necessário

export class AccountAtalhosRepository {
  private repository: Repository<AccountAtalhos>;

  constructor() {
    this.repository = AppDataSource.getRepository(AccountAtalhos);
  }

  // Buscar todos os registros
  async findAll(): Promise<AccountAtalhos[]> {
    return this.repository.find({
      relations: ['atalhoMediaUuid'], // Inclui a relação com AtalhosMedias
    });
  }

  // Buscar por UUID
  async findByUuid(atalhoUuid: string): Promise<AccountAtalhos | null> {
    return this.repository.findOne({
      where: { atalhoUuid },
      relations: ['atalhoMediaUuid'], // Inclui a relação
    });
  }

  // Buscar por nome
  async findByName(name: string): Promise<AccountAtalhos[]> {
    return this.repository.find({
      where: { name },
      relations: ['atalhoMediaUuid'],
    });
  }

  // Criar um novo registro
  async create(atalhoData: Partial<AccountAtalhos>): Promise<AccountAtalhos> {
    const atalho = this.repository.create({
      ...atalhoData,
      // O atalhoUuid será gerado automaticamente pelo banco devido ao default: gen_random_uuid()
    });
    return this.repository.save(atalho);
  }

  // Atualizar um registro por UUID
  async update(
    atalhoUuid: string,
    atalhoData: Partial<AccountAtalhos>
  ): Promise<AccountAtalhos | null> {
    await this.repository.update(atalhoUuid, atalhoData);
    return this.findByUuid(atalhoUuid);
  }

  // Deletar um registro por UUID
  async delete(atalhoUuid: string): Promise<boolean> {
    const result = await this.repository.delete(atalhoUuid);
    return result.affected ? result.affected > 0 : false;
  }

  // Buscar por atalhoMediaUuid (relação)
  async findByAtalhoMediaUuid(atalhoMediaUuid: string): Promise<AccountAtalhos[]> {
    return this.repository.find({
      where: { atalhoMediaUuid: { atalhoMediaUuid } },
      relations: ['atalhoMediaUuid'],
    });
  }

  // Atualizar a data de atualização (updatedAt)
  async updateUpdatedAt(atalhoUuid: string): Promise<AccountAtalhos | null> {
    await this.repository.update(atalhoUuid, { updatedAt: new Date() });
    return this.findByUuid(atalhoUuid);
  }
}