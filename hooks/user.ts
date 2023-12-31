"use client";

import { graphQlClient } from "@/clients/api";
import { followUserMutation, unfollowUserMutation } from "@/graphql/mutation/user";
import { getCurrentUser, getUserById } from "@/graphql/query/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCurrentUser = ()=>{
    const query = useQuery ({

        queryKey: ['current-user'],
        queryFn :()=> graphQlClient.request(getCurrentUser),
    })
    console.log('data',query.data)

    return {...query , user: query.data?.getCurrentUser}
}


export const useUserById = (userId:string)=>{
    const query = useQuery ({

        queryKey: ['user-by-id',userId],
        queryFn :()=> graphQlClient.request(getUserById,{ getUserByIdId: userId }),
    })
    console.log('data',query.data)

    return {...query , user: query.data?.getUserById}
}

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (to: string) => graphQlClient.request(followUserMutation, { to }),
      onSuccess: () => {
        // Invalidate relevant queries after a successful follow
        queryClient.invalidateQueries(['current-user']);
      },
    });

  return mutation;
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (to: string) => graphQlClient.request(unfollowUserMutation, { to }),
      onSuccess: async () => {
        // Invalidate relevant queries after a successful unfollow
        await queryClient.invalidateQueries(['current-user']);
      },
    });

  return mutation;
};