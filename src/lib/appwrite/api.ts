import {ID, Databases, Account, Storage, Avatars, Teams, Query} from 'appwrite';
import {INewArtisan, INewPost, INewUser, IUpdatePost, IUser} from "@/types";
import { appwriteConfig, client } from './config';


// Initialisation des services Appwrite
let account = new Account(client);
let databases: Databases = new Databases(client);
let storage: Storage = new Storage(client);
let avatars = new Avatars(client);
let teams: Teams;

/**
 * Crée un nouveau compte utilisateur.
 * @param user - Les informations de l'utilisateur à créer.
 * @returns Le nouvel utilisateur créé.
 * @throws Une erreur si la création du compte ou la sauvegarde dans la base de données échoue.
 */
export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        );

        if(!newAccount) throw new Error('Account creation failed');

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            email: newAccount.email,
            name: newAccount.name,
            username: user.username,
            imageUrl: avatarUrl
        });

        return newUser;
    } catch (error) {
        console.error("Error during account creation: ", error);
        throw error;
    }
}

/**
 * Crée un nouveau compte artisan.
 * @param user - Les informations de l'artisan à créer.
 * @returns Le nouvel artisan créé.
 * @throws Une erreur si la création du compte, la connexion à la session ou la sauvegarde dans la base de données échoue.
 */
export async function createArtisanAccount(user: INewArtisan) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        );

        if (!newAccount) throw new Error('Account creation failed');

        const avatarUrl = avatars.getInitials(user.name);

        const session = await signInAccount({
            email: user.email,
            password: user.password,
        });

        if (!session) throw new Error('Session creation failed');

        const newUser = await saveUserToDB({
            email: newAccount.email,
            name: newAccount.name,
            username: user.username,
            imageUrl: avatarUrl
        });

        if (!newUser) throw new Error('Saving user to DB failed');

        const newArtisan = await saveArtisanToDB({
            categorieActivite: user.categorie_activite,
            adresse: user.adresse,
            code_postal: user.code_postal,
            ville: user.ville,
            numero: user.telephone
        });

        if (!newArtisan) throw new Error('Saving artisan to DB failed');

        try {
            const updatedArtisan = await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.artisanCollectionId,
                newArtisan.$id,
                {
                    userId: newUser.$id,
                },
            );
        } catch (error) {
            console.error("Error updating artisan: ", error);
            throw error;
        }

        return newArtisan;
    } catch (error) {
        console.error("Error during account creation: ", error);
        throw error;
    }
}

/**
 * Sauvegarde un utilisateur dans notre base de données, lié à celui de Auth.
 * @param user - Les informations de l'utilisateur à sauvegarder.
 * @returns Le nouvel utilisateur sauvegardé.
 * @throws Une erreur si la sauvegarde dans la base de données échoue.
 */
export async function saveUserToDB(user: {
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
    artisanId?: string;
    }) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        );

        return newUser;
    } catch (error) {
        console.error("Error saving user to DB: ", error);
        throw error;
    }
}

/**
 * Sauvegarde un artisan dans notre base de données.
 * @param user - Les informations de l'artisan à sauvegarder.
 * @returns Le nouvel artisan sauvegardé.
 * @throws Une erreur si la sauvegarde dans la base de données échoue.
 */
export async function saveArtisanToDB(user: {
    categorieActivite: string;
    adresse: string | undefined;
    code_postal: string | undefined;
    ville: string;
    numero?: string;
    userId?: string;
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.artisanCollectionId,
            ID.unique(),
            {
                ...user,
                adresse: user.adresse || null,
                code_postal: user.code_postal || null,
            },
        );

        return newUser;
    } catch (error) {
        console.error("Error saving artisan to DB: ", error);
        throw error;
    }
}

/**
 * Connecte un utilisateur à son compte.
 * @param user - Les informations de l'utilisateur à connecter.
 * @returns La session de l'utilisateur connecté.
 * @throws Une erreur si la connexion à la session échoue.
 */
