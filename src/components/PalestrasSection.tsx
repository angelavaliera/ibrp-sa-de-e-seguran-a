import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";


const PalestrasSection = () => {
  const scrollToContato = () => {
    const el = document.querySelector("#contato");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="palestras" className="py-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-fucsia/10 flex items-center justify-center">
              <Mic className="h-6 w-6 text-fucsia" />
            </div>
            <span className="text-sm font-medium text-fucsia uppercase tracking-widest">Palestras</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Leve conhecimento transformador para sua equipe
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Nosso cardápio de temas aborda desde a prevenção de burnout até a construção de ambientes psicologicamente seguros. Palestras conduzidas por especialistas com experiência prática e respaldo científico.
          </p>
          <ul className="space-y-3 text-muted-foreground text-left max-w-md mx-auto mb-8">
            {["Saúde mental no trabalho pós-pandemia", "Liderança empática e produtiva", "NR-1 na prática: o que muda para sua empresa", "Prevenção ao assédio moral e sexual"].map((topic, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-brand shrink-0" />
                {topic}
              </li>
            ))}
          </ul>
          <Button
            size="lg"
            onClick={scrollToContato}
            className="bg-gradient-brand hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl glow text-white"
          >
            Solicitar Palestra
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PalestrasSection;
