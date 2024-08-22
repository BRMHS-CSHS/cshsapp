"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function TanstackQuery (props: React.PropsWithChildren): React.ReactElement {
    return <QueryClientProvider client={new QueryClient()} {...props} />;
}
