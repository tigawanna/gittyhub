
import React from 'react'
import { graphql, loadQuery, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks';
import { AppROOTVIEWERQuery } from './__generated__/AppROOTVIEWERQuery.graphql';
import { Home } from './components/home/Home';
import { useFragment } from 'react-relay';
import { App_user$data } from './__generated__/App_user.graphql';
import { Profile } from './components/people/Profile';
import RelayEnvironment from './relay/RelayEnviroment'
import { AppPROFILEVIEWERQuery } from './__generated__/AppPROFILEVIEWERQuery.graphql';

import { OnerepoFullRepoQuery } from './components/repo/__generated__/onerepoFullRepoQuery.graphql';
import { FULLREPO, Onerepo } from './components/repo/onerepo/Onerepo';
import { Search } from './components/search/Search';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/Shared/errorboundary/ErrorBoundary';
import { RootLayout } from './components/root/RootLayout';
import { ReactRouterError } from './components/Shared/errorboundary/ReactRouterError';
import { AuthLayout } from './components/auth/AuthLayout';
import { Login } from './components/auth/Login';
import { GqlErr } from './utils/useCheckToken';



interface AppProps {
  rootQueryRef: PreloadedQuery<AppROOTVIEWERQuery, { }>
  valid_token: {
    viewer: null;
    error: GqlErr | null;
    loading: boolean;
  }
}

const App: React.FC<AppProps> = ({ rootQueryRef,valid_token }) => {

const viewerData = usePreloadedQuery<AppROOTVIEWERQuery>(ROOTVIEWER, rootQueryRef);
const data = useFragment(AppVIEWERfragmant, viewerData.viewer);
const response = data as App_user$data



  const ReactRouterRoutes = createBrowserRouter([
    {
      path: '/',
      element:<RootLayout valid_token={valid_token}/>,
      // loader:userLoader(queryClient),
      errorElement: <ReactRouterError />,
      children: [
        { path: "/", element:<Home viewerData={viewerData} viewer_info={response} /> },

        {
          path: "profile",
          children: [
            {
              path: ':username',
              loader: async ({ params: { username } }) => ({
                userQueryRef: loadQuery<AppPROFILEVIEWERQuery>(
                  RelayEnvironment,
                  PROFILEVIEWER, { login:username??"" }
                )
              }),
              element: <Profile/>
            }
          ]

        },

        {
          path: "repo",
          children: [
            {
              path: ":repoId",
              loader: async ({ params: { repoId } }) => {
                const repovars = repoId&&repoId.split('--')
                const reponame = (repovars&&repovars[0])??""
                const repoowner = (repovars&&repovars[2])??""
                return (
                  {
                    repoQueryRef: loadQuery<OnerepoFullRepoQuery>(
                      RelayEnvironment, FULLREPO, { reponame, repoowner }
                    )
                  })
              },
              element: <Onerepo />
            }
          ]

        },

        {
          path: '/auth',
          element: <AuthLayout valid_token={valid_token} />,
          children: [
            {
              index: true,
              element: <Login />,
              // loader: deferredBlogPostsLoader,
            },

            // {
            //   path: '/auth/signup',
            //   element: <Signup />,
            //   // loader: blogPostLoader,
            // },
            // {
            //   path: '/auth/redirect',
            //   element: <Redirect />,
            // }
          ],
        },
        { path: "search", element: <Search /> },




      ],
    },
  ]);




return (
  <div className='w-full min-h-screen h-full flex flex-col justify-between
   dark:bg-slate-800 dark:text-white transition ease-linear delay-100 '>



  


    
     <ErrorBoundary>
      <RouterProvider router={ReactRouterRoutes} />
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

