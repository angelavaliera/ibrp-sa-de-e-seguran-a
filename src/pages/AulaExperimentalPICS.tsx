import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logoSelo from "@/assets/logo-ibrp-selo.png";

const CHECKOUT_URL =
  "https://pay.voompcreators.com.br/11613/offer/o4EZpp/?ch_id=2399";

const AulaExperimentalPICS = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const allowed = sessionStorage.getItem("aula-experimental-pics-access");
    if (!allowed) {
      navigate("/curso-NR1-terapeutas-PICS", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
              <PlayCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Aula Experimental • IBRP
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-4">
              Sua aula experimental está{" "}
              <span className="text-gradient">pronta!</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
              Assista a uma aula real do curso e veja na prática como é a
              experiência de aprendizado.
            </p>

            {/* YouTube Player */}
            <div className="aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl mb-12">
              <iframe
                src="https://www.youtube.com/embed/x4Pz8o5Yfsk"
                title="Aula Experimental - Terapeutas Integrativos em Riscos Psicossociais"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-lg mx-auto"
            >
              <div
                className="rounded-2xl border border-primary/20 bg-card p-8 text-center"
                style={{ boxShadow: "var(--shadow-glow)" }}
              >
                <img
                  src={logoSelo}
                  alt="Selo IBRP"
                  className="w-12 h-12 mx-auto mb-4 object-contain"
                />
                <h2 className="text-xl font-heading font-bold mb-2">
                  Gostou do que viu?
                </h2>
                <p className="text-muted-foreground mb-6 text-sm">
                  Garanta sua vaga no curso completo e domine a atuação em
                  riscos psicossociais alinhada à NR-1.
                </p>
                <Button
                  size="lg"
                  className="w-full bg-gradient-brand hover:opacity-90 transition-opacity text-lg py-6 rounded-xl glow text-white"
                  asChild
                >
                  <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                    Quero me matricular no curso completo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AulaExperimentalPICS;
