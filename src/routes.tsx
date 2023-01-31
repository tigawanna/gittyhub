import { graphql } from 'relay-runtime';
import { loadQuery } from 'react-relay';
import { routesROOTVIEWERQuery } from './__generated__/routesROOTVIEWERQuery.graphql';
import RelayEnvironment from './relay/RelayEnviroment'


export const ROOTVIEWER = graphql`
# github graphql query to get more details
  query routesROOTVIEWERQuery{
   viewer{
    id
    name
    login
    email
    bio
    avatarUrl
    company
    twitterUsername
    createdAt
    isFollowingViewer
    viewerIsFollowing
    isViewer
    location
    url

    followers(first: 1) {
      totalCount
      nodes {
        id
      }
    }
    following(first: 1) {
      totalCount
      nodes {
        id
      }
    }
    
  repositories(first:1){
   totalCount
    nodes{
      id
    }
    }
   }
  }
`;


const RootQueryRef = loadQuery<routesROOTVIEWERQuery>(
  RelayEnvironment,
  ROOTVIEWER,{}
);