export async function signInAccount(user: { email:string; password: string} ) {
    try {
        try {
            const currentSession = await account.get();
            if (currentSession) {
                await account.deleteSession('current');
            }
        } catch (error) {
            // Ignore l'erreur si aucune session n'est active
        }

        const session = await account.createEmailPasswordSession(user.email, user.password);
        client.setSession(session.$id);
        account = new Account(client);
        avatars = new Avatars(client);
        databases = new Databases(client);
        storage = new Storage(client);
        teams = new Teams(client);

        return session;
    } catch (error) {
        console.error("Error during sign in: ", error);
        throw error;
    }
}

/**
 * Récupère le compte utilisateur actuel.
 * @returns Le compte utilisateur actuel.
 * @throws Une erreur si la récupération du compte échoue.
 * @todo Ajouter une vérification pour s'assurer que l'utilisateur est lié à un compte.
 */
export async function getAccount() {
    try {
        const currentAccount = await account.get();
        return currentAccount;
    } catch (error) {
        console.error("Error getting account: ", error);
        throw error;
    }
}

/**
 * Récupère l'utilisateur actuel.
 * @returns L'utilisateur actuel.
 * @throws Une erreur si la récupération de l'utilisateur échoue.
 * @todo Ajouter une vérification pour s'assurer que l'utilisateur est lié à un compte.
 */
export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();
        if (!currentAccount) throw new Error('No current account');

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('email', currentAccount.email)]
        );

        if (currentUser.documents.length === 0) throw new Error('No matching user document');

        // Ensure the returned user object matches the IUser type
        const user: IUser = {
            id: currentUser.documents[0].$id,
            username: currentUser.documents[0].username,
            email: currentUser.documents[0].email,
            imageId: currentUser.documents[0].imageId,
            imageUrl: currentUser.documents[0].imageUrl,
            name: currentUser.documents[0].name,
            artisanId: currentUser.documents[0].artisanId?.$id,
        };

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * function to sign OUT from the account (se déconnecter)
 * @param user 
 * @returns 
 */
export async function signOutAccount() {
    try {
        // Check if there is a current session
        const currentSession = await account.get();

        // If there is a current session, delete it
        if (currentSession) {
            const session = await account.deleteSession("current");
            return session;
        } else {
            // If there is no current session, return a message or handle it as you see fit
            console.log("No active session to delete.");
        }
    } catch (error) {
        console.log(error)
        throw error;
    }
}

// --------------------------- uploadArtisanFile -----------------------------------
/**
 * Upload a file to the storage
 * @param product
 * @param file
 */
export async function addProductWithFiles(
    product: {
        nom: string;
        description: string;
        tags: string;
        createur: string;
        }, file: File) {
    try {
        let newProduct ;
        // Upload the files
        const uploadedFiles = await uploadArtisanFile(file);

        if (uploadedFiles) {
            const fileUrl = getFilePreview(uploadedFiles.$id);

            // Check if fileUrl is defined before calling addProduct
            if (fileUrl) {
                // Add the product with the file links
                newProduct = await addProduct({
                    ...product,
                    imagesUrl: fileUrl,
                    imagesId: uploadedFiles.$id
                });
            } else {
                console.error("No file URL provided");
            }
        }

        return newProduct;
    } catch (error) {
        console.error("Error adding product with files: ", error);
        throw error;
    }
}


// addProduct
export async function addProduct(
    product: {
        nom: string;
        description: string;
        tags: string;
        imagesUrl: URL;
        imagesId: string;
        createur: string;

    }) {
    try {
        const newProduct = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.produitCollectionId,
            ID.unique(),
            product,
        );

        return newProduct;
    } catch (error) {
        console.error("Error adding product: ", error);
        throw error;
    }
}



export async function uploadArtisanFile(file: File) {
    try {
        // upload image to storage
        const uploadedFile = await storage.createFile(
            appwriteConfig.mediaArtisansStorageId,
            ID.unique(),
            file,
        );

        return uploadedFile;
    } catch (error) {
        console.log(error)
    }
}

export  function getFilePreview(fileId: string) {
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.mediaArtisansStorageId,
            fileId,
            2000,
            2000,
        )

        if (!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        console.log(error)
    }
}

