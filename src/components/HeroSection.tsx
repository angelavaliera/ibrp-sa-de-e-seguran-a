import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Equipe colaborando em ambiente de trabalho moderno" className="w-full h-full object-cover" />
        {/* Warm semi-transparent overlay — keeps people visible */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsla(30, 30%, 96%, 0.55) 0%, hsla(30, 25%, 95%, 0.7) 50%, hsla(30, 20%, 97%, 0.9) 100%)" }} />
      </div>

      <div className="container mx-auto relative z-10 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-foreground/15 bg-white/60 backdrop-blur-sm">
            <span className="text-sm font-medium text-foreground/80">Saúde Mental Corporativa • IBRP</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6 text-foreground">
            O sucesso do seu negócio depende de{" "}
            <span className="text-gradient">mentes engajadas.</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-foreground/70">
            Vá além da NR-1. Transforme a saúde mental em{" "}
            <strong className="text-foreground">vantagem competitiva e lucro sustentável</strong>.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="bg-gradient-brand hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl glow text-white" onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}>
              Solicitar Diagnóstico
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl border-foreground/20 text-foreground hover:bg-foreground/5 bg-white/50 backdrop-blur-sm" onClick={() => document.getElementById('diferenciais')?.scrollIntoView({ behavior: 'smooth' })}>
              Conheça a Metodologia
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
