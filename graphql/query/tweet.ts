import { DocumentNode } from 'graphql';
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

export const getSignedURL = graphql(`
   #graphql
   query Query($imageName: String!, $imageType: String!) {
    getSignedURLForTweet(imageName: $imageName, imageType: $imageType)
  }
`)


