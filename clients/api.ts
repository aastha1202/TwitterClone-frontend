import { GraphQLClient } from "graphql-request";

// const isClient = typeof window !=="undefined"

console.log(typeof window)
export const graphQlClient= new GraphQLClient('https://twitterclone-backend-jx9v.onrender.com/graphql/',{
    headers:()=>({
        Authorization:  `Bearer ${window.localStorage.getItem('token')}` 
    })
    
})

