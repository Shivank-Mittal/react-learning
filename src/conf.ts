const conf = {
    appWriteURL: String(import.meta.env.VITE_APP_APPWRITE_URL),
    appWritePROJECT_ID: String(import.meta.env.VITE_APP_APPWRITE_PROJECT_ID),
    appWriteDATABASE_ID: String(import.meta.env.VITE_APP_APPWRITE_DATABASE_ID),
    appWriteCOLLECTION_ID: String(import.meta.env.VITE_APP_APPWRITE_COLLECTION_ID),
    appWriteBUCKET_ID: String(import.meta.env.VITE_APP_APPWRITE_BUCKET_ID),
}

export default conf;