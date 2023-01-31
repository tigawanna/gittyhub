import {
  createHashHistory,Outlet,
  ReactLocation,Router, useMatch } from '@tanstack/react-location';
import React from 'react'

import { Toolbar } from './components/Navigation/Toolbar/Toolbar';
import ErrorBoundary from './components/Shared/ErrorBoundary';
import { graphql, loadQuery, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks';
import { AppROOTVIEWERQuery } from './__generated__/AppROOTVIEWERQuery.graphql';
import { Home } from './components/home/Home';
import { Test } from './components/test/Test';
import { useFragment } from 'react-relay';
import { App_user$data } from './__generated__/App_user.graphql';
import { Profile } from './components/people/Profile';
import RelayEnvironment from './relay/RelayEnviroment'
import { AppPROFILEVIEWERQuery } from './__generated__/AppPROFILEVIEWERQuery.graphql';

import { OnerepoFullRepoQuery } from './components/repo/__generated__/onerepoFullRepoQuery.graphql';
import { FULLREPO, Onerepo } from './components/repo/onerepo/Onerepo';
import { Search } from './components/search/Search';
import { createBrowserRouter } from 'react-router-dom';



interface AppProps {
  rootQueryRef: PreloadedQuery<AppROOTVIEWERQuery, { }>
}


const history = createHashHistory()
const location = new ReactLocation({ history })

const App: React.FC<AppProps> = ({ rootQueryRef }) => {

const viewerData = usePreloadedQuery<AppROOTVIEWERQuery>(ROOTVIEWER, rootQueryRef);
const data = useFragment(AppVIEWERfragmant, viewerData.viewer);
const response = data as App_user$data



  const ReactRouterRoutes = createBrowserRouter([
    
  ])




return (
  <div className='w-full min-h-screen h-full flex flex-col justify-between
   dark:bg-slate-800 dark:text-white transition ease-linear delay-100 '>



  


    
     <ErrorBoundary>
     <Router location={location} 
      routes={[
        { path: "/", element: <Home viewerData={viewerData} viewer_info={response}/> },
        { 
        path: "profile",
         children:[
           { 
            path: ':username',
             loader: async ({ params: { username } }) => ({
               userQueryRef: loadQuery<AppPROFILEVIEWERQuery>(
                 RelayEnvironment,
                 PROFILEVIEWER, { login:username }
               )
               }),
           element: <Profile /> 
          }
         ] 
    
         },
        { path: "repo",
          children:[
        { 
          path:":repoId",
          loader: async ({ params: { repoId } }) => {
          const repovars = repoId.split('--')
          const reponame = repovars[0] 
          const repoowner = repovars[2] 
            return (
            {
            repoQueryRef: loadQuery<OnerepoFullRepoQuery>(
              RelayEnvironment,FULLREPO, {reponame,repoowner }
            )
          })},
         element: <Onerepo /> }
        ]
        
        },
        { path: "search", element: <Search /> },
        { path: "test", element: <Test /> },
      ]}
     >

      <div className="fixed top-0 w-full z-30 h-[10%]">
      <Toolbar avatarUrl={response.avatarUrl} />
      </div>
        
      <div className="mt-[55px] w-full ">
      <Outlet />
      </div>
       

    </Router>
    </ErrorBoundary>
 </div>
);
}

export default App



export const AppVIEWERfragmant = graphql`
# github graphql query to get more details
  fragment App_user on User{
      id
      name
      login
      email
      bio
      avatarUrl
    }
`;

export const ROOTVIEWER = graphql`
# github graphql query to get more details
  query AppROOTVIEWERQuery{
   viewer{
    ...App_user
    ...Home_user
    ...ProfileInfo_user
    }
  }
`;

export const PROFILEVIEWER = graphql`
# github graphql query to get more details
  query AppPROFILEVIEWERQuery($login:String!){
   user(login:$login){
    ...Profile_user
    ...ProfileInfo_user
    }
  }
`;

