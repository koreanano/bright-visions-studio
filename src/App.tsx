import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProductsList from "./pages/ProductsList.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import Legal from "./pages/Legal.tsx";
import InfoPage from "./pages/InfoPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:categoryKey" element={<ProductsList />} />
          <Route path="/products/:categoryKey/:slug" element={<ProductDetail />} />
          <Route path="/terms" element={<Legal kind="terms" />} />
          <Route path="/privacy" element={<Legal kind="privacy" />} />
          <Route path="/about" element={<InfoPage kind="about" />} />
          <Route path="/service" element={<InfoPage kind="service" />} />
          <Route path="/faq" element={<InfoPage kind="faq" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
