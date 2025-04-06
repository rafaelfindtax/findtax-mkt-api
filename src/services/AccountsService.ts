import { Accounts } from '../entities/Accounts'; // Ajuste o caminho conforme necessário
import { AccountsRepository } from '../repositories/AccountsRepository'; // Ajuste o caminho conforme necessário

export class AccountsService {
  private repository: AccountsRepository;

  constructor() {
    this.repository = new AccountsRepository();
  }

  // Obter todas as contas
  async getAllAccounts(): Promise<Accounts[]> {
    return this.repository.findAll();
  }

  // Obter uma conta por UUID
  async getAccountByUuid(uuid: string): Promise<Accounts | null> {
    return this.repository.findByUuid(uuid);
  }

  // Obter uma conta por ID
  async getAccountById(id: number): Promise<Accounts | null> {
    return this.repository.findById(id);
  }

  // Obter uma conta por email
  async getAccountByEmail(email: string): Promise<Accounts | null> {
    return this.repository.findByEmail(email);
  }

  // Criar uma nova conta
  async createAccount(accountData: Partial<Accounts>): Promise<Accounts> {
    // Validações básicas
    if (!accountData.email || !accountData.password || !accountData.name) {
      throw new Error('Email, password, and name are required');
    }
    if (!accountData.role) {
      throw new Error('Role is required');
    }
    return this.repository.create(accountData);
  }

  // Atualizar uma conta por Email
  async updateAccountByEmail(email: string, accountData: Partial<Accounts>): Promise<Accounts | null> {
    const existingAccount = await this.repository.findByEmail(email);
    
    if (!existingAccount) {
      throw new Error('Account not found');
    }
  
    return this.repository.updateByEmail(email, accountData);
  }
  
  // Deletar uma conta por UUID
  async deleteAccount(uuid: string): Promise<boolean> {
    const existingAccount = await this.repository.findByUuid(uuid);
    if (!existingAccount) {
      throw new Error('Account not found');
    }
    return this.repository.delete(uuid);
  }

  // Atualizar a data do último login (lastLoggedAt)
  async updateLastLoggedAt(uuid: string): Promise<Accounts | null> {
    const existingAccount = await this.repository.findByUuid(uuid);
    if (!existingAccount) {
      throw new Error('Account not found');
    }
    return this.repository.updateLastLoggedAt(uuid);
  }
}