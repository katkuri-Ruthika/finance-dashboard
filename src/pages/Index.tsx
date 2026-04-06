import { AppProvider } from "@/context/AppContext";
import Dashboard from "@/pages/Dashboard";

const Index = () => (
  <AppProvider>
    <Dashboard />
  </AppProvider>
);

export default Index;
