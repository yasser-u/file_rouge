"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* FIXME : surement a supprimer en production => ReactQueryDevtools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
