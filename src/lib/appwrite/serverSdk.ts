"use server"

import sdk from "node-appwrite";
import {appwriteConfig} from "@/lib/appwrite/config";

export const sdk_client = new sdk.Client();
sdk_client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("65b21d69eb9877afd1b9")
    .setKey("bf019dc888da5474c1d77303f1af2435f1caeeb09dfa08fd8d0c4aa88420fd818e77ecf3a8bcb30b1a673ace9b6fbcb6476919d4e4f5c629a5341ddc8038ea2ba42644c04de2af1a0eb02489fc3ac28981753543e4e7ad42c43dff652d021efbb69c3cc410b4c62bb092e7702a5355b8df79853f5810a5aadab227aa61e5840e");


//
// export const sdk_account = new sdk.Account(sdk_client);
// export const sdk_databases = new sdk.Databases(sdk_client);
// export const sdk_storage = new sdk.Storage(sdk_client);
// export const sdk_avatars = new sdk.Avatars(sdk_client);
// export const sdk_teams = new sdk.Teams(sdk_client);
