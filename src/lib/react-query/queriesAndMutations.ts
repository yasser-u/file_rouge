import { INewPost, INewUser, IUpdatePost } from '@/types';
import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKeys';
import { createUserAccount, signInAccount, signOutAccount } from '../appwrite/api';

/**
 * 
 * @returns 
 */
export const useCreateUserAccountMutation = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

/**
 * j
 * @returns 
 */
export const useSignInAccountMutation = () => {
    return useMutation({
        mutationFn: (user: {
            email: string;
            password: string;
        }) => signInAccount(user)
    })
}

/**
 * 
 * @returns 
//  */
export const useSignOutAccountMutation = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}

// export const useCreatePostMutation = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: (post: INewPost) => createPost(post),
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
//             })
//         }
//     })
// }


// export const useGetRecentPostsMutation = () => {
//     return useQuery({
//         queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
//         queryFn: getRecentPosts,
        
//     })
// }

// export const useLikePostMutation = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: ({ postId, likesArray }: {postId: string; likesArray: string[] }) => likePost(postId, likesArray),
//         onSuccess: (data) => {
//             queryClient.invalidateQueries({
//                 queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
//             })
//             queryClient.invalidateQueries({
//                 queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
//             })
//             queryClient.invalidateQueries({
//                 queryKey: [QUERY_KEYS.GET_POSTS]
//             })
//             queryClient.invalidateQueries({
//                 queryKey: [QUERY_KEYS.GET_CURRENT_USER]
//             })
//         }
//     })
// }


// export const useSavePostMutation = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: ({ postId, userId }: {postId: string; userId: string }) => savePost(postId, userId),
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
//             })
//             queryClient.invalidateQueries({
//                 queryKey: [QUERY_KEYS.GET_POSTS]
//             })
//             queryClient.invalidateQueries({
//                 queryKey: [QUERY_KEYS.GET_CURRENT_USER]
//             })
//         }
//     })
// }

// export const useDeleteSavePostMutation = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: ( savedRecordId: string) => deleteSavedPost(savedRecordId),
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
//             })
//             queryClient.invalidateQueries({
//                 queryKey: [QUERY_KEYS.GET_POSTS]
//             })
//             queryClient.invalidateQueries({
//                 queryKey: [QUERY_KEYS.GET_CURRENT_USER]
//             })
//         }
//     })
// }

// export const useGetCurrentUserMutation = () => {
//     return useQuery({
//         queryKey : [QUERY_KEYS.GET_CURRENT_USER],
//         queryFn: getCurrentUser
//     })
// }

// export const useGetPostByIdMutation = (postId: string) => {
//     return useQuery({
//         queryKey : [QUERY_KEYS.GET_POST_BY_ID, postId],
//         queryFn: () => getPostById(postId),
//         enabled: !!postId
//     })
// }

// export const useUpdatePostMutation = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: (post: IUpdatePost) => updatePost(post),
//         onSuccess: (data) => {
//             queryClient.invalidateQueries({
//                 queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
//             })
//         }
//     })
// }
// export const useDeletePostMutation = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: ({ postId, imageId }: { postId: string, imageId: string }) => deletePost(postId, imageId),
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
//             })
//         }
//     })
// }

// export const useGetPostsMutation = () => {
//     return useInfiniteQuery({
//         queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
//         queryFn: getInfinitePosts,
//         getNextPageParam: (lastPage) => {
//             if(lastPage && lastPage.documents.length === 0 ) return null;

//             const lastId = lastPage?.documents[lastPage?.documents.length - 1].$id;

//             return lastId;
//         }
//     })
// }

// export const useSearchPostsMutation = (searchTerm: string) => {
//     return useQuery({
//         queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
//         queryFn: () => searchPosts(searchTerm),
//         enabled: !!searchTerm,
//     })
// }
