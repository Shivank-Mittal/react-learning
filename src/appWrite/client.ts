import Conf from "../conf";
import {Client as AppwriteClient} from 'appwrite';

export default class Client  {
    protected client = new AppwriteClient();;

    constructor() {
        this.client.setEndpoint(Conf.appWriteURL).setProject(Conf.appWritePROJECT_ID);
    }

    protected async databaseOperationHandler ( operation: () => Promise<void>, errorMessage : string): Promise<boolean> {

        try{  
            await operation();
            return true
        } catch {
            console.log(errorMessage)
            return false
        }

    }

}