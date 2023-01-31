


import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/Shared/errorboundary/ErrorBoundary';
import { RootLayout } from './components/root/RootLayout';
import { ReactRouterError } from './components/Shared/errorboundary/ReactRouterError';
import { AuthLayout } from './components/auth/AuthLayout';
import { Login } from './components/auth/Login';
import { GqlErr, useCheckToken } from './utils/useCheckToken';
import { AuthRoot } from './components/auth/AuthRoot';



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
           element: <AuthLayout valid_token={valid_token} />,
            // loader:userLoader(queryClient),
            errorElement: <ReactRouterError />,
            children: [
            {index:true,element: <AuthRoot/>,

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





