import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BlogFeed from "./pages/BlogFeed";
import BlogArticle from "./pages/BlogArticle";
import CursoTerapeutasPICS from "./pages/CursoTerapeutasPICS";
import CursoGestaoRiscos from "./pages/CursoGestaoRiscos";
import AulaExperimentalPICS from "./pages/AulaExperimentalPICS";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<BlogFeed />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/curso-NR1-terapeutas-PICS" element={<CursoTerapeutasPICS />} />
          <Route path="/curso-NR1-gestao" element={<CursoGestaoRiscos />} />
          <Route path="/aula-experimental" element={<AulaExperimentalPICS />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
