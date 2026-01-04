import { AccountsRolesRepository } from '../repositories/AccountsRolesRepository';

export class AccountsRolesService {
  private repository = new AccountsRolesRepository();

  async getAllRoles() {
    return this.repository.findAll();
  }

  async getRoleByUuid(uuid: string) {
    const role = await this.repository.findByUuid(uuid);
    if (!role) {
      throw new Error('Role not found');
    }
    return role;
  }

  async getRoleByName(roleName: string) {
    const role = await this.repository.findByRoleName(roleName);
    if (!role) {
      throw new Error('Role not found');
    }
    return role;
  }

  async createRole(data: { roleName: string; description?: string }) {
    // Verificar se já existe um role com esse nome
    const existingRole = await this.repository.findByRoleName(data.roleName);
    if (existingRole) {
      throw new Error('Role with this name already exists');
    }
    
    return this.repository.create(data);
  }

  async updateRole(uuid: string, data: { roleName?: string; description?: string }) {
    // Verificar se o role existe
    const role = await this.repository.findByUuid(uuid);
    if (!role) {
      throw new Error('Role not found');
    }

    // Se estiver atualizando o nome, verificar se já existe outro role com esse nome
    if (data.roleName && data.roleName !== role.roleName) {
      const existingRole = await this.repository.findByRoleName(data.roleName);
      if (existingRole) {
        throw new Error('Role with this name already exists');
      }
    }

    return this.repository.update(uuid, data);
  }

  async deleteRole(uuid: string) {
    const role = await this.repository.findByUuid(uuid);
    if (!role) {
      throw new Error('Role not found');
    }

    // Verificar se há contas associadas a este role
    if (role.accounts && role.accounts.length > 0) {
      throw new Error('Cannot delete role with associated accounts');
    }

    return this.repository.delete(uuid);
  }
}
