import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { ROOTVIEWER } from './App'
import './index.css'

import {
  RelayEnvironmentProvider,
  loadQuery,
} from 'react-relay/hooks';
import RelayEnvironment from './relay/RelayEnviroment'
import { LoadingShimmer } from './components/Shared/LoadingShimmer';
import { AppROOTVIEWERQuery } from './__generated__/AppROOTVIEWERQuery.graphql';
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorBoundary from './components/Shared/errorboundary/ErrorBoundary';



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
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <Suspense fallback={<LoadingShimmer />}>
          <React.StrictMode>
            <App rootQueryRef={rootQueryRef} />
          </React.StrictMode>
        </Suspense>
      </RelayEnvironmentProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);






interface mainProps {

}



// const MainView: React.FC<mainProps> = ({ }) => {

//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         refetchOnWindowFocus: false,
//         refetchOnMount: false,
//         refetchOnReconnect: false,
//         retry: false,
//         staleTime: 5 * 60 * 1000,
//       },
//     },
//   });

//   return (
//     <ErrorBoundary>
//       <QueryClientProvider client={queryClient}>
//       <RelayEnvironmentProvider environment={RelayEnvironment}>
//         <Suspense fallback={<LoadingShimmer />}>
//           <React.StrictMode>
//             <App rootQueryRef={rootQueryRef}/>
//             </React.StrictMode>
//         </Suspense>
//       </RelayEnvironmentProvider>
//       </QueryClientProvider>
//     </ErrorBoundary>
//   );
// }

// interface NotAuthedProps{
//   initerror: GqlErr | null
// }
// export const NotAuthedView: React.FC<NotAuthedProps> = ({ initerror}) => {
//   return (
//     <div className='w-full min-h-screen h-full'>
//       <Login initerror={initerror}/>
//     </div>
//   );
// }
