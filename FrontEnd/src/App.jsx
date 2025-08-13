import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

import NavbarPage from "./pages/NavbarPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <NavbarPage />
      </RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
