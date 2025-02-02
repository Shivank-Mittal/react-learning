import Client from "./client";
import {accountInfo, loginInfo} from "./types";
import { Account, ID} from 'appwrite';


export class AuthService extends Client {
    private account;

    constructor() {
        super()
        this.account = new Account(this.client);
    }

    async createAccount(accountInfo: accountInfo) {

        try{
           const user =  await this.account.create(
                ID.unique(), 
                accountInfo.email,
                accountInfo.password, 
                accountInfo.name
            );


           if(user) {
                await this.login({...accountInfo})
            }

            return user;
        
        }catch {
            console.log("Error Accrued while creating the Account");
        }

    }

    async login(loginInfo: loginInfo) {
        try {
            await this.account.createEmailPasswordSession(loginInfo.email, loginInfo.password);
        } catch(error) {
            console.log('error Accrued while login');
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch {
            console.log( "Error Accrued while logout");
        }
    }

    async currentUser() {
        try {
            return await this.account.get()
        } catch {
            return undefined
        }
    }
}


export default new AuthService();
