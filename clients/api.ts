import { GraphQLClient } from "graphql-request";


console.log(typeof window)
export const graphQlClient= new GraphQLClient('https://twitterclone-backend-jx9v.onrender.com/graphql/',{
    headers:()=>({
        Authorization:   `Bearer ${window.localStorage.getItem('token')}` 
    })
    
})

