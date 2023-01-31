


import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/Shared/errorboundary/ErrorBoundary';
import { RootLayout } from './components/root/RootLayout';
import { ReactRouterError } from './components/Shared/errorboundary/ReactRouterError';
import { AuthLayout } from './components/auth/AuthLayout';
import { Login } from './components/auth/Login';
import { useCheckToken } from './utils/useCheckToken';



interface AppProps {
}

const UnAuthedApp = ({ }: AppProps) => {
    const valid_token = useCheckToken()






    const ReactRouterRoutes = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout valid_token={valid_token} />,
            // loader:userLoader(queryClient),
            errorElement: <ReactRouterError />,
            children: [
                {
                    path: '/auth',
                    element: <AuthLayout valid_token={valid_token} />,
                    children: [
                        {
                            index: true, element: <Login />,
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





