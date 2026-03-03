import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "hsl(220, 30%, 12%)" }}>
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Equipe colaborando em ambiente de trabalho moderno" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsla(220, 30%, 12%, 0.5) 0%, hsla(220, 30%, 12%, 0.85) 60%, hsl(220, 30%, 12%) 100%)" }} />
        {/* Warm gradient overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(228, 54%, 31%, 0.3) 0%, hsla(166, 62%, 39%, 0.15) 50%, hsla(329, 73%, 44%, 0.1) 100%)" }} />
      </div>

      <div className="container mx-auto relative z-10 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
            <span className="text-sm font-medium text-white/90">Saúde Mental Corporativa • IBRP</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6 text-white">
            O sucesso do seu negócio depende de{" "}
            <span className="text-gradient">mentes engajadas.</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/70">
            Vá além da NR-1. Transforme a saúde mental em{" "}
            <strong className="text-white">vantagem competitiva e lucro sustentável</strong>.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="bg-gradient-brand hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl glow" onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}>
              Solicitar Diagnóstico
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl border-white/30 text-white hover:bg-white/10 bg-transparent">
              Conheça o Método
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
