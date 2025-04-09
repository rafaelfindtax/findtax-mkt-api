import { Accounts } from '../entities/Accounts';
import { AccountsRepository } from '../repositories/AccountsRepository';
import { AppProvider } from '../entities/AppProvider'; // Importa a entidade
import { AppProviderRepository } from '../repositories/AppProviderRepository'; // Importa o repository

export class AccountsService {
  private repository: AccountsRepository;
  private appProviderRepository: AppProviderRepository;

  constructor() {
    this.repository = new AccountsRepository();
    this.appProviderRepository = new AppProviderRepository();
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

  // Novo método: Buscar AppProvider por email da Account
  async getAppProviderByAccountEmail(email: string): Promise<AppProvider | null> {
    const account = await this.repository.findByEmail(email);

    if (!account) {
      throw new Error('Account not found');
    }

    if (!account.appProvider) {
      throw new Error('Account does not have an AppProvider');
    }

    return this.appProviderRepository.findByUuid(account.appProvider.uuid);
  }

  async createAccount(accountData: Partial<Accounts>): Promise<Accounts> {
    if (!accountData.email || !accountData.password || !accountData.name) {
      throw new Error('Email, password, and name are required');
    }
    if (!accountData.role) {
      throw new Error('Role is required');
    }
    return this.repository.create(accountData);
  }

  async updateAccountByEmail(email: string, accountData: Partial<Accounts>): Promise<Accounts | null> {
    const existingAccount = await this.repository.findByEmail(email);

    if (!existingAccount) {
      throw new Error('Account not found');
    }

    return this.repository.updateByEmail(email, accountData);
  }

  async deleteAccount(uuid: string): Promise<boolean> {
    const existingAccount = await this.repository.findByUuid(uuid);
    if (!existingAccount) {
      throw new Error('Account not found');
    }
    return this.repository.delete(uuid);
  }

  async updateLastLoggedAt(uuid: string): Promise<Accounts | null> {
    const existingAccount = await this.repository.findByUuid(uuid);
    if (!existingAccount) {
      throw new Error('Account not found');
    }
    return this.repository.updateLastLoggedAt(uuid);
  }
}
