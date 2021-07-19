import { QueryClientProvider } from "react-query";
import { queryClient } from "./api";
import Home from "./components/Home";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

export default App;
