import { Models } from "appwrite";
import { accountInfo, loginInfo } from "./types";

export interface IAuthService {
    createAccount(accountInfo: accountInfo): Promise<Models.User<Models.Preferences>>;
    login(loginInfo: loginInfo): Promise<Models.Session>;
    logout(): Promise<{}>;
    currentUser(): Promise<Models.User<Models.Preferences>>;
}