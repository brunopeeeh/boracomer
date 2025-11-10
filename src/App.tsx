import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
const Index = lazy(() => import("./pages/Index"));
const Discover = lazy(() => import("./pages/Discover"));
const Map = lazy(() => import("./pages/Map"));
const Profile = lazy(() => import("./pages/Profile"));
const MyCoupons = lazy(() => import("./pages/MyCoupons"));
const PromotionDetails = lazy(() => import("./pages/PromotionDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Store = lazy(() => import("./pages/Store"));
import useIsMobile from "./hooks/use-is-mobile"; // Import the hook
import { BREAKPOINTS } from "@/lib/breakpoints";
import DesktopLayout from "./components/DesktopLayout"; // Import the DesktopLayout

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile(BREAKPOINTS.sm); // alinhado ao Tailwind sm

  const appRoutes = (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/map" element={<Map />} />
      <Route path="/coupons" element={<MyCoupons />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/promotion/:id" element={<PromotionDetails />} />
      <Route path="/store/:slug" element={<Store />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <a href="#main" className="skip-to-main">
          Ir para conteúdo principal
        </a>
        <BrowserRouter>
          {isMobile ? (
            <Suspense fallback={<div className="p-4 text-center">Carregando…</div>}>
              {appRoutes}
            </Suspense>
          ) : (
            <DesktopLayout>
              <Suspense fallback={<div className="p-4 text-center">Carregando…</div>}>
                {appRoutes}
              </Suspense>
            </DesktopLayout>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
