import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { ROOTVIEWER } from './App'
import './index.css'

import {
  RelayEnvironmentProvider,
  loadQuery,
} from 'react-relay/hooks';
import RelayEnvironment from './relay/RelayEnviroment'

import { AppROOTVIEWERQuery } from './__generated__/AppROOTVIEWERQuery.graphql';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from './components/Shared/errorboundary/ErrorBoundary';
import { GqlErr, useCheckToken } from './utils/useCheckToken';
import UnAuthedApp from './UnAuthedApp';
import { LoaderElipse } from './components/Shared/loaders/Loaders';



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const rootQueryRef = loadQuery<AppROOTVIEWERQuery>(
  RelayEnvironment,
  ROOTVIEWER, {}
);

const { Suspense } = React;

interface ViewSwitcherProps {

}

export const ViewSwitcher = ({ }: ViewSwitcherProps) => {
  const valid_token = useCheckToken()

  if (valid_token.loading) {
    return <LoaderElipse />
  }

  if (valid_token.viewer && !valid_token.error) {
    return <AuthedView valid_token={valid_token}/>
  }
  return <NotAuthedView valid_token={valid_token} />

}



interface mainProps {
  valid_token: {
    viewer: null;
    error: GqlErr | null;
    loading: boolean;
  }
}

export const AuthedView: React.FC<mainProps> = ({valid_token}) => {

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RelayEnvironmentProvider environment={RelayEnvironment}>
          <Suspense fallback={<LoaderElipse />}>
            <React.StrictMode>
              <App rootQueryRef={rootQueryRef} valid_token={valid_token} />
            </React.StrictMode>
          </Suspense>
        </RelayEnvironmentProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
interface NotAuthedProps {
  valid_token: {
    viewer: null;
    error: GqlErr | null;
    loading: boolean;
  }
}

export const NotAuthedView: React.FC<NotAuthedProps> = ({valid_token}) => {
    return <UnAuthedApp valid_token={valid_token} />
}



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ViewSwitcher/>
  </QueryClientProvider>
);