export async function getProductsByCreator(creatorId: string) {
    try {
        const products = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.produitCollectionId,
            [Query.equal('createur', creatorId)]
        );

        return products;
    } catch (error) {
        console.error("Error getting products by creatorId: ", error);
        throw error;
    }
}

export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(appwriteConfig.mediaArtisansStorageId, fileId);

        return { status : 'suppression corrupted file succesfully'}
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(productId: string) {
    try {
        // Récupérer le produit à partir de son ID
        const product = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.produitCollectionId,
            productId
        );

        // Supprimer l'image associée au produit
        if (product.imageId) {
            await deleteFile(product.imageId);
        }

        // Supprimer le produit
        const result = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.produitCollectionId,
            productId,
        );

        return result;
    } catch (error) {
        console.error("Error deleting product: ", error);
        throw error;
    }
}

export async function getAllProducts( pageParam: number = 0) {
    try {
        const products = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.produitCollectionId,

        );

        // Map over the products and pick only the fields you're interested in
        const selectedFields = products.documents.map(product => ({
            id: product.$id,
            nom: product.nom,
            description: product.description,
            imagesUrl: product.imagesUrl,
            createur: product.createur?.userId?.name,
            avatar: product.createur?.userId?.imageUrl,
        }));

        // console.log(" api - getAllProducts - selectedFields = ",selectedFields);

        // Determine if there is a next page
        const nextPage = products.total > (pageParam + 1) * 10 ? pageParam + 1 : null;

        return { products: selectedFields, nextPage };
    } catch (error) {
        console.error("Error getting all products: ", error);
        throw error;
    }
}

// Fonction pour mettre à jour un produit
export async function updateProduct(productId: string, product: {
    nom: string;
    description: string;
    tags: string;
    imagesUrl: URL;
    imagesId: string;
    createur: string;
}, file?: File) {
    try {
        let updatedProduct;
        if (file) {
            // First, upload the new file
            const uploadedFile = await uploadArtisanFile(file);

            // If the file upload was successful, update the product
            if (uploadedFile) {
                const fileUrl = getFilePreview(uploadedFile.$id);

                // Check if fileUrl is defined before calling updateProduct
                if (fileUrl) {
                    // Update the product with the new file links
                    updatedProduct = await databases.updateDocument(
                        appwriteConfig.databaseId,
                        appwriteConfig.produitCollectionId,
                        productId,
                        {
                            ...product,
                            imagesUrl: fileUrl,
                            imagesId: uploadedFile.$id
                        },
                    );

                    // If the product update was successful, delete the old file
                    if (updatedProduct) {
                        await deleteFile(product.imagesId);
                    }
                } else {
                    console.error("No file URL provided");
                }
            }
        } else {
            // If no new file is provided, update the product without changing the image
            updatedProduct = await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.produitCollectionId,
                productId,
                product,
            );
        }

        return updatedProduct;
    } catch (error) {
        console.error("Error updating product: ", error);
        throw error;
    }
}

// --------------------------------------------------------------------------

// export async function createPost(post: INewPost) {
//     try {
//         // upload image to storage
//         const uploadedFile = await uploadFile(post.file[0]);
//
//         if(!uploadedFile) throw Error;
//
//         // Get file Url
//         const fileUrl = getFilePreview(uploadedFile.$id);
//         if(!fileUrl) {
//             deleteFile(uploadedFile.$id);
//             throw Error;
//         }
//
//         // convert tags to arrays
//         const tags  = post.tags?.replace(/ /g, '').split(',') || [];
//
//         // save post to database
//         const newPost = await databases.createDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.postCollectionId,
//             ID.unique(),
//             {
//                 creator: post.userId,
//                 caption: post.caption,
//                 imageUrl: fileUrl,
//                 imageId:uploadedFile.$id,
//                 location: post.location,
//                 tags: tags,
//             }
//         )
//
//         if(!newPost) {
//             deleteFile(uploadedFile.$id);
//             throw Error;
//         }
//
//         return newPost;
//     } catch (error) {
//         console.log(error)
//     }
// }

