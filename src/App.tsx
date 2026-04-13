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
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import Links from "./pages/Links";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import NewsletterBanner from "./components/NewsletterBanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ScrollToTopButton />
        <NewsletterBanner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<BlogFeed />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/curso-NR1-terapeutas-PICS" element={<CursoTerapeutasPICS />} />
          <Route path="/curso-NR1-gestao" element={<CursoGestaoRiscos />} />
          <Route path="/aula-experimental" element={<AulaExperimentalPICS />} />
          <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/links" element={<Links />} />
          <Route path="/faq" element={<FAQ />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
