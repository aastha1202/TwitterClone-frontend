import {graphql} from '../../gql';


export const verifyUserGoogleTokenQuery = graphql(`
 #graphql
 query VerifyUserGoogleToken($token: String!){
    verifyGoogleToken(token:$token)
 }
`);

export const getCurrentUser = graphql(`
#graphql
 query getCurrentUser {
   getCurrentUser {
     id
     firstName
     lastName
     email
     profileImageURL
     tweets{
      id
      content
      imageUrl
      author {
        id
        firstName
        lastName
        profileImageURL
      }
     }
     followers {
      id
      firstName
      lastName
      profileImageURL
    }
    followings {
      id
      firstName
      lastName
      profileImageURL
    }
    recommendedUser{
      id
      firstName
      lastName
      profileImageURL
    }
   }
 }
`);


export const getUserById= graphql(`#graphql
query ExampleQuery($getUserByIdId: ID!) {
  getUserById(id: $getUserByIdId) {
    id
    firstName
    lastName
    profileImageURL
    tweets {
      content
      imageUrl
      author {
        id
        firstName
        lastName
        profileImageURL
      }
    }
    followers {
      id
      firstName
      lastName
      profileImageURL
    }
    followings {
      id
      firstName
      lastName
      profileImageURL
    }
  }
}`);