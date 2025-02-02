import Conf from "../conf";
import Client from "./client"
import { postInfo, updatePostInfo} from "./types";
import { Databases, Models, Query} from 'appwrite';

export default class Database extends Client {
    private database;

    constructor() {
        super();
        this.database = new Databases(this.client)
    }

    async createPost ({title, slug, content, featuredImage, userId}: postInfo): Promise<boolean> {
        return this.databaseOperationHandler(
            async() => {
                await this.database.createDocument(
                    Conf.appWriteDATABASE_ID,
                    Conf.appWriteCOLLECTION_ID,
                    slug,
                    { title, content, featuredImage, userId}
                )
            },
            "Error Accord while creating the app:"
        )
    }

     async updatePost( {slug, postInfo }: updatePostInfo): Promise<boolean> {
        return this.databaseOperationHandler(
            async() => {
                await this.database.createDocument(
                    Conf.appWriteDATABASE_ID,
                    Conf.appWriteCOLLECTION_ID,
                    slug,
                    { ...postInfo }
                )
            },
            "Error Accord while updating the app:"
        )
    }

    async deletePost(slug: string): Promise<boolean> {
        return this.databaseOperationHandler(
            async() => {
                await this.database.deleteDocument(
                    Conf.appWriteDATABASE_ID,
                    Conf.appWriteCOLLECTION_ID,
                    slug,
                )
            },
            "Error Accord while deleting the app:"
        )
    }

    async getPost(slug: string): Promise<Models.Document | undefined> {
        let document: Models.Document | undefined;

        await this.databaseOperationHandler(
            async () => {
                document = await this.database.getDocument(
                    Conf.appWriteDATABASE_ID,
                    Conf.appWriteCOLLECTION_ID,
                    slug
                );
            },
            "Error occurred while fetching the post:"
        );
    
        return document;
        
    }

    async getAllPosts(query = [Query.equal("status", "equal")]): Promise<Models.DocumentList<Models.Document> | undefined> {
        let document: Models.DocumentList<Models.Document> | undefined;

        await this.databaseOperationHandler(
            async () => {
                document = await this.database.listDocuments(
                    Conf.appWriteDATABASE_ID,
                    Conf.appWriteCOLLECTION_ID,
                    query, 
                );
            },
            "Error occurred while fetching the post:"
        );
    
        return document;
        
    }
}