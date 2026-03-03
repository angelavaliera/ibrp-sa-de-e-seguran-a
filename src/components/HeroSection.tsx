import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 bg-background/50" />
      </div>

      <div className="container mx-auto relative z-10 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10">
            <span className="text-sm font-medium text-primary">NR-1 • Norma Regulamentadora</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6">
            Sua empresa está pronta para a{" "}
            <span className="text-gradient">fiscalização da NR-1?</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Evite multas e processos trabalhistas com a única metodologia{" "}
            <strong className="text-foreground">100% adequada à realidade brasileira</strong>.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button size="lg" className="bg-gradient-brand hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl glow">
              Solicitar Diagnóstico
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
