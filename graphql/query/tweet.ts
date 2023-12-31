import {graphql} from '../../gql';


export const getAllTweets= graphql(`
 #graphql
   query GetAllTweets{
     getAllTweets{
        id
        content
        imageUrl
        author{
            id
            firstName
            lastName
            profileImageURL
        }
     }
   }
`);



