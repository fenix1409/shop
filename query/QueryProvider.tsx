'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                retry: 1,
                staleTime: 1000 * 60 * 5,
                // @ts-ignore
                casheTime: 1000 * 60 * 10,
                refetchOnWindowFocus: true
            }
        }
    }))
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

export default ReactQueryProvider