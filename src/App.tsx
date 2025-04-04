import "@mantine/core/styles.css";

import PWABadge from "./PWABadge.tsx";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MantineProvider } from "@mantine/core";
import Posts from "./components/posts.tsx";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <Posts />
        <PWABadge />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
