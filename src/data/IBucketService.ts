import { Models } from "appwrite";
import IClientService from "./IClientService";

export default interface IBucketService extends IClientService {
    uploadFile(file: File): Promise<Models.File>;
    delete(fileId: string): Promise<{}>;
    getFilePreview(fileId: string): string; // Specify a more precise return type if known
}