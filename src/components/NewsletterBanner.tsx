import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const DISMISSED_KEY = "newsletter-banner-dismissed";

const NewsletterBanner = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only show on home page
    if (location.pathname !== "/") {
      setVisible(false);
      return;
    }

    // Don't show if dismissed in this session
    if (sessionStorage.getItem(DISMISSED_KEY)) return;

    const onScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.4) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(DISMISSED_KEY, "1");
  };

  const scrollToNewsletter = () => {
    dismiss();
    const el = document.querySelector(".newsletter-signup");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-40"
        >
          <div className="rounded-xl border border-border bg-card p-4 shadow-lg flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-heading font-bold text-foreground mb-1">
                Receba conteúdos estratégicos
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Assine a Central de Inteligência IBRP e fique à frente.
              </p>
              <Button
                size="sm"
                className="bg-gradient-brand hover:opacity-90 transition-opacity text-xs h-8"
                onClick={scrollToNewsletter}
              >
                Assinar agora
              </Button>
            </div>
            <button
              onClick={dismiss}
              className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterBanner;
