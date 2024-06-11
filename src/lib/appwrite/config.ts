
import {Client, Account, Databases, Storage, Avatars, Teams} from "appwrite";


export const appwriteConfig = {
    // backend
    devAPIKey : process.env.NEXT_PUBLIC_APPWRITE_API_KEY || '',
    url : process.env.NEXT_PUBLIC_APPWRITE_URL || '',
    // project
    projectId : process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '',
    //  database
    databaseId : process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
    // collections
    userCollectionId : process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID || '',
    artisanCollectionId : process.env.NEXT_PUBLIC_APPWRITE_ARTISAN_COLLECTION_ID || '',
    produitCollectionId : process.env.NEXT_PUBLIC_APPWRITE_PRODUIT_COLLECTION_ID || '',
    postCollectionId : process.env.NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID || '',
    // savesCollectionId : process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID || '',
    // storage
    mediaArtisansStorageId : process.env.NEXT_PUBLIC_APPWRITE_MEDIA_ARTISANS_STORAGE_ID || '',
    
}

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);


