import { Repository } from 'typeorm';
import { Accounts } from '../entities/Accounts'; // Ajuste o caminho conforme necessário
import { AppDataSource } from '../config/database'; // Ajuste o caminho conforme necessário

export class AccountsRepository {
  private repository: Repository<Accounts>;

  constructor() {
    this.repository = AppDataSource.getRepository(Accounts);
  }

  // Buscar todos os registros
  async findAll(): Promise<Accounts[]> {
    return this.repository.find({
      relations: ['appRatings'], // Inclui a relação com AppRating
    });
  }

  // Buscar por UUID
  async findByUuid(uuid: string): Promise<Accounts | null> {
    return this.repository.findOne({
      where: { uuid },
      relations: ['appRatings'],
    });
  }

  // Buscar por ID
  async findById(id: number): Promise<Accounts | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['appRatings'],
    });
  }

  // Buscar por email
  async findByEmail(email: string): Promise<Accounts | null> {
    return this.repository.findOne({
      where: { email },
      relations: ['appRatings'],
    });
  }

  // Criar um novo registro
  async create(accountData: Partial<Accounts>): Promise<Accounts> {
    const account = this.repository.create({
      ...accountData,
      // O uuid será gerado automaticamente pelo banco devido ao default: gen_random_uuid()
    });
    return this.repository.save(account);
  }

  // Atualizar um registro por UUID
  async update(uuid: string, accountData: Partial<Accounts>): Promise<Accounts | null> {
    await this.repository.update(uuid, accountData);
    return this.findByUuid(uuid);
  }

  // Deletar um registro por UUID
  async delete(uuid: string): Promise<boolean> {
    const result = await this.repository.delete(uuid);
    return result.affected ? result.affected > 0 : false;
  }

  // Atualizar a data do último login (lastLoggedAt)
  async updateLastLoggedAt(uuid: string): Promise<Accounts | null> {
    await this.repository.update(uuid, { lastLoggedAt: new Date() });
    return this.findByUuid(uuid);
  }

  async updateByEmail(email: string, accountData: Partial<Accounts>): Promise<Accounts | null> {
    try {
      // Remover campos que não podem ser atualizados diretamente
      const {
        appRatings,
        id,
        uuid,
        createdAt,
        updatedAt,
        ...safeData
      } = accountData;
  
      await this.repository
        .createQueryBuilder()
        .update(Accounts)
        .set(safeData)
        .where("email = :email", { email })
        .execute();
  
      return this.repository.findOne({ where: { email } });
    } catch (error) {
      console.error('Erro ao atualizar conta:', error);
      throw new Error('Erro ao atualizar conta no banco');
    }
  }
}