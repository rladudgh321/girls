"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";

interface ProviderProps {
  children: React.ReactNode
}

const Provider = ({children}: ProviderProps) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback="loading">
        {children}
      </Suspense>
    </QueryClientProvider>
  );
}

export default Provider;