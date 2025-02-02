import Client from "./client"
import Conf from "../conf";
import {Storage, ID} from 'appwrite';

export default class Bucket extends Client {
    private bucket;

    constructor() {
        super();
        this.bucket = new Storage(this.client);
    }

    async uploadFile(file: File): Promise<boolean> {
       return this.databaseOperationHandler(
            async () => {
                await this.bucket.createFile(
                    Conf.appWriteBUCKET_ID,
                    ID.unique(),
                    file
                )
            }
            ,
            "File not uploaded"
        );
    }

    async delete(fileId: string): Promise<boolean> {
        return this.databaseOperationHandler(
            async () => {
                await this.bucket.deleteFile(
                    Conf.appWriteBUCKET_ID,
                    fileId
                )
            }
            ,
            "File not deleted"
        )
    }

    getFilePreview(fileId: string) {
        return this.bucket.getFilePreview(
            Conf.appWriteBUCKET_ID,
            fileId,
        )
    }
}