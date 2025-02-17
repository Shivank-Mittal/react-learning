import Conf from "../../conf";
import Client from "./client";
import { postInfo, updatePostInfo } from "../types";
import { Databases, Models } from "appwrite";

export class Database extends Client {
  private database;

  constructor() {
    super();
    this.database = new Databases(this.client);
  }

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    userId,
  }: postInfo): Promise<Models.Document> {
    return this.operationHandler<Models.Document>(
      async () =>
        await this.database.createDocument(
          Conf.appWriteDATABASE_ID,
          Conf.appWriteCOLLECTION_ID,
          slug,
          { title, content, featuredImage, userId },
        ),
      "Error Accord while creating the app:",
    );
  }

  async updatePost({
    slug,
    userId,
    postInfo,
  }: updatePostInfo & { userId: string }): Promise<Models.Document> {
    return this.operationHandler<Models.Document>(
      async () =>
        await this.database.updateDocument(
          Conf.appWriteDATABASE_ID,
          Conf.appWriteCOLLECTION_ID,
          slug,
          {
            title: postInfo.title,
            content: postInfo.content,
            featuredImage: postInfo.featuredImage,
            userId: userId,
          },
        ),
      "Error Accord while updating the app:",
    );
  }

  async deletePost(slug: string): Promise<{}> {
    return this.operationHandler<{}>(
      async () =>
        await this.database.deleteDocument(
          Conf.appWriteDATABASE_ID,
          Conf.appWriteCOLLECTION_ID,
          slug,
        ),
      "Error Accord while deleting the app:",
    );
  }

  async getPost(slug: string): Promise<Models.Document> {
    return this.operationHandler<Models.Document>(
      async () =>
        await this.database.getDocument(
          Conf.appWriteDATABASE_ID,
          Conf.appWriteCOLLECTION_ID,
          slug,
        ),
      "Error occurred while fetching the post:",
    );
  }

  /**
   * This function get all the posts
   * We can also assign the query for specific search. eg - query = [Query.equal("status", "equal")]
   *
   * @returns
   */
  async getAllPosts(): Promise<Models.DocumentList<Models.Document>> {
    return this.operationHandler<Models.DocumentList<Models.Document>>(
      async () =>
        await this.database.listDocuments(
          Conf.appWriteDATABASE_ID,
          Conf.appWriteCOLLECTION_ID,
        ),
      "Error occurred while fetching the post:",
    );
  }
}

export default new Database();
