import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import PromotionDetails from "./pages/PromotionDetails";
import NotFound from "./pages/NotFound";
import useIsMobile from "./hooks/use-is-mobile"; // Import the hook
import DesktopLayout from "./components/DesktopLayout"; // Import the DesktopLayout

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile(); // Use the hook

  const appRoutes = (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/map" element={<Map />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/promotion/:id" element={<PromotionDetails />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {isMobile ? (
            // Mobile layout (current structure)
            appRoutes
          ) : (
            // Desktop layout
            <DesktopLayout>{appRoutes}</DesktopLayout>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
