"use client";

import { graphQlClient } from "@/clients/api";
import { CreateTweetData } from "@/gql/graphql";
import { CreateTweetMutation } from "@/graphql/mutation/tweet";
import {  getAllTweets } from "@/graphql/query/tweet";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useCreateTweet =()=>{
    const query = useQueryClient()
    const mutation = useMutation({
        mutationFn: (payload: CreateTweetData)=> graphQlClient.request(CreateTweetMutation,{payload}),
        onMutate:(payload)=> toast.loading('Creating tweet',{id:'1'}),
        onSuccess:async()=>
        { 
        await query.invalidateQueries(["all-tweets"]) // to refetch all the tweets
        toast.success('successfully created',{id:'1'}) 
    }
    })
    return mutation
}


interface Tweet {
    id: string;
    content: string;
    imageUrl: string | null;
    author: {
      id: string;
      firstName: string;
      lastName: string;
      profileImageURL: string | null;
    };
  }
 
export const useGetAllTweets = ()=>{
    const query = useQuery ({

        queryKey: ['all-tweets'],
        queryFn :()=> graphQlClient.request(getAllTweets),
    })
    // console.log('data',query.data)

    return {...query , tweets: query.data?.getAllTweets}
}

// export 