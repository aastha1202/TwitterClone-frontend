"use client";

import { graphQlClient } from "@/clients/api";
import { CreateTweetData } from "@/gql/graphql";
import { CreateTweetMutation } from "@/graphql/mutation/tweet";
import {  getAllTweets } from "@/graphql/query/tweet";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


 const useCreateTweet =()=>{
    const query = useQueryClient()
    const mutation = useMutation({
        mutationFn: (payload: CreateTweetData)=> graphQlClient.request(CreateTweetMutation,{payload}),
        onMutate:(payload)=> toast.loading('Creating tweet',{id:'1'}),
        onSuccess:async()=>
        { 
        await query.invalidateQueries( {queryKey: ["all-tweets"]}) // to refetch all the tweets
        toast.success('successfully created',{id:'1'}) 
    }
    })
    return mutation
}

 
 const useGetAllTweets = ()=>{
    const query = useQuery ({

        queryKey: ['all-tweets'],
        queryFn :()=> graphQlClient.request(getAllTweets),
    })
    // console.log('data',query.data)

    return {...query , tweets: query.data?.getAllTweets}
}

export { useCreateTweet, useGetAllTweets };