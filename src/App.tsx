
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "@/components/Dashboard";
import DashboardHome from "@/pages/DashboardHome";
import InvoicesPage from "@/pages/InvoicesPage";
import UsersPage from "@/pages/UsersPage";
import RockstarServicesForm from "@/components/RockstarServicesForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Dashboard>
              <DashboardHome />
            </Dashboard>
          } />
          <Route path="/invoices" element={
            <Dashboard>
              <InvoicesPage />
            </Dashboard>
          } />
          <Route path="/users" element={
            <Dashboard>
              <UsersPage />
            </Dashboard>
          } />
          <Route path="/create-invoice" element={
            <RockstarServicesForm />
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
