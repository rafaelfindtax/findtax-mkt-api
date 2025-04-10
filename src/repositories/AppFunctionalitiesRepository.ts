import { Repository } from 'typeorm';
import { AppFunctionalities } from '../entities/AppFunctionalities'; // Ajuste o caminho conforme necessário
import { AppDataSource } from '../config/database'; // Ajuste o caminho conforme necessário

export class AppFunctionalitiesRepository {
  private repository: Repository<AppFunctionalities>;

  constructor() {
    this.repository = AppDataSource.getRepository(AppFunctionalities);
  }

  // Buscar todos os registros
  async findAll(): Promise<AppFunctionalities[]> {
    return this.repository.find({
      relations: ['appUuid'], // Inclui a relação com Apps
    });
  }

  // Buscar por ID
  async findById(id: number): Promise<AppFunctionalities | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['appUuid'],
    });
  }

  // Buscar por nome
  async findByName(name: string): Promise<AppFunctionalities[]> {
    return this.repository.find({
      where: { name },
      relations: ['appUuid'],
    });
  }

  // Buscar por appUuid (relação)
  async findByAppUuid(appUuid: string): Promise<AppFunctionalities[]> {
    return this.repository.find({
      where: { appUuid: { appUuid } },
      relations: ['appUuid'],
    });
  }

  // Criar um novo registro
  async create(functionalityData: Partial<AppFunctionalities>): Promise<AppFunctionalities> {
    const functionality = this.repository.create({
      ...functionalityData,
      // O id será gerado automaticamente pelo PrimaryGeneratedColumn
    });
    return this.repository.save(functionality);
  }

  // Atualizar um registro por ID
  async update(id: number, functionalityData: Partial<AppFunctionalities>): Promise<AppFunctionalities | null> {
    await this.repository.update(id, functionalityData);
    return this.findById(id);
  }

  // Deletar um registro por ID
  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  // Atualizar a data de atualização (updatedAt)
  async updateUpdatedAt(id: number): Promise<AppFunctionalities | null> {
    await this.repository.update(id, { updatedAt: new Date() });
    return this.findById(id);
  }
}