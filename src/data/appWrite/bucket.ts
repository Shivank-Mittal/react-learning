import Client from "./client";
import Conf from "../../conf";
import { Storage, ID, Models } from "appwrite";
import IBucketService from "../IBucketService";

export class Bucket extends Client implements IBucketService {
  private bucket;

  constructor() {
    super();
    this.bucket = new Storage(this.client);
  }

  async uploadFile(file: File): Promise<Models.File> {
    return this.operationHandler<Models.File>(
      () => this.bucket.createFile(Conf.appWriteBUCKET_ID, ID.unique(), file),
      "File not uploaded",
    );
  }

  async delete(fileId: string): Promise<{}> {
    return this.operationHandler<{}>(
      () => this.bucket.deleteFile(Conf.appWriteBUCKET_ID, fileId),
      "File not deleted",
    );
  }

  getFilePreview(fileId: string): string {
    return this.bucket.getFilePreview(Conf.appWriteBUCKET_ID, fileId);
  }
}

export default new Bucket();
