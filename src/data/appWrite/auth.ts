import Client from './client';
import { accountInfo, loginInfo } from '../types';
import { Account, ID, Models } from 'appwrite';
import { IAuthService } from '../IAuthService';

export class AuthService extends Client implements IAuthService {
  private account;

  constructor() {
    super();
    this.account = new Account(this.client);
  }

  async createAccount(accountInfo: accountInfo): Promise<Models.User<Models.Preferences>> {
    return await this.operationHandler<Models.User<Models.Preferences>>(
      async () =>
        this.account.create(ID.unique(), accountInfo.email, accountInfo.password, accountInfo.name),
      'Error Accrued while creating the Account'
    );
  }

  async login(loginInfo: loginInfo): Promise<Models.Session> {
    return await this.operationHandler<Models.Session>(
      async () => this.account.createEmailPasswordSession(loginInfo.email, loginInfo.password),
      'error Accrued while login'
    );
  }

  async logout(): Promise<unknown> {
    return await this.operationHandler<unknown>(
      async () => await this.account.deleteSessions(),
      'Error Accrued while logout'
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async currentUser(): Promise<Models.User<any>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await this.operationHandler<Models.User<any>>(
      async () => await this.account.get(),
      'Error Accrued while logout'
    );
  }
}

export default new AuthService();
