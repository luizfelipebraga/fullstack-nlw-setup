import './styles/global.css';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from 'react-query';

import { Header } from './components/Header';
import { SummaryTable } from './components/SummaryTable';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ error, resetErrorBoundary }) => (
              <div>
                There was an error! {error.message}
                <button onClick={() => resetErrorBoundary()}>Try again</button>
              </div>
            )}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <div className="h-screen w-screen flex justify-center items-center">
                <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
                  <Header />
                  <SummaryTable />
                </div>
              </div>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
}