// export async function getRecentPosts() {
//     const posts = await databases.listDocuments(
//         appwriteConfig.databaseId,
//         appwriteConfig.postCollectionId,
//         [Query.orderDesc('$createdAt'), Query.limit(20)]
//     )
//
//     if(!posts) throw Error
//
//     return posts
// }

// export async function likePost(postId: string, likesArray: string[]) {
//     try {
//         const updatedPost = await databases.updateDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.postCollectionId,
//             postId,
//             {
//                 likes: likesArray
//             }
//         )
//
//         if (!updatedPost) throw Error;
//
//         return updatedPost;
//     } catch (error) {
//         console.log(error)
//     }
// }

// export async function savePost(postId: string, userId: string) {
//     try {
//         const updatedPost = await databases.createDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.savesCollectionId,
//             ID.unique(),
//             {
//                 user: userId,
//                 post: postId
//             }
//         )
//
//         if (!updatedPost) throw Error;
//
//         return updatedPost;
//     } catch (error) {
//         console.log(error)
//     }
// }

// export async function deleteSavedPost(savedrecordId: string) {
//     try {
//         const statusCode = await databases.deleteDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.savesCollectionId,
//             savedrecordId,
//         )
//
//         if (!statusCode) throw Error;
//
//         return { status: "suppression de post sauvegarder"}
//     } catch (error) {
//         console.log(error)
//     }
// }

// export async function getPostById(postId: string) {
//     try {
//         const post = await databases.getDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.postCollectionId,
//             postId
//         )
//
//         return post;
//     } catch (error) {
//         console.log(error)
//     }
// }

// export async function updatePost(post: IUpdatePost) {
//     const hasFileToUpdate = post.file.length > 0;
//
//     try {
//         let image = {
//             imageUrl: post.imageUrl,
//             imageId: post.imageId,
//         }
//         if(hasFileToUpdate) {
//             // upload image to storage
//             const uploadedFile = await uploadFile(post.file[0]);
//
//             if(!uploadedFile) throw Error;
//
//             // Get file Url
//             const fileUrl = getFilePreview(uploadedFile.$id);
//             if(!fileUrl) {
//                 deleteFile(uploadedFile.$id);
//                 throw Error;
//             }
//
//             image = {...image, imageUrl: fileUrl, imageId: uploadedFile.$id}
//         }
//
//
//
//         // convert tags to arrays
//         const tags  = post.tags?.replace(/ /g, '').split(',') || [];
//
//         // save post to database
//         const updatedPost = await databases.updateDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.postCollectionId,
//             post.postId,
//             {
//                 caption: post.caption,
//                 imageUrl: image.imageUrl,
//                 imageId: image.imageId,
//                 location: post.location,
//                 tags: tags,
//             }
//         )
//
//         if(!updatedPost) {
//             deleteFile(post.imageId);
//             throw Error;
//         }
//
//         return updatedPost;
//     } catch (error) {
//         console.log(error)
//     }
// }

// export async function deletePost(postId: string, imageId: string) {
//     if (!postId || imageId) throw Error
//
//
//     try {
//         await databases.deleteDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.postCollectionId,
//             postId,
//         )
//         return { status: "suppression de post"}
//     } catch (error) {
//         console.log(error)
//     }
// }

// export async function getInfinitePosts( {pageParam}:{ pageParam: number} ) {
//     const queries: any[] = [Query.orderDesc('$updatedAt'), Query.limit(10)]
//
//     if (pageParam) {
//         queries.push(Query.cursorAfter(pageParam.toString()));
//     }
//
//     try {
//         const posts = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.postCollectionId,
//             queries
//         )
//
//         if(!posts) throw Error
//
//         return posts;
//     } catch (error) {
//         console.log(error);
//     }
//
// }

// export async function searchPosts( searchTerm: string ) {
//     try {
//         const posts = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.postCollectionId,
//             [Query.search('caption', searchTerm)]
//         )
//
//         if(!posts) throw Error
//
//         return posts;
//     } catch (error) {
//         console.log(error);
//     }
//
// }
