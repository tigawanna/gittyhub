import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ReactRouterError } from './components/Shared/errorboundary/ReactRouterError';
import { AuthLayout } from './components/auth/AuthLayout';
import { Login } from './components/auth/Login';
import { GqlErr } from './utils/useCheckToken';
import { UnAuthRoot } from './components/auth/UnAuthRoot';
import { UnAuthedRootLayout } from './components/auth/UnAuthedRootLayout';
import { Redirect } from './components/auth/Redirect';
import ErrorBoundary from './components/Shared/errorboundary/ErrorBoundary';



interface AppProps {
    valid_token: {
        viewer: null;
        error: GqlErr | null;
        loading: boolean;
    }
}

const UnAuthedApp = ({valid_token}: AppProps) => {
  const ReactRouterRoutes = createBrowserRouter([
        {
            path: '/',
           element: <UnAuthedRootLayout valid_token={valid_token} />,
            // loader:userLoader(queryClient),
            errorElement: <ReactRouterError />,
            children: [
            {index:true,element: <UnAuthRoot/>},
            {
            path: '/auth',
                element: <AuthLayout valid_token={valid_token} />,
                  children: [
                      {
                          index: true,
                          element: <Login />,
                          // loader: deferredBlogPostsLoader,
                      },
        
                      {
                          path: '/auth/redirect',
                          element: <Redirect />,
                      }
                  ],
              },
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

export default UnAuthedApp





