
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import AdminHome from "./pages/admin/AdminHome";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminTools from "./pages/admin/AdminTools";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminContent from "./pages/admin/AdminContent";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSEO from "./pages/admin/AdminSEO";
import { AdminIntegrations } from "./pages/admin/AdminIntegrations";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/tools" element={<AdminTools />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/content" element={<AdminContent />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/seo" element={<AdminSEO />} />
            <Route path="/admin/integrations" element={<AdminIntegrations />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
