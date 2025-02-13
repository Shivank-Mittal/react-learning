import Conf from "../../conf";
import {Client as AppwriteClient} from 'appwrite';

export default class Client {
    protected client = new AppwriteClient();;

    constructor() {
        this.client.setEndpoint(Conf.appWriteURL).setProject(Conf.appWritePROJECT_ID);
    }

    async operationHandler<T> ( operation: () => Promise<T>, errorMessage : string): Promise<T> {

        try{  
            return await operation();
        } catch (error) {
            console.log(errorMessage)
            throw error;
        }

    }

}