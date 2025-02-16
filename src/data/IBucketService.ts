import { Models } from "appwrite";

export default interface IBucketService {
    uploadFile(file: File): Promise<Models.File>;
    delete(fileId: string): Promise<{}>;
    getFilePreview(fileId: string): string; // Specify a more precise return type if known
}