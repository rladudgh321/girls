"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
// import { RecoilRoot } from 'recoil'
interface ProviderProps {
  children: React.ReactNode
}

const Provider = ({children}: ProviderProps) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {/* <RecoilRoot> */}
        <Suspense fallback="loading">
          {children}
        </Suspense>
      {/* </RecoilRoot> */}
    </QueryClientProvider>
  );
}

export default Provider;