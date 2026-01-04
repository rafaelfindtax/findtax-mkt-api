import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { AccountsRoles } from '../entities/AccountsRoles';

export class AccountsRolesRepository {
  private repository: Repository<AccountsRoles>;

  constructor() {
    this.repository = AppDataSource.getRepository(AccountsRoles);
  }

  async findAll(): Promise<AccountsRoles[]> {
    return this.repository.find({
      relations: ['accounts'],
      order: {
        roleName: 'ASC',
      },
    });
  }

  async findByUuid(uuid: string): Promise<AccountsRoles | null> {
    return this.repository.findOne({
      where: { uuid },
      relations: ['accounts'],
    });
  }

  async findByRoleName(roleName: string): Promise<AccountsRoles | null> {
    return this.repository.findOne({
      where: { roleName },
      relations: ['accounts'],
    });
  }

  async create(data: Partial<AccountsRoles>): Promise<AccountsRoles> {
    const newRole = this.repository.create(data);
    return this.repository.save(newRole);
  }

  async update(uuid: string, data: Partial<AccountsRoles>): Promise<AccountsRoles | null> {
    await this.repository.update({ uuid }, data);
    return this.findByUuid(uuid);
  }

  async delete(uuid: string): Promise<boolean> {
    const result = await this.repository.delete({ uuid });
    return result.affected ? result.affected > 0 : false;
  }
}
